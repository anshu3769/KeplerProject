from app import app
from database import database as db

if __name__ == '__main__':
    db.init_db()
    app.app.run()

