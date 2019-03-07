# KeplerProject
An attmept to build a simple typing game using React, Flask and Graphql.

## Design Details
 The game has two components. Following are the tools used for the implementation:
  
  * Front-end
     * [create-react-app](https://github.com/facebook/create-react-app) for builing React UI
     * [React Apollo](https://www.apollographql.com/docs/react/essentials/get-started.html) for connection 
       with graphql server in back-end
   
  * Back-end
    * [Python Flask](http://flask.pocoo.org/docs/0.12/tutorial/) 
    * Sqlite3 database (in built in Flask)
    * SqlAlchemy driver for database (in built in Flask)
    * [Graphql](https://www.howtographql.com/graphql-python/0-introduction/)
    * [Graphene](https://github.com/graphql-python/graphene-sqlalchemy) for using Graphql with Flask
    
   The front-end consists of single page UI which provides the following functionlality to 
   the user in order:
   * The user is first asked to register in order to play the game.
   * Upon registration, users details will be added to the database.
   * The user can play the game by starting a 1 minute timer displayed on the screen after registration.
   * During the game, words will appear on the screen and the user will type the word and submit it.
   * Upon timer expiry, the score will be calculated and displayed on the screen of the user.

The user will be able to see over all top five scores and his/her personal scores.

   The back-end consists of the following tables:
   ###   Table Name      Fields
      1. Player          id, first_name, last_name, user_name(unique_constraint)
      2. Score           id, player_id, score
      3. TopFiveScore    id, user_name, score
      4. Word            id, word
      
      
When the user registers as a player, the entry will be saved in the Player table. On starting the timer 
from the front-end, words will be loaded from the database. The player will see one word at a time. Upon 
one round of completion, the score will be calculated based on the number of correct characters in each 
word that user attempted. The score will be updated in the Score table. If this score is more than the smallest
score in the TopFiveScore table, this table will be updated.

A player will be allowed 20 attempts at maximum in a day to improve his/her score. 

     
  
  
