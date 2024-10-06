from flask import Blueprint, request, jsonify
from models import db, User, Activity

bp = Blueprint('api', __name__)

@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(username=data['username'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created!'}), 201

@bp.route('/activities', methods=['POST'])
def create_activity():
    data = request.get_json()
    activity = Activity(name=data['name'], description=data['description'])
    db.session.add(activity)
    db.session.commit()
    return jsonify({'message': 'Activity created!'}), 201

@bp.route('/activities', methods=['GET'])
def get_activities():
    activities = Activity.query.all()
    return jsonify([{'activity_id': act.activity_id, 'name': act.name, 'description': act.description} for act in activities]), 200


