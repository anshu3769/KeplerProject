from app import app
from flask_cors import CORS
from data import database as db

if __name__ == '__main__':
    db.init_db()
    CORS(app.app, resources={r'/graphql': {'origins': '*'}})
    app.app.run()

