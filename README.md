# AsteroidWars

## Developer/s

[Reza Asayesh](https://github.com/rasayesh)<br/>

## Project Description

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
...
### Images of Asteroid Wars Game
...

## Website/Game API

The website that includes the game, communicates with the server which has access to the Mongo database to either
update the database or send back data to the front end for the user to see. Examples of information requested, and updated include:
- user profiles
- user game history
- user scores
- user messages 
- user cookies/sessions
and more...

To communicate with the database directly the API/Server I made uses mongoose.js which stores the user profile information,
game information, and user messages information.

## Dependencies

Node.js, Express.js, JQuery.js, Parser.js, Cookie-parser.js, Mongoose.js, crypto.js, Howler.js

## Future TODOS

- [X] add enemy spaceship appearing every 1 min
- [X] add health to enemy ship (takes x amount of shots to destroy) flash red on hit.
- [X] delete intro sound
- [X] add enemy spaceship intro sound
- [X] add explosion to destroyed asteroid/player/enemy
- [X] add space enemy spaceship thrust pic 
- [X] add enemy shooting functionality
- [X] change player spaceship sprite
- [X] change game economy small/med/lrg asteroids & enemy bounty
- [X] make pause menu same as end game menu without "game over" 
- [X] add enemy thrust sound
- [X] add player spawn sound
- [X] adjust volume of each sound
- [X] add background music
- [X] update Player schema to store new data about enemy ships (enemy killed / total enemy spawned) and add rounds
- [X] change "high scores" to "all scores"
- [X] re-design website
- [X] implement website skeleton
- [X] add ability to change ordering in both all_scores menu and profile menu<br/>
      - order by usernames
      - order by date
      - highest to lowest (score)<br/>
      - lowest to highest (score)<br/>
      - highest to lowest (rounds)<br/>
      - lowest to highest (rounds)<br/>
      - highest to lowest (enemies destroyed)<br/>
      - lowest to highest (enemies destroyed)<br/>
      - highest to lowest (enemies spawned)<br/>
      - lowest to highest (enemies spawned)<br/>
      - highest to lowest (asteroids destroyed)<br/>
      - lowest to highest (asteroids destroyed)<br/>
      - highest to lowest (asteroids spawned)<br/>
      - lowest to highest (asteroids spawned)<br/>
- [X] update game startmenu/endmenu/pausemenu aesthetics
- [X] redesign messaging system
- [X] add chat history to profile
- [X] update game directions
- [X] Add Trailer to index.html
- [ ] add favicon
- [ ] add domain name to website.
