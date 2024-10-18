from flask import Blueprint, request, jsonify
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

auth_api = Blueprint('auth_api', __name__)

# Route to create a new user
@auth_api.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Username, email, and password are required!'}), 400
    
    # Check if a user already exists with the given email
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'A user with this email already exists!'}), 409

    try:
        # Hash the password before saving
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

        user = User(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User created!', 'user': {'user_id': user.user_id, 'username': user.username, 'email': user.email}}), 201
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
