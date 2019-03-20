* Username must be unique throughout the database
    * This check can be introduced at frontend or backend. My opinion is frontend so as to avoid sending the request repeatedly to the server and thus reducing network overhead
* Upon registration, the game components should render
    * Currently, the implemented logic does not work. The database does not get updated if parents method is callled from child on button click.

* Should user be asked to submit after each word or pressing enter should work? How to make enter work?

* Support for both new and returning user

* Logic for score calculation

* Blank username not allowed

* Update top fives scores based on new score

* Unit testing to be added
