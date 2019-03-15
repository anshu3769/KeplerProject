import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType, utils
from . import models
from . import database as db
#from models import Department as DepartmentModel
#from models import Employee as EmployeeModel
#from models import Role as RoleModel

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

###########################################################
#
#class Department(SQLAlchemyObjectType):
#    class Meta:
#        model = models.Department
#        interfaces = (relay.Node, )
#
#
#class DepartmentConnection(relay.Connection):
#    class Meta:
#        node = Department
#
#
#class Employee(SQLAlchemyObjectType):
#    class Meta:
#        model = models.Employee
#        interfaces = (relay.Node, )
#
#
#class EmployeeConnections(relay.Connection):
#    class Meta:
#        node = Employee
#
#
#class Role(SQLAlchemyObjectType):
#    class Meta:
#        model = models.Role
#        interfaces = (relay.Node, )
#
#
#class RoleConnection(relay.Connection):
#    class Meta:
#        node = Role
#
#
#SortEnumEmployee = utils.sort_enum_for_model(models.Employee, 'SortEnumEmployee',
#    lambda c, d: c.upper() + ('_ASC' if d else '_DESC'))


class Query(graphene.ObjectType):
    node = relay.Node.Field()

    players = graphene.List(Player)
    words = graphene.List(Word)
    top_scores = graphene.List(TopFiveScore)


    def resolve_players(self, info, *args):
        query = Player.get_query(info)
        print("resolving players#####")
        return query.all()

    def resolve_words(self, info, *args):
        query = Word.get_query(info)
        print("resolving words#####")
        return query.all()

    def resolve_top_scores(self,info, *args):
        query = TopFiveScore.get_query(info)
        return query.all()


    # Allow only single column sorting
#    all_employees = SQLAlchemyConnectionField(
#                EmployeeConnections,
#        sort=graphene.Argument(
#            SortEnumEmployee,
#            default_value=utils.EnumValue('id_asc', models.Employee.id.asc())))
#    # Allows sorting over multiple columns, by default over the primary key
#    all_roles = SQLAlchemyConnectionField(RoleConnection)
#    # Disable sorting over this field
#    all_departments = SQLAlchemyConnectionField(DepartmentConnection, sort=None)
#


    all_players = SQLAlchemyConnectionField(PlayerConnection)
    all_scores = SQLAlchemyConnectionField(ScoresConnection)
    all_small_words = SQLAlchemyConnectionField(WordConnection)



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

            return UpdateScores(score=score)



#class UpdateScore(graphene.Mutation):
#    class Arguments:
#        #name = graphene.String(required=True)
#        user_score = graphene.Int(required=True)

#    score = graphene.Field(lambda: Score)

#    def mutate(self, info):
#        print("###Create Score####")

#        #user = models.Player.query(userName=user_name)
#        #if user is None:
#        #    ##Throw exception
#        #    print("Exception")
#        #else:
#        score = models.Score(score=user_score)

#        db.db_session.add(score)
#        db.db_session.commit()

#        # updateTopScore = """
#        #                     mutation updatetopscores(username:$user_name,usercscore:$user_score){
#        #         topsscores{
#        #                 username,
#        #                 score
#        #         }
#        #                     }
#        #         """

#        return UpdateScore(score=score)

class UpdateTopScores(graphene.Mutation):
    class Arguments:
        user_name = graphene.String(required=True)
        user_score = graphene.Int(required=True)

    score = graphene.Field(lambda: TopFiveScores)

    def mutate(self, info, user_name, user_score):
        current_smallest_top_score = models.TopFiveScores.query.order_by(TopFiveScores.scores).limit(1)

        if user_score > current_smallest_top_score:
            current_smallest_top_score.player_id = user_name
            current_smallest_top_score.score = user_score

        db.db_session.commit()

        score = models.TopFiveScores.query.all()

        return UpdateScore(score=score)



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

schema = graphene.Schema(query=Query, mutation=Mutation, types=[Player, Score, Word])


#schema = graphene.Schema(query=Query, mutation=Mutation, types=[Department, Employee, Role,Player, Score, Words])
