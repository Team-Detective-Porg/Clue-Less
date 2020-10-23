# Clue-Less
This game is a simplified version of the popular board game, Clue®. The main simplification is in the navigation of the game board. In Clue-Less there are the same nine rooms, six weapons, and six people as in the board game. The rules are pretty much the same except for moving from room to room. 


# Backend Build

Run the following commands to establish the backend for Clue-Less. Run these commands from the repository root directory. 

1. Build the database migrations.

`python backend/manage.py makemigrations`

2. Migrate the database.

`python backend/manage.py migrat`

3. Load the default game items.

`python backend/manage.py loaddata default_data/*`

4. Run the server.

`python backend/manage.py runserver`