import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType, utils
from . import models
from . import database as db

class Player(SQLAlchemyObjectType):
    class Meta:
        model = models.Player
        interfaces = (relay.Node,)

class PlayerConnection(relay.Connection):
    class Meta:
        node = Player


class Score(SQLAlchemyObjectType):
    class Meta:
        model = models.Score
        interfaces = (relay.Node,)


class ScoresConnection(relay.Connection):
    class Meta:
        node = Score


class Word(SQLAlchemyObjectType):
    class Meta:
        model = models.Word
        interfaces = (relay.Node,)

class WordConnection(relay.Connection):
    class Meta:
        node = Word


class TopFiveScore(SQLAlchemyObjectType):
    class Meta:
        model = models.TopFiveScore
        #interfaces =  (relay.Node,)

#SortEnumEmployee = utils.sort_enum_for_model(models.Employee, 'SortEnumEmployee',
#    lambda c, d: c.upper() + ('_ASC' if d else '_DESC'))


class Query(graphene.ObjectType):
    node = relay.Node.Field()

    #players = graphene.List(Player)
    words = graphene.List(Word)
    top_scores = graphene.List(TopFiveScore)


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

    def resolve_players(self,info, first_name=None, last_name=None,user_name=None, *args):

        #query = Player.get_query(info,first_name,last_name, user_name,*args)
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

    def resolve_words(self, info, *args):
        query = Word.get_query(info,*args)
        print("resolving words#####")
        return query.all()

    def resolve_top_scores(self, info, *args):
        query = TopFiveScore.get_query(info,*args)
        return query.all()


    def resolve_player_scores(self,info, user_name=None,*args):

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



    # def resolve_all_players(self, info,sort):
    #     return ['a','b',]

class CreatePlayer(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        user_name = graphene.String(required=True)

    player = graphene.Field(lambda: Player)

    def mutate(self, info, first_name, last_name, user_name):
        print("###Create Player####")
        if user_name is "":
            raise ValueError ("User name can not be empty")
        else:
            player = models.Player(first_name=first_name, last_name=last_name,user_name=user_name)

            db.db_session.add(player)
            db.db_session.commit()

            return CreatePlayer(player=player)


class UpdateScores(graphene.Mutation):
    class Arguments:
        user_name = graphene.String(required=True)
        user_score = graphene.Int(required=True)

    score = graphene.Field(lambda: Score)

    def mutate(self, info, user_name, user_score):
        print("###Update Scores####")
        player = models.Player.query.filter_by(user_name=user_name).one_or_none()


        if player is None:
            raise ValueError ("Exception:: Player not found")
        else:
            score=models.Score(value=user_score)

            #update the score for the player
            player.scores.append(score)

            db.db_session.add(score)
            db.db_session.commit()

            updateTopScores(user_name,user_score)

            return UpdateScores(score=score)

#class ScoreInput(graphene.InputObjectType):
#    user_name = graphene.String(required=True)
#    user_score = graphene.Int(required=True)


class UpdateTopScores(graphene.Mutation):
    class Arguments:
        user_name = graphene.String(required=True)
        user_score = graphene.Int(required=True)

        #score_data = ScoreInput(required=True)

    score = graphene.Field(lambda: TopFiveScore)

    def mutate(self, info, user_name, user_score):
        print("####update top scores mutation####")
        current_smallest_top_score = models.TopFiveScore.query.order_by(models.TopFiveScore.value).limit(1)

        if user_score > current_smallest_top_score[0].value:
            score = models.TopFiveScore(value=user_score,user_name=user_name)

            db.db_session.delete(current_smallest_top_score[0])
            db.db_session.add(score)

            db.db_session.commit()

            return UpdateTopScores(score=score)



class CreateWords(graphene.Mutation):
    class Arguments:
        word = graphene.String(required=True)

    word = graphene.Field(lambda: Word)

    def mutate(self, info, word):
        word = models.Word(word=word)

        db.db_session.add(word)
        db.db_session.commit()

        return CreateWord(word=word)

class Mutation(graphene.ObjectType):
    create_player = CreatePlayer.Field()
    update_scores = UpdateScores.Field()
    create_word = CreateWords.Field()
    update_top_scores = UpdateTopScores.Field()

schema = graphene.Schema(query=Query, mutation=Mutation, types=[Player, Score, Word])

#####################
#Utility function
#####################
def updateTopScores(userName,userScore):
    print("###update top scores###")
    mutation = '''mutation
            {
            updateTopScores
            (
                $userName:String!,
                $userScore:Int!)
                {
                    score{
                        userName
                        value
                    }
                }
        }'''

    schema.execute(mutation,variable_values={'userName':userName, 'userScore':userScore})


