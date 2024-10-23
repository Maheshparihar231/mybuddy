from flask import Blueprint, request, jsonify
from models import db, User, UserDetails
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
import uuid

auth_api = Blueprint('auth_api', __name__)

# Route to create a new user and user details
@auth_api.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required!'}), 400

    # Check if a user already exists with the given email
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'A user with this email already exists!'}), 409

    try:
        # Hash the password before saving
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

        # Create the user record
        user = User(username=data.get('username'), email=data['email'], password=hashed_password)
        db.session.add(user)
        db.session.commit()  # Commit to generate the user ID for linking

        # Automatically create user details after registering the user
        user_details = UserDetails(
            id=uuid.uuid4(),  # Generate unique UUID for user details ID
            user_id=str(user.user_id),  # Reference the user_id from User model
            profile_picture=data.get('profile_picture', 'https://picsum.photos/200/200'),  # Default picture if not provided
            name=data.get('username', 'Unknown'),  # Using username for name field
            bio=data.get('bio', ''),
            posts=0,
            followers=0,
            default_location=data.get('default_location', ''),
            is_verified=False,
            account_type=data.get('account_type', True),
            is_business_account=data.get('is_business_account', False),
            following=0,
            phone_number=data.get('phone_number', ''),
            email=data['email'],  # Email matches the registered email
            website=data.get('website', '')
        )
        db.session.add(user_details)
        db.session.commit()

        return jsonify({
            'message': 'User registered and details added!',
            'user': {
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email
            }
        }), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Integrity error, check the input data!'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error creating user: {str(e)}'}), 500


# Route to handle user login
@auth_api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Check if email and password are present
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required!'}), 400

    # Find the user by email
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'error': 'User not found!'}), 404

    # Check if the password is correct
    if check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful!', 'user': {'user_id': user.user_id, 'username': user.username, 'email': user.email}}), 200
    else:
        return jsonify({'error': 'Invalid password!'}), 401
