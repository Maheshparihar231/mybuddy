from flask import Blueprint, request, jsonify
from models import db, User, Activity

bp = Blueprint('api', __name__)

# Route to create a new user
@bp.route('/add/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(username=data['username'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created!'}), 201

# Route to create a new activity
@bp.route('/add/activity', methods=['POST'])
def create_activity():
    data = request.get_json()
    activity = Activity(name=data['name'], description=data['description'])
    db.session.add(activity)
    db.session.commit()
    return jsonify({'message': 'Activity created!'}), 201

# Route to get all activities
@bp.route('/activities', methods=['GET'])
def get_activities():
    activities = Activity.query.all()
    return jsonify([{'activity_id': act.activity_id, 'name': act.name, 'description': act.description} for act in activities]), 200

# Method to get user details by user_id
@bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'user_id': user.user_id,
        'username': user.username,
        'email': user.email,
        'created_at': user.created_at
    }), 200

# Method to get activity details by activity_id
@bp.route('/activity/<int:activity_id>', methods=['GET'])
def get_activity(activity_id):
    activity = Activity.query.get_or_404(activity_id)
    return jsonify({
        'activity_id': activity.activity_id,
        'name': activity.name,
        'description': activity.description,
        'created_at': activity.created_at
    }), 200

# New Route to update user data
@bp.route('/update/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    # Update user details
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)

    db.session.commit()
    return jsonify({'message': 'User updated!', 'user': {'user_id': user.user_id, 'username': user.username, 'email': user.email}}), 200

# New Route to update activity data
@bp.route('/update/activity/<int:activity_id>', methods=['PUT'])
def update_activity(activity_id):
    data = request.get_json()
    activity = Activity.query.get_or_404(activity_id)

    # Update activity details
    activity.name = data.get('name', activity.name)
    activity.description = data.get('description', activity.description)

    db.session.commit()
    return jsonify({'message': 'Activity updated!', 'activity': {'activity_id': activity.activity_id, 'name': activity.name, 'description': activity.description}}), 200
