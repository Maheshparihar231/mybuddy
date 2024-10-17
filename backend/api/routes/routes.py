from flask import Blueprint, request, jsonify
from models import db, User, Activity

bp = Blueprint('api', __name__)

