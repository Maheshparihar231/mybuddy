import psycopg2
from flask import Flask
from flask_cors import CORS
from models import db
from routes.user import user_api
from routes.activity import activity_api
from routes.auth import auth_api
from routes.userdetails import userdetails_api
from routes.notifications import notification_api
from routes.posts import post_api
from config import Config

def create_database_if_not_exists():
    """Check if the PostgreSQL database exists, and if not, create it."""
    dbname = "rumble-buddy"
    user = "postgres"  # Replace with your PostgreSQL username
    password = "root"  # Replace with your PostgreSQL password
    host = "localhost"

    # Connect to the default 'postgres' database to create the target database
    conn = psycopg2.connect(dbname="postgres", user=user, password=password, host=host)
    conn.autocommit = True
    cursor = conn.cursor()

    # Check if the database exists
    cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = '{dbname}'")
    exists = cursor.fetchone()

    if not exists:
        # Create the database if it does not exist
        cursor.execute(f'CREATE DATABASE "{dbname}"')
        print(f"Database {dbname} created successfully")
    else:
        print(f"Database {dbname} already exists")

    # Close the cursor and connection
    cursor.close()
    conn.close()

def create_app():
    # Check and create the database if necessary
    create_database_if_not_exists()

    # Now proceed with creating the Flask app
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app)  # Enable CORS for all routes

    with app.app_context():
        db.create_all()  # Create database tables

    app.register_blueprint(activity_api, url_prefix='/api/activity')
    app.register_blueprint(user_api, url_prefix='/api/user')
    app.register_blueprint(auth_api, url_prefix='/api/auth')
    app.register_blueprint(post_api, url_prefix='/api/posts')
    app.register_blueprint(userdetails_api, url_prefix='/api/userdetails')
    app.register_blueprint(notification_api, url_prefix='/api/notification')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

