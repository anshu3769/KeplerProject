import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType, utils
from database import models
from database import database as db
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
        model = models.Scores
        interfaces = (relay.Node,)


class ScoresConnection(relay.Connection):
    class Meta:
        node = Score


class SmallWords(SQLAlchemyObjectType):
    class Meta:
        model = models.SmallWords
        interfaces = (relay.Node,)

class SmallWordsConnection(relay.Connection):
    class Meta:
        node = SmallWords

###########################################################

class Department(SQLAlchemyObjectType):
    class Meta:
        model = models.Department
        interfaces = (relay.Node, )


class DepartmentConnection(relay.Connection):
    class Meta:
        node = Department


class Employee(SQLAlchemyObjectType):
    class Meta:
        model = models.Employee
        interfaces = (relay.Node, )


class EmployeeConnections(relay.Connection):
    class Meta:
        node = Employee


class Role(SQLAlchemyObjectType):
    class Meta:
        model = models.Role
        interfaces = (relay.Node, )


class RoleConnection(relay.Connection):
    class Meta:
        node = Role


SortEnumEmployee = utils.sort_enum_for_model(models.Employee, 'SortEnumEmployee',
    lambda c, d: c.upper() + ('_ASC' if d else '_DESC'))


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allow only single column sorting
    all_employees = SQLAlchemyConnectionField(
                EmployeeConnections,
        sort=graphene.Argument(
            SortEnumEmployee,
            default_value=utils.EnumValue('id_asc', models.Employee.id.asc())))
    # Allows sorting over multiple columns, by default over the primary key
    all_roles = SQLAlchemyConnectionField(RoleConnection)
    # Disable sorting over this field
    all_departments = SQLAlchemyConnectionField(DepartmentConnection, sort=None)

    all_players = SQLAlchemyConnectionField(PlayerConnection)
    all_scores = SQLAlchemyConnectionField(ScoresConnection)

    all_small_words = SQLAlchemyConnectionField(SmallWordsConnection)



class CreatePlayer(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    player = graphene.Field(lambda: Player)

    def mutate(self, info, name):
        player = models.Player(name=name)

        db.db_session.add(player)
        db.db_session.commit()

        return CreatePlayer(player=player)


class CreateSmallWords(graphene.Mutation):
    class Arguments:
        word = graphene.String(required=True)

    word = graphene.Field(lambda: SmallWords)

    def mutate(self, info, word):
        word = models.SmallWords(name=word)

        db.db_session.add(word)
        db.db_session.commit()

        return CreateSmallWord(word=word)

class Mutation(graphene.ObjectType):
    create_player = CreatePlayer.Field()

schema = graphene.Schema(query=Query, mutation=Mutation, types=[Department, Employee, Role,Player, Score, SmallWords])
