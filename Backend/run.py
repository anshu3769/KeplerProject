#!/usr/bin/env python

from data import database as db
from data import schema
from flask import Flask
from flask_graphql import GraphQLView
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.debug = True
    app.add_url_rule('/graphql',
                  view_func=GraphQLView.as_view(
                     'graphql',
                      schema=schema.schema,
                      graphiql=True))


    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db.db_session.remove()

    return app

if __name__ == '__main__':

    db.init_db()

    app = create_app()
    CORS(app, resources={r'/graphql': {'origins': '*'}})

    app.run(host='0.0.0.0')

