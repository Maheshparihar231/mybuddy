import uuid
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'  # Keep table name as 'users'
    user_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # Add password field
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserDetails(db.Model):
    __tablename__ = 'userdetails'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=True, default='https://picsum.photos/200/200')
    name = db.Column(db.String(120), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    posts = db.Column(db.Integer, nullable=False, default=0)
    followers = db.Column(db.Integer, nullable=False, default=0)
    default_location = db.Column(db.String(255), nullable=True)
    is_verified = db.Column(db.Boolean, nullable=False, default=False)
    date_joined = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    account_type = db.Column(db.Boolean, nullable=False, default=True)  # True for personal, False for business
    is_business_account = db.Column(db.Boolean, nullable=False, default=False)
    following = db.Column(db.Integer, nullable=False, default=0)
    phone_number = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    website = db.Column(db.String(255), nullable=True)

class Post(db.Model):
    __tablename__ = 'posts'
    post_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(db.String(120), nullable=False)  # Foreign key can be added if linked to user table
    username = db.Column(db.String(80), nullable=False)
    profile_picture = db.Column(db.String(255), nullable=True, default='https://picsum.photos/200/200')
    is_verified = db.Column(db.Boolean, nullable=False, default=False)
    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(255), nullable=True)
    posted_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    likes_count = db.Column(db.Integer, nullable=False, default=0)
    tags = db.Column(db.PickleType, nullable=True, default=[])  # Store list of tags
    shares_count = db.Column(db.Integer, nullable=False, default=0)
    bookmarks_count = db.Column(db.Integer, nullable=False, default=0)


class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    event_name = db.Column(db.String(120), nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Time when the notification was triggered
    event_id = db.Column(db.String(120), nullable=False)  # Could be linked to an event table
    posted_time = db.Column(db.String(120), nullable=False)  # Human-readable time string (e.g., "October 15, 2023, 3:00 PM")
    is_readed = db.Column(db.Boolean, nullable=False, default=False)  # Notification read status


class Activity(db.Model):
    __tablename__ = 'activities'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)  # Unique event identifier
    title = db.Column(db.String(255), nullable=False)  # Title of the event
    price = db.Column(db.String(50), nullable=False)  # Price in string format, e.g., "$15/person"
    image_url = db.Column(db.String(255), nullable=False, default='https://picsum.photos/1920/1080')  # URL for event image
    user_id = db.Column(db.String(120), nullable=False)  # ID of the user who posted the event
    posted_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Date and time the event was posted
    location = db.Column(db.String(255), nullable=False)  # Event location
    description = db.Column(db.String(255), nullable=False)  # Description of the event
    reviews = db.Column(db.Integer, nullable=False, default=0)  # Number of reviews
    time_zone = db.Column(db.String(64), nullable=False)  # Time zone of the event
    share_link = db.Column(db.String(255), nullable=False)  # Shareable link for the event

    