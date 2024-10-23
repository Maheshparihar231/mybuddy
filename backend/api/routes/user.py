from flask import Blueprint, request, jsonify
from models import db, User

user_api = Blueprint('user_api', __name__)

# Method to get user details by user_id
@user_api.route('/<string:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        return jsonify({
            'user_id': user.user_id,
            'username': user.username,
            'email': user.email,
            'password': user.password,
            'created_at': user.created_at
        }), 200
    except Exception as e:
        return jsonify({'error': f'Error retrieving user: {str(e)}'}), 500


# Method to update user data
@user_api.route('/update/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    if not data:
        return jsonify({'error': 'No data provided for update!'}), 400

    try:
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        db.session.commit()
        return jsonify({'message': 'User updated!', 'user': {'user_id': user.user_id, 'username': user.username, 'email': user.email}}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error updating user: {str(e)}'}), 500


# Method to delete user by user_id
@user_api.route('/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    
    if not user:
        return jsonify({'error': f'User with ID {user_id} not found!'}), 404
    
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': f'User with ID {user_id} deleted successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error deleting user: {str(e)}'}), 500

