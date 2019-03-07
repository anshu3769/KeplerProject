# KeplerProject
An attmept to build a simple typing game using React, Flask and Graphql.

## Design Details
 The game has two components. Following are the tools used for the implementation:
  
  1. Front-end
   a. create-react-app for builing React UI
   b. React Apollo for connection with graphql server in back-end
   
  2. Back-end
    a. Python Flask 
    b. sqlite2 database
    c. SqlAlchemy driver for database 
    d. Graphene for using Graphql
    
   The front-end consists of single page UI which provides the following functionlality to 
   the user in order:
   1. The user is first asked to register in order to play the game.
   2. Upon registration, users details will be added to the database.
   3. The user can play the game by starting a 1 minute timer displayed on the screen after registration.
   4. During the game, words will appear on the screen and the user will type the word and submit it.
   5. Upon timer expiry, the score will be calculated and displayed on the screen of the user.

The user will be able to see over all top five scores and his/her personal scores.

   The back-end consists of the following tables:
      Table Name      Fields
      Player          id, first_name, last_name, user_name(unique_constraint)
      Score           id, player_id, score
      TopFiveScore    id, user_name, score
      Word            id, word
      
      
When the user registers as a player, the entry will be saved in the Player table. On staritng the timer 
from the front-end, words will be loaded from the database. The player will see one word at a time. Upon 
one round of completion, the svore will be calculated based on the number of correct characters on each 
    
  
  
