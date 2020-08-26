# AsteroidWars

[CLICK HERE TO PLAY ASTEROID WARS!](http://64.227.89.71/)
<p float="left">
<img src="https://github.com/rasayesh/AsteroidWars/blob/master/images/poster.PNG" >
</p>

## Developer/s
[Reza Asayesh](https://github.com/rasayesh)<br/>

## Game Description
<p>Asteroid Wars is a game where users must survive as long as possible while scoring the most points as well. The player
spawns as a spaceship and must survive through an increasing number of asteroids on the map as well as an enemy super ship that
spawns every minute. Players will gain score per asteroid and enemy ship they kill, these items are all worth different amounts
of points:</p>
<p>enemy super Ship - 500 * round number</p>
<p>large asteroid - 100</p>
<p>medium asteroid - 50</p>
<p>small asteroid - 10</p>

## Code & Libraries Used
This project is a website designed around a game called Asteroid Wars, where users signup and make an account to play the game.
By signing up users can track their game history, and compare their scores to other players, and even chat with users that are online.
This project incorporates O.O.P to create the Asteroid Wars game, Node.js for the server, which also uses MongoDB (mongoose.js) database 
to keep track of user’s accounts, messages, and game data. For the front end I use HTML5/CSS3/JS that request user information from 
the server/API which gets a user request/update command and sends back, or updates information stored in the database. This project has 
many java script library dependencies including: 
- Node.js - to make the js server
- Express.js - to create server API get/post/update 
- JQuery.js - make html easier to access
- Parser.js - parse JSON data being sent between server/game and website/server
- Cookie-parser.js - use cookies to keep track of logged in users and their session time
- Mongoose.js - interact with MongoDB in the Node.js server
- crypto.js - salt and hash user passwords that are stored in database for protection from malicious users/hackers
- Howler.js - used to add sound in the Asteroid Wars game

## Website/Game API
The website that includes the game, communicates with the server which has access to the Mongo database to either update the database or fetch data requested by the front end for the user to see. Examples of information requested, and updated/added include:
- user profiles
- user game history
- user scores
- user messages 
- user cookies/sessions
and more...

To communicate with the database directly the API/Server I made uses mongoose.js which stores the user profile information, game information, and user messages information.

<p>The sorting requests cover both:</p>
<p>H2L (highest to lowest) request</p>
<p>L2H (lowest to highest) request</p>
<p>condensed into one line for less repetition.</p>

### API Routes:
| Function        | Route     |
| --------        | --------    |
| `POST` Add User | /add/user |
| `GET`  Login    | /login/:username/:password |
| `POST` Post to Chat | /post/chat  |
| `GET`  Update Chat  | /update/chatroom |
| `GET`  Update users online | /update/usersOnline |
| `GET`  Show All Scores     | /get/allscores |
| `GET`  Sort Usernames      | /sort/usernames |      
| `GET`  Sort Dates          | /sort/date |
| `GET`  Sort Time H2L & L2H  | /sort/time/H2L & /sort/time/L2H |
| `GET`  Sort Score H2L & L2H | /sort/score/H2L & /sort/score/L2H |
| `GET`  Sort Asteroids Spawned H2L & L2H | /sort/asteroidsSpawned/H2L & /sort/asteroidsSpawned/L2H |
| `GET`  Sort Asteroids Destroyed H2L & L2H | /sort/asteroidsDestroyed/H2L & /sort/asteroidsDestroyed/L2H |
| `GET`  Sort Enemies Spawned H2L & L2H | /sort/enemiesSpawned/H2L & /sort/enemiesSpawned/L2H |
| `GET`  Sort Enemies Destroyed H2L & L2H | /sort/enemiesDestroyed/H2L & /sort/enemiesDestroyed/L2H |
| `GET`  get user profile | /get/profile |
| `POST` add a new game to user game history | /update/user/games | 
\+ more

## Dependencies
Node.js, Express.js, JQuery.js, Parser.js, Cookie-parser.js, Mongoose.js, crypto.js, Howler.js


