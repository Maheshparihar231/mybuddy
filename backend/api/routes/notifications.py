from flask import Blueprint, request, jsonify
from models import db, Notification
import uuid
from datetime import datetime

notification_api = Blueprint('notification_api', __name__)

# Create a new notification
@notification_api.route('/add', methods=['POST'])
def create_notification():
    data = request.get_json()
    try:
        new_notification = Notification(
            id=uuid.uuid4(),
            user_id=data['user_id'],
            title=data['title'],
            event_name=data['event_name'],
            time=data.get('time', datetime.utcnow()),
            event_id=data['event_id'],
            posted_time=data['posted_time'],
            is_readed=data.get('is_readed', False)
        )
        db.session.add(new_notification)
        db.session.commit()
        return jsonify({'message': 'Notification created successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get all notifications for a user by user_id
@notification_api.route('/user/<string:user_id>', methods=['GET'])
def get_notifications(user_id):
    notifications = Notification.query.filter_by(user_id=user_id).all()
    if not notifications:
        return jsonify({'error': 'No notifications found for this user!'}), 404
    return jsonify([{
        'id': str(notification.id),
        'user_id': notification.user_id,
        'title': notification.title,
        'event_name': notification.event_name,
        'time': notification.time.strftime('%Y-%m-%d %H:%M:%S'),
        'event_id': notification.event_id,
        'posted_time': notification.posted_time,
        'is_readed': notification.is_readed
    } for notification in notifications]), 200

# Update a notification by notification id
@notification_api.route('/<string:id>', methods=['PUT'])
def update_notification(id):
    data = request.get_json()
    notification = Notification.query.get(id)
    if notification is None:
        return jsonify({'error': 'Notification not found!'}), 404

    try:
        notification.title = data.get('title', notification.title)
        notification.event_name = data.get('event_name', notification.event_name)
        notification.time = data.get('time', notification.time)
        notification.event_id = data.get('event_id', notification.event_id)
        notification.posted_time = data.get('posted_time', notification.posted_time)
        notification.is_readed = data.get('is_readed', notification.is_readed)

        db.session.commit()
        return jsonify({'message': 'Notification updated successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete a notification by notification id
@notification_api.route('/<string:id>', methods=['DELETE'])
def delete_notification(id):
    notification = Notification.query.get(id)
    if notification is None:
        return jsonify({'error': 'Notification not found!'}), 404

    try:
        db.session.delete(notification)
        db.session.commit()
        return jsonify({'message': 'Notification deleted successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

