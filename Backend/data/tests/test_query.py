from graphene.test import Client
from ..schema import schema
from .. import database

client = Client(schema)
database.init_db()

def test_player_firstname_query(snapshot):
    query= """
        query {
            players {
                firstName
            }
        }
    """
    snapshot.assert_match(client.execute(query))

def test_player_lastname_query(snapshot):
    query= """
        query {
            players {
                lastName
            }
        }
    """
    snapshot.assert_match(client.execute(query))

def test_words_query(snapshot):
    query= """
        query {
            words {
                word
            }
        }
    """
    snapshot.assert_match(client.execute(query))


