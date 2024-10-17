from flask import Blueprint, request, jsonify
from models import db, Activity

activity_api = Blueprint('activity_api', __name__)


# Route to create a new activity
@activity_api.route('/add', methods=['POST'])
def create_activity():
    data = request.get_json()

    if not data or not data.get('name'):
        return jsonify({'error': 'Activity name is required!'}), 400

    try:
        activity = Activity(name=data['name'], description=data.get('description'))
        db.session.add(activity)
        db.session.commit()
        return jsonify({'message': 'Activity created!', 'activity': {'activity_id': activity.activity_id, 'name': activity.name, 'description': activity.description}}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error creating activity: {str(e)}'}), 500


# Route to get all activities
@activity_api.route('/getall', methods=['GET'])
def get_activities():
    try:
        activities = Activity.query.all()
        if not activities:
            return jsonify({'error': 'No activities found!'}), 404

        return jsonify([{'activity_id': act.activity_id, 'name': act.name, 'description': act.description} for act in activities]), 200
    except Exception as e:
        return jsonify({'error': f'Error retrieving activities: {str(e)}'}), 500



# Method to get activity details by activity_id
@activity_api.route('/<int:activity_id>', methods=['GET'])
def get_activity(activity_id):
    try:
        activity = Activity.query.get_or_404(activity_id)
        return jsonify({
            'activity_id': activity.activity_id,
            'name': activity.name,
            'description': activity.description,
            'created_at': activity.created_at
        }), 200
    except Exception as e:
        return jsonify({'error': f'Error retrieving activity: {str(e)}'}), 500



# Method to update activity data
@activity_api.route('/update/<int:activity_id>', methods=['PUT'])
def update_activity(activity_id):
    data = request.get_json()
    activity = Activity.query.get_or_404(activity_id)

    if not data:
        return jsonify({'error': 'No data provided for update!'}), 400

    try:
        activity.name = data.get('name', activity.name)
        activity.description = data.get('description', activity.description)
        db.session.commit()
        return jsonify({'message': 'Activity updated!', 'activity': {'activity_id': activity.activity_id, 'name': activity.name, 'description': activity.description}}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error updating activity: {str(e)}'}), 500


# Method to delete activity by activity_id
@activity_api.route('/<int:activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    activity = Activity.query.filter_by(activity_id=activity_id).first()
    
    if not activity:
        return jsonify({'error': f'Activity with ID {activity_id} not found!'}), 404
    
    try:
        db.session.delete(activity)
        db.session.commit()
        return jsonify({'message': f'Activity with ID {activity_id} deleted successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error deleting activity: {str(e)}'}), 500
