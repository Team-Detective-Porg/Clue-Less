# Clue-Less
This game is a simplified version of the popular board game, Clue®. The main simplification is in the navigation of the game board. In Clue-Less there are the same nine rooms, six weapons, and six people as in the board game. The rules are pretty much the same except for moving from room to room. 


## Backend Build

Run the following commands to establish the backend for Clue-Less. Run these commands from the repository root directory. 

1. Build the database migrations.

    `python backend/manage.py makemigrations`

2. Migrate the database.

    `python backend/manage.py migrat`

3. Load the default game items.

    `python backend/manage.py loaddata default_data/*`

4. Run the server.

    `python backend/manage.py runserver`

## Data Dictionary

### Characters
This object represents the characters from Clue in both the card and the location on the board. 

| Name | Description | Type | Required |
|------|-------------|:----:|:---------|
| pk | The primary key, commonly know as the id, used to uniquely identify an entry. | int | yes |
| name | The name of the character as known in the standard Clue game. | string | yes |
| location | The current location of the character on the game board. This defaults to the initial starting point for each character. | string | yes |
| holder | The user that is currently holding the character's game card following the distribution of cards. | foreign key | no |


### Rooms
THis object represents the rooms' card from Clue.

| Name | Description | Type | Required |
|------|-------------|:----:|:---------|
| pk | The primary key, commonly know as the id, used to uniquely identify an entry. | int | yes |
| name | The name of the room as known in the standard Clue game. | string | yes |
| holder | The user that is currently holding the room's game card following the distribution of cards. | foreign key | no |

### Weapons
This object represents the weapon's location and card from Clue.

| Name | Description | Type | Required |
|------|-------------|:----:|:---------|
| pk | The primary key, commonly know as the id, used to uniquely identify an entry. | int | yes |
| name | The name of the weapon as known in the standard Clue game. | string | yes |
| location | The current location of the weapon on the game board. This defaults to the initial starting point for each weapon. | string | yes |
| holder | The user that is currently holding the weapon's game card following the distribution of cards. | foreign key | no |
