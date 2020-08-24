# AsteroidWars

## Developer/s

[Reza Asayesh](https://github.com/rasayesh)<br/>

## Game Descritpion

Asteroid Wars is a game where users must survive as long as possible while scoring the most points as well. The player
spawns as a spaceship and must survive through an increasing number of asteroids on the map as well as an enemy super ship that
spawns every minute. Players will gain score per asteroid and enemy ship they kill, these items are all worth different amounts
of points:

enemy superShip - 500 (takes 100 shots to kill)
large asteroid - 100
medium asteroid - 50
small asteroid - 10

## Images

### Images of Website

<p float="left">
<p>The Index page is the first see when they go to the website URL, users have an option to log in or sign up if they do not already have an account.</p>

<img src="https://github.com/rasayesh/AsteroidWars/blob/master/images/index.PNG" >
<p>The Home page is the first page users see when they log into the website, which acts as a directory to the rest of the sites pages.</p>

<img src="https://github.com/rasayesh/AsteroidWars/blob/master/images/home.PNG" >
<p>The AllScores page is where users can go to see all the other users scores, in a large interactive game stats chart that is sortable by category.</p>

<img src="https://github.com/rasayesh/AsteroidWars/blob/master/images/allScores.PNG" >
<p>The ChatRoom is where users currently online can go and talk to each other in a global chat, there is also a section to the right of the chat where users can see all the users currently on the website.</p>

<img src="https://github.com/rasayesh/AsteroidWars/blob/master/images/chatRoom.PNG" >
<p>The Profile page is where users can go to see their own personal stats, with the same interactive chart capabilities to sort by the categories. Users can also see all of their chat history of messages they typed into the chat room.</p>

<img src="https://github.com/rasayesh/AsteroidWars/blob/master/images/profile.PNG" >
</p>

### Images of Asteroid Wars Game

<p float="left">
<p>Asteroid Wars game is accessed by click the "play game" option in the menu/dropdown menu
on the website, available on the game page is the ability to play the game, and get help and tips on how to play the game.</p>
<img src="https://github.com/rasayesh/AsteroidWars/blob/master/images/game.PNG" >
</p>

## Code & Libraries Used

This project is a website designed around a game called Asteroid Wars, where users signup and make an account to play the game.
By signing up users can track their game history, and compare their scores to other players, and even chat with users that are online.
This project incorporates O.O.P to create the Asteroid Wars game, Node.js for the server, which also uses MongoDB (mongoose.js) database 
to keep track of users accounts, messages, and game data. For the front end I use HTML5/CSS3/JS that request user information from 
the server/API which gets a user request/update command and sends back or updates information stored in the database. This project has 
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

The sorting requests cover both, each url is to the respective function:
H2L (highest to lowest) 
L2H (lowest to highest)

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
