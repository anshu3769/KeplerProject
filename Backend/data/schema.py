"""
This module contains all the models (build on
top of SQLAlchemyObjectType), queries and mutations
that can be called using Graphql.

"""

import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType, utils
from . import models
from . import database as db

import logging
logger = logging.getLogger(__name__)

class Player(SQLAlchemyObjectType):

    """
    A player class. Inherits from
    SQLALchemyObjectType.

    """
    class Meta:
        model = models.Player
        #interfaces = (relay.Node,)

class PlayerConnection(relay.Connection):
    """
     A player connection (a list). Used in
     querying the data using slicing/paginating.

    """
    class Meta:
        node = Player


class Score(SQLAlchemyObjectType):

    """
    A Score class. Inherits from
    SQLAlchemyObjectType.

    """
    class Meta:
        model = models.Score
        #interfaces = (relay.Node,)


class ScoresConnection(relay.Connection):
    """
     A score connection(a list). Used in
     querying the data using slicing/paginating.

    """
    class Meta:
        node = Score


class Word(SQLAlchemyObjectType):

    """
    Word class. Inherits from SQLAlchemyObjectType.

    """
    class Meta:
        model = models.Word
        #interfaces = (relay.Node,)

class WordConnection(relay.Connection):
    """

     A word connection(a list). Used in
     querying the data using slicing/paginating.

    """
    class Meta:
        node = Word


class TopFiveScore(SQLAlchemyObjectType):


    """
    TopFiveScore class. Inherits from
    SQLAlchemyObjectType.

    """
    class Meta:
        model = models.TopFiveScore
        #interfaces =  (relay.Node,)


class Query(graphene.ObjectType):


    """
    Query the databse using GraphQl queries.


    NOTE: All resolve methods are static
    by default. Thus the first argument to
    the method i.e. self need not to be an
    actual object instance.

    """
    node = relay.Node.Field()

    words = graphene.List(Word)

    top_scores = graphene.List(TopFiveScore)


    # First argument is the return type from
    # the resolve_players query. All other are
    # arguments to the resolve_players method
    #itself.
    players = graphene.NonNull(
        graphene.List(Player),
        first_name = graphene.String(),
        last_name = graphene.String(),
        user_name = graphene.String(),
    )

    player_scores = graphene.NonNull(
        graphene.List(Score),
        user_name = graphene.String(),
    )

    #@staticmethod
    def resolve_players(
            self,
            info,
            first_name:graphene.String() = None,
            last_name:graphene.String() = None,
            user_name:graphene.String() = None,
            *args
    ) -> graphene.List(Player):

        logger.debug("Resolving Players")

        query = models.Player.query

        if all(item is None for item in [first_name, last_name, user_name]):
            players = query.all()

        elif first_name is not None:
            players = query.filter_by(first_name=first_name)


        elif last_name is not None:
            players = query.filter_by(last_name=last_name)

        elif user_name is not None:
            players = query.filter_by(user_name=user_name)

        return players


    #@staticmethod
    def resolve_words(self, info, *args) -> graphene.List(Word):

        logger.debug("Resolving Words")
        query = Word.get_query(info,*args)

        return query.all()

    #@staticmethod
    def resolve_top_scores(self,info, *args) -> graphene.List(Score):

        logger.debug("Resolving Top Scores")
        query = TopFiveScore.get_query(info,*args)
        return query.order_by(models.TopFiveScore.value.desc()).all()


    #@staticmethod
    def resolve_player_scores(
            self,
            info,
            user_name:graphene.String()=None,
            *args
    ) -> graphene.List(Score):

        logger.debug("Resolve scores of a player")
        query = models.Score.query

        if user_name is None:
            player_scores = query.all()

        else:
            player_scores = query.filter_by(user_name=user_name)

        return player_scores


    # Query by connections
    all_players = SQLAlchemyConnectionField(PlayerConnection)
    all_scores = SQLAlchemyConnectionField(ScoresConnection)
    all_words = SQLAlchemyConnectionField(WordConnection)



class CreatePlayer(graphene.Mutation):

    """
    Class for creating a new player
    using graphql mutation

    """
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        user_name = graphene.String(required=True)

    player = graphene.Field(lambda: Player)

    def mutate(
            self,
            info,
            first_name:graphene.String(),
            last_name:graphene.String(),
            user_name: graphene.String()
    ):

        logger.debug("Creating a Player")

        if user_name is "":
            raise ValueError ("User name can not be empty")
        else:
            player = models.Player(
                first_name=first_name,
                last_name=last_name,
                user_name=user_name
            )

            db.db_session.add(player)
            db.db_session.commit()

            return CreatePlayer(player=player)


class UpdateScores(graphene.Mutation):

    """
    Class to updating scores of a player

    """
    class Arguments:
        user_name = graphene.String(required=True)
        user_score = graphene.Int(required=True)

    score = graphene.Field(lambda: Score)

    def mutate(self,
               info,
               user_name:graphene.String(),
               user_score:graphene.Int()):

        logger.debug("Updating Scores")

        player = models.Player.query.filter_by(
            user_name=user_name
        ).one_or_none()

        if player is None:
            raise ValueError ("Exception:: Player not found")
        else:
            score=models.Score(value=user_score)

            #update the score for the player
            player.scores.append(score)

            db.db_session.add(score)
            db.db_session.commit()

            #updateTopScores(user_name,user_score)
            UpdateTopScores.mutate(self,info,user_name,user_score)

            return UpdateScores(score=score)


class UpdateTopScores(graphene.Mutation):

    """
    Update top scores through graphql mutation.
    Contains:
    1) mutate method which is called by
    the mutations
    2) the arguments passed during
    the mutation
    3) score attribute which is output of the mutation

    """
    class Arguments:
        user_name = graphene.String(
            description="user name the player provided while registration",
            required=True
        )

        user_score = graphene.Int(required=True)

        #score_data = ScoreInput(required=True)

    score = graphene.Field(lambda: TopFiveScore)

    def mutate(self,
               info,
               user_name:graphene.String(),
               user_score:graphene.Int()):

        logger.debug("Updating top scores")

        current_smallest_top_score = models.TopFiveScore.query.order_by(
            models.TopFiveScore.value
        ).limit(1)

        if user_score > current_smallest_top_score[0].value:
            score = models.TopFiveScore(value=user_score,user_name=user_name)

            db.db_session.delete(current_smallest_top_score[0])
            db.db_session.add(score)

            db.db_session.commit()

            return UpdateTopScores(score=score)



class CreateWords(graphene.Mutation):

    """
    Class to create words through
    graphql mutation

    """
    class Arguments:
        word = graphene.String(required=True)

    word = graphene.Field(lambda: Word)

    def mutate(
            self,
            info,
            word:graphene.String()
    ):
        word = models.Word(word=word)

        db.db_session.add(word)
        db.db_session.commit()

        return CreateWords(word=word)

class Mutation(graphene.ObjectType):

    """
    Class to create all the mutation objects
    that can be called though graphql

    """
    create_player = CreatePlayer.Field()
    update_scores = UpdateScores.Field()
    create_word = CreateWords.Field()
    update_top_scores = UpdateTopScores.Field()



schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
    types=[Player, Score, Word]
)

