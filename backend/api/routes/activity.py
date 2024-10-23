from flask import Blueprint, request, jsonify
from models import db, Activity
import uuid

activity_api = Blueprint('activity_api', __name__)

# Create a new event/activity
@activity_api.route('/add', methods=['POST'])
def create_activity():
    data = request.get_json()

    # Validate required fields
    if not data.get('title') or not data.get('price') or not data.get('posted_by') or not data.get('user_id'):
        return jsonify({'error': 'Missing required fields: title, price, posted_by, or user_id'}), 400

    try:
        # Create a new event
        new_event = Activity(
            id=uuid.uuid4(),  # Generate unique ID for the event
            title=data['title'],
            price=data['price'],
            posted_by=data['posted_by'],
            image_url=data.get('image_url', 'https://picsum.photos/640/480?random=1'),  # Default image if not provided
            user_id=data['user_id'],
            profile_pic=data.get('profile_pic', 'https://picsum.photos/200/200?random=1'),  # Default profile pic if not provided
            posted_date=data.get('posted_date')  # Optional posted_date, use current date if not provided
        )

        # Add and commit the new event to the database
        db.session.add(new_event)
        db.session.commit()

        return jsonify({'message': 'Activity created successfully!', 'activity_id': str(new_event.id)}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get all events
@activity_api.route('/getall', methods=['GET'])
def get_all_events():
    events = Activity.query.all()
    if not events:
        return jsonify({'message': 'No events found!'}), 404

    event_list = [
        {
            'id': str(event.id),
            'title': event.title,
            'price': event.price,
            'posted_by': event.posted_by,
            'image_url': event.image_url,
            'user_id': event.user_id,
            'profile_pic': event.profile_pic,
            'posted_date': event.posted_date.strftime('%Y-%m-%d')
        } for event in events
    ]
    return jsonify(event_list), 200

# Get an event by its activity ID (event_id)
@activity_api.route('/<string:event_id>', methods=['GET'])
def get_event_by_id(event_id):
    try:
        event = Activity.query.get(uuid.UUID(event_id))
        if not event:
            return jsonify({'message': 'Event not found!'}), 404
        
        event_details = {
            'id': str(event.id),
            'title': event.title,
            'price': event.price,
            'posted_by': event.posted_by,
            'image_url': event.image_url,
            'user_id': event.user_id,
            'profile_pic': event.profile_pic,
            'posted_date': event.posted_date.strftime('%Y-%m-%d')
        }
        return jsonify(event_details), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Get all events by user_id
@activity_api.route('/user/<string:user_id>', methods=['GET'])
def get_events_by_user_id(user_id):
    events = Activity.query.filter_by(user_id=user_id).all()
    if not events:
        return jsonify({'message': 'No events found for this user!'}), 404

    event_list = [
        {
            'id': str(event.id),
            'title': event.title,
            'price': event.price,
            'posted_by': event.posted_by,
            'image_url': event.image_url,
            'user_id': event.user_id,
            'profile_pic': event.profile_pic,
            'posted_date': event.posted_date.strftime('%Y-%m-%d')
        } for event in events
    ]
    return jsonify(event_list), 200

# Update activity
@activity_api.route('/<string:activity_id>', methods=['PUT'])
def update_activity(activity_id):
    data = request.get_json()

    # Fetch the activity by ID
    activity = Activity.query.filter_by(id=activity_id).first()
    
    if activity is None:
        return jsonify({'error': 'Activity not found!'}), 404

    try:
        # Update fields based on the provided data
        activity.title = data.get('title', activity.title)
        activity.price = data.get('price', activity.price)
        activity.posted_by = data.get('posted_by', activity.posted_by)
        activity.image_url = data.get('image_url', activity.image_url)
        activity.user_id = data.get('user_id', activity.user_id)
        activity.profile_pic = data.get('profile_pic', activity.profile_pic)
        activity.posted_date = data.get('posted_date', activity.posted_date)

        db.session.commit()
        return jsonify({'message': 'Activity updated successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete an event by its activity ID (event_id)
@activity_api.route('/<string:event_id>', methods=['DELETE'])
def delete_event_by_id(event_id):
    try:
        event = Activity.query.get(uuid.UUID(event_id))
        if not event:
            return jsonify({'message': 'Event not found!'}), 404
        
        db.session.delete(event)
        db.session.commit()
        return jsonify({'message': 'Event deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


