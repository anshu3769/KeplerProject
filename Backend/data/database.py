from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker


#create an engine.
#NOTE: An sqlalchemy engine manages two things
# 1. Connection pools (max 5 by default)
# 2. Dialects which tell the sqlalchemy ORM about which database dialect to use. e.g. sqlite3, postgres etc
engine = create_engine('sqlite:///database.sqlite3', convert_unicode=True)


#Sessions are created to ensure consistency in the database
#sessionmaker creates a Session class that is used to create a
#session
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
# Base clas for our class definitions
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()

    #from .models import Department, Employee, Role
    from .models import Player, Score, Word
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # Create the fixtures
#    engineering = Department(name='Engineering')
#    db_session.add(engineering)
#    hr = Department(name='Human Resources')
#    db_session.add(hr)

    # Create the fixtures
    player_1 = Player(first_name='Anshu',last_name='Tomar', user_name='anshu-1')
    db_session.add(player_1)
    player_2 = Player(first_name='Bunny', last_name='Tomar',user_name='anshu-2')
    db_session.add(player_2)

    score_1 = Score(value=10,player=player_1)
    db_session.add(score_1)
    score_2 = Score(value=20,player=player_1)
    db_session.add(score_2)
    score_3 = Score(value=30,player=player_2)
    db_session.add(score_3)
    score_4 = Score(value=40,player=player_2)
    db_session.add(score_4)
    score_5 = Score(value=50,player=player_2)
    db_session.add(score_5)
    score_6 = Score(value=60,player=player_2)
    db_session.add(score_6)

    word_1 = Word(word='eat')
    db_session.add(word_1)
    word_2 = Word(word='sleep')
    db_session.add(word_1)
    word_3 = Word(word='fun')
    db_session.add(word_3)


#    engineer = Role(name='engineer')
#    db_session.add(engineer)
#    manager = Role(name='manager')
#    db_session.add(manager)
#
#    peter = Employee(name='Peter', department=engineering, role=engineer)
#    db_session.add(peter)
#    roy = Employee(name='Roy', department=engineering, role=engineer)
#    db_session.add(roy)
#    tracy = Employee(name='Tracy', department=hr, role=manager)
#    db_session.add(tracy)
#

    db_session.commit()


