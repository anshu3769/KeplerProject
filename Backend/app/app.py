#!/usr/bin/env python

from flask import Flask

from database import database as db
from flask_graphql import GraphQLView
#from database import schema
from graphqlSchema import schema

app = Flask(__name__)
app.debug = True

default_query = '''
{
  allEmployees {
    edges {
      node {
        id,
        name,
        department {
          id,
          name
        },
        role {
          id,
          name
        }
      }
    }
  }
}'''.strip()


app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema.schema, graphiql=True))


@app.teardown_appcontext
def shutdown_session(exception=None):
    db.db_session.remove()

#if __name__ == '__main__':
#    init_db()
#app.run()
