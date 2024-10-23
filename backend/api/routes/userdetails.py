from flask import Blueprint, request, jsonify
from models import db, UserDetails
from sqlalchemy.exc import IntegrityError
import uuid

userdetails_api = Blueprint('userdetails_api', __name__)


# Get a single user detail by user_id
@userdetails_api.route('/<string:user_id>', methods=['GET'])
def get_userdetails(user_id):
    user = UserDetails.query.filter_by(user_id=user_id).first()
    if user is None:
        return jsonify({'error': 'User not found!'}), 404
    return jsonify({
        'user_id': str(user.user_id),
        'profile_picture': user.profile_picture,
        'name': user.name,
        'bio': user.bio,
        'posts': user.posts,
        'followers': user.followers,
        'default_location': user.default_location,
        'is_verified': user.is_verified,
        'date_joined': user.date_joined.strftime('%Y-%m-%d'),
        'account_type': user.account_type,
        'is_business_account': user.is_business_account,
        'following': user.following,
        'phone_number': user.phone_number,
        'email': user.email,
        'website': user.website
    }), 200


# Update user details by user_id
@userdetails_api.route('/<string:user_id>', methods=['PUT'])
def update_userdetails(user_id):
    data = request.get_json()
    user = UserDetails.query.filter_by(user_id=user_id).first()
    if user is None:
        return jsonify({'error': 'User not found!'}), 404

    try:
        user.profile_picture = data.get('profile_picture', user.profile_picture)
        user.name = data.get('name', user.name)
        user.bio = data.get('bio', user.bio)
        user.posts = data.get('posts', user.posts)
        user.followers = data.get('followers', user.followers)
        user.default_location = data.get('default_location', user.default_location)
        user.is_verified = data.get('is_verified', user.is_verified)
        user.account_type = data.get('account_type', user.account_type)
        user.is_business_account = data.get('is_business_account', user.is_business_account)
        user.following = data.get('following', user.following)
        user.phone_number = data.get('phone_number', user.phone_number)
        user.email = data.get('email', user.email)
        user.website = data.get('website', user.website)

        db.session.commit()
        return jsonify({'message': 'User details updated successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete a user by user_id
@userdetails_api.route('/<string:user_id>', methods=['DELETE'])
def delete_userdetails(user_id):
    user = UserDetails.query.filter_by(user_id=user_id).first()
    if user is None:
        return jsonify({'error': 'User not found!'}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500    


