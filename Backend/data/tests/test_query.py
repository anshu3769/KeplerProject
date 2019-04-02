from graphene.test import Client
from ..schema import schema
from .. import database

client = Client(schema)
database.init_db()

def test_player_firstnames_query(snapshot):
    query= """
        query {
            players {
                firstName
            }
        }
    """
    snapshot.assert_match(client.execute(query))

def test_player_lastnames_query(snapshot):
    query= """
        query {
            players {
                lastName
            }
        }
    """
    snapshot.assert_match(client.execute(query))


def test_player_by_firstname_query(snapshot):
    query= """
        query {
            players(firstName:"Anshu") {
                firstName
                lastName
            }
        }
    """
    snapshot.assert_match(client.execute(query))

def test_player_by_lastname_query(snapshot):
    query= """
        query {
            players(lastName:"Tomar") {
                firstName
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


def test_top_scores_query(snapshot):
    query= """
        query {
            topScores {
                userName
                value
            }
        }
    """
    snapshot.assert_match(client.execute(query))

