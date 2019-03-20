from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from .utils import generateWords

# create an engine.
# NOTE: An sqlalchemy engine manages two things
# 1. Connection pools (max 5 by default)
# 2. Dialects which tell the sqlalchemy ORM about which database dialect to use. e.g. sqlite3, postgres etc
engine = create_engine("sqlite:///database.sqlite3", convert_unicode=True)


# Sessions are created to ensure consistency in the database
# sessionmaker creates a Session class that is used to create a session
db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)
# Base class for our class definitions
# Meaning not much clear of the declarative class??
Base = declarative_base()
Base.query = db_session.query_property()


# Create the utillity function to initialize database on startup
def init_db():

    """
    Create few entries in the database
    on startup

    """

    from .models import Player, Score, Word, TopFiveScore

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # Add players
    player_1 = Player(first_name="Anshu", last_name="Tomar", user_name="anshu-1")
    db_session.add(player_1)
    player_2 = Player(first_name="Bunny", last_name="Tomar", user_name="anshu-2")
    db_session.add(player_2)

    # Add scores
    score_1 = Score(value=10, player=player_1)
    db_session.add(score_1)
    score_2 = Score(value=20, player=player_1)
    db_session.add(score_2)
    score_3 = Score(value=30, player=player_2)
    db_session.add(score_3)
    score_4 = Score(value=40, player=player_2)
    db_session.add(score_4)
    score_5 = Score(value=50, player=player_2)
    db_session.add(score_5)
    score_6 = Score(value=60, player=player_2)
    db_session.add(score_6)

    # Add words
    words = generateWords()

    for w in words:
        word = Word(word=w)
        db_session.add(word)

    # Add top scores
    top_score_1 = TopFiveScore(value=60, player=player_2)
    db_session.add(top_score_1)
    top_score_2 = TopFiveScore(value=50, player=player_2)
    db_session.add(top_score_2)
    top_score_3 = TopFiveScore(value=40, player=player_2)
    db_session.add(top_score_3)
    top_score_4 = TopFiveScore(value=30, player=player_2)
    db_session.add(top_score_4)
    top_score_5 = TopFiveScore(value=20, player=player_1)
    db_session.add(top_score_5)

    db_session.commit()
