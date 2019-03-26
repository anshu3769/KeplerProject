from graphene.test import Client
from ..schema import schema
from .. import database

client = Client(schema)
database.init_db()

def test_create_player_mutation(snapshot):
    mutation= """
        mutation {
            createPlayer(
                firstName:"Kepler"
                lastName:"Group"
                userName:"KG"){
  	    player{
                firstName
                lastName
                userName
                }
            }
        }
    """
    snapshot.assert_match(client.execute(mutation))



def test_update_score_mutation(snapshot):
    mutation= """
        mutation {
            updateScores(
                userName:"KG"
                userScore:50){
            score{
                userName
                value
                }
            }
        }
    """
    snapshot.assert_match(client.execute(mutation))


def test_update_top_score_mutation(snapshot):
    mutation= """
        mutation {
            updateTopScores(
                userName:"KG"
                userScore:50){
            score{
                userName
                value
                }
            }
        }
    """
    snapshot.assert_match(client.execute(mutation))

