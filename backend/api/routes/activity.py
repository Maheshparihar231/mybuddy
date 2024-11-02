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
            image_url=data.get('image_url', 'https://picsum.photos/640/480?random=1'),  # Default image if not provided
            user_id=data['user_id'],
            profile_pic=data.get('profile_pic', 'https://picsum.photos/200/200?random=1'),  # Default profile pic if not provided
            posted_date=data.get('posted_date'),  # Optional posted_date, use current date if not provided
            location=data['location'],
            description=data['description'],
            reviews=data['reviews'],
            time_zone=data['time_zone'],
        )

        # Add and commit the new event to the database
        db.session.add(new_event)
        db.session.commit()

        return jsonify({'message': 'Activity created successfully!', 'activity_id': str(new_event.id)}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get all activities, ordered by posted date (latest first)
@activity_api.route('/all', methods=['GET'])
def get_all_activities():
    activities = Activity.query.order_by(Activity.posted_date.desc()).all()
    if not activities:
        return jsonify({'message': 'No activities found!'}), 404

    activity_list = [
        {
            'id': str(activity.id),
            'title': activity.title,
            'price': activity.price,
            'image_url': activity.image_url,
            'user_id': activity.user_id,
            'posted_date': activity.posted_date.strftime('%Y-%m-%d'),
            'location': activity.location,
            'description': activity.description,
            'reviews': activity.reviews,
            'time_zone': activity.time_zone,
        } for activity in activities
    ]
    return jsonify(activity_list), 200


# Get an event by its activity ID (event_id)
@activity_api.route('/<string:event_id>', methods=['GET'])
def get_event_by_id(event_id):
    try:
        activity = Activity.query.get(uuid.UUID(event_id))
        if not activity:
            return jsonify({'message': 'Event not found!'}), 404
        
        event_details = {
            'id': str(activity.id),
            'title': activity.title,
            'price': activity.price,
            'image_url': activity.image_url,
            'user_id': activity.user_id,
            'posted_date': activity.posted_date.strftime('%Y-%m-%d'),
            'location': activity.location,
            'description': activity.description,
            'reviews': activity.reviews,
            'time_zone': activity.time_zone,
        }
        return jsonify(event_details), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Get all events by user_id
@activity_api.route('/user/<string:user_id>', methods=['GET'])
def get_events_by_user_id(user_id):
    activities = Activity.query.filter_by(user_id=user_id).all()
    if not activities:
        return jsonify({'message': 'No events found for this user!'}), 404

    event_list = [
        {
            'id': str(activity.id),
            'title': activity.title,
            'price': activity.price,
            'image_url': activity.image_url,
            'user_id': activity.user_id,
            'posted_date': activity.posted_date.strftime('%Y-%m-%d'),
            'location': activity.location,
            'description': activity.description,
            'reviews': activity.reviews,
            'time_zone': activity.time_zone,
        } for activity in activities
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
        activity.image_url = data.get('image_url', activity.image_url)
        activity.user_id = data.get('user_id', activity.user_id)
        activity.posted_date = data.get('posted_date', activity.posted_date)
        activity.location = data.get('location', activity.location)
        activity.description = data.get('description', activity.description)
        activity.reviews = data.get('reviews', activity.reviews)
        activity.time_zone = data.get('time_zone', activity.time_zone)

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


