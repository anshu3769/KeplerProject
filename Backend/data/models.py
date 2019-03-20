"""
This module contains all the models
required by the application.

"""

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import backref, relationship

from .database import Base



class Player(Base):

    """
    Class to create a table for storing
    a player's personal information

    """
    __tablename__ = 'player'
    id = Column(Integer,primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    user_name = Column(String,  nullable=False, unique=True)

    # to have a relationship with scores
    scores = relationship('Score')


class Score(Base):

    """
    Class to create a table for storing
    player's scores

    """
    __tablename__ = 'score'
    id = Column(Integer, primary_key=True)
    user_name = Column(String, ForeignKey('player.user_name'))
    value = Column(Integer)
    player = relationship(
        Player,
        backref=backref('score',
                        uselist=True,
                        cascade='delete,all'))

class TopFiveScore(Base):

    """
    Class to create a table for storing
    top five scores for across all the
    players

    """
    __tablename__ = 'topfivescore'
    id = Column(Integer,primary_key=True)
    value = Column(Integer)
    user_name = Column(String, ForeignKey('player.user_name'))
    player = relationship(
        Player,
        backref=backref('topfivescore',
                        uselist=True,
                        cascade='delete,all'))



class Word(Base):

    """
    Class to create a table for storing
    words

    """
    __tablename__ = 'words'
    id = Column(Integer,primary_key=True)
    word = Column(String)

