from flask import Blueprint, request, jsonify
from models import db, Post
from sqlalchemy.exc import IntegrityError
import uuid
from datetime import datetime

post_api = Blueprint('post_api', __name__)

# Create a new post
@post_api.route('/add', methods=['POST'])
def create_post():
    data = request.get_json()
    try:
        new_post = Post(
            post_id=uuid.uuid4(),
            user_id=data.get('user_id'),
            username=data.get('username'),
            profile_picture=data.get('profile_picture', 'https://picsum.photos/200/200'),
            is_verified=data.get('is_verified', False),
            image_url=data['image_url'],
            caption=data.get('caption', ''),
            location=data.get('location', ''),
            likes_count=data.get('likes_count', 0),
            tags=data.get('tags', []),
            shares_count=data.get('shares_count', 0),
            bookmarks_count=data.get('bookmarks_count', 0)
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify({'message': 'Post created successfully!', 'post': new_post.post_id}), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Integrity error, check the input data!'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get all posts
@post_api.route('/all', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    if not posts:
        return jsonify({'error': 'No posts found for this user!'}), 404
    post_list = [
        {
            'post_id': str(post.post_id),
            'user_id': post.user_id,
            'username': post.username,
            'profile_picture': post.profile_picture,
            'is_verified': post.is_verified,
            'image_url': post.image_url,
            'caption': post.caption,
            'location': post.location,
            'posted_at': post.posted_at.strftime('%Y-%m-%d %H:%M:%S'),
            'likes_count': post.likes_count,
            'tags': post.tags,
            'shares_count': post.shares_count,
            'bookmarks_count': post.bookmarks_count
        } for post in posts
    ]
    return jsonify(post_list), 200

# Get a single post by post_id
@post_api.route('/<string:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.filter_by(post_id=post_id).first()
    if post is None:
        return jsonify({'error': 'Post not found!'}), 404
    return jsonify({
        'post_id': str(post.post_id),
        'user_id': post.user_id,
        'username': post.username,
        'profile_picture': post.profile_picture,
        'is_verified': post.is_verified,
        'image_url': post.image_url,
        'caption': post.caption,
        'location': post.location,
        'posted_at': post.posted_at.strftime('%Y-%m-%d %H:%M:%S'),
        'likes_count': post.likes_count,
        'tags': post.tags,
        'shares_count': post.shares_count,
        'bookmarks_count': post.bookmarks_count
    }), 200

# Update a post by post_id
@post_api.route('/<string:post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.get_json()
    post = Post.query.filter_by(post_id=post_id).first()
    if post is None:
        return jsonify({'error': 'Post not found!'}), 404

    try:
        post.profile_picture = data.get('profile_picture', post.profile_picture)
        post.username = data.get('username', post.username)
        post.is_verified = data.get('is_verified', post.is_verified)
        post.image_url = data.get('image_url', post.image_url)
        post.caption = data.get('caption', post.caption)
        post.location = data.get('location', post.location)
        post.likes_count = data.get('likes_count', post.likes_count)
        post.tags = data.get('tags', post.tags)
        post.shares_count = data.get('shares_count', post.shares_count)
        post.bookmarks_count = data.get('bookmarks_count', post.bookmarks_count)

        db.session.commit()
        return jsonify({'message': 'Post updated successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete a post by post_id
@post_api.route('/<string:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.filter_by(post_id=post_id).first()
    if post is None:
        return jsonify({'error': 'Post not found!'}), 404

    try:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get all posts by user_id
@post_api.route('/user/<string:user_id>', methods=['GET'])
def get_posts_by_user(user_id):
    posts = Post.query.filter_by(user_id=user_id).all()
    if not posts:
        return jsonify({'error': 'No posts found for this user!'}), 404
    post_list = [
        {
            'post_id': str(post.post_id),
            'user_id': post.user_id,
            'username': post.username,
            'profile_picture': post.profile_picture,
            'is_verified': post.is_verified,
            'image_url': post.image_url,
            'caption': post.caption,
            'location': post.location,
            'posted_at': post.posted_at.strftime('%Y-%m-%d %H:%M:%S'),
            'likes_count': post.likes_count,
            'tags': post.tags,
            'shares_count': post.shares_count,
            'bookmarks_count': post.bookmarks_count
        } for post in posts
    ]
    return jsonify(post_list), 200

# Delete all posts by user_id
@post_api.route('/user/<string:user_id>', methods=['DELETE'])
def delete_posts_by_user(user_id):
    posts = Post.query.filter_by(user_id=user_id).all()
    if not posts:
        return jsonify({'error': 'No posts found for this user!'}), 404

    try:
        for post in posts:
            db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'All posts deleted for the user!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500