/**
 * @author Reza Munoz-Asayesh
 * @file server.js 
 * @project Asteroid Wars
 * @description This program, is the server to the asteroid game website,
 * It includes features like cookies, hashing & salting, database parsing
 * ,data base modification, and database uploading etc.
 * 
 * This server also implements sessions that last 20mins, if the user is
 * inactive longer that 20mins then they will be kicked off of the server.
 * And will have to log in again to use the website. If the user is active 
 * on the website I.E, clicking buttons/posting items etc then the 20 min 
 * count down will continue to reset.
 * 
 */
const port = 5000; // 80 for live http connections
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cookieParser());

const db = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/asteroid'
let iterations = 1000;

let sessionKeys = {}; // stores mapping between users and their current seesion ID.

/**
 *  @description: checks to see if the users sessions are 
 * still active on this server, and their cookie exists.
 * if the user's cookie has timed out, then this function will remove
 * that user from the list of sessions.
 */
function updateSessions() {
    //console.log('current sessions: ', sessionKeys);
    let now = Date.now();
    for (key in sessionKeys) {
        if (sessionKeys[key][1] < (now - 1200000)) {
            console.log('Update: user is inactive, session ' + sessionKeys[key][0] + ' will now end.');
            delete sessionKeys[key];
        }
    }
}

setInterval(updateSessions, 2000); // updates sessionkeys every 2 seconds

let Schema = mongoose.Schema;

// User Messages.
var ChatMessageSchema = new Schema({
    time: Number,
    user: String,
    message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

// User Game Data.
let GameDataSchema = new Schema({
    username: String,
    gameDate: String,
    gametime: Number,
    score: Number,
    rounds: Number,
    enemiesDestroyed: Number,
    enemiesSpawned: Number,
    asteroidsDestroyed: Number,
    asteroidsSpawned: Number
});
let GameData = mongoose.model('GameData', GameDataSchema); // USER MOST SUCCESSFUL GAME

// User Schema (Account).
let UserSchema = new Schema({
    username: String,
    salt: String,
    hash: String,
    creationDate: String,
    gameHistory: [{ type: Schema.Types.ObjectId, ref: 'GameData' }],
    messageHistory: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }]
});
let User = mongoose.model('User', UserSchema); // USER ACCOUNT



// Set up default mongoose connection
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/main_menu.html', authenticate);
app.use('/', express.static('./public_html'));

/**
 * 
 * @param {*} req  - request
 * @param {*} res  - response
 * @param {*} next - next function called
 * 
 * @description: Checks to see if session stil has a valid 
 * cookie attached to it and is considered active. Else kicks
 * session off of website.
 * 
 */
function authenticate(req, res, next) {
    if (Object.keys(req.cookies).length > 0) {
        let u = req.cookies.login.username;
        let key = req.cookies.login.key;
        console.log('IN AUTHENTICATE: ', u, key);
        if (Object.keys(sessionKeys[u]).length > 0 && sessionKeys[u][0] == key) {
            next();
        } else {
            res.send('NOT ALLOWED');
        }
    } else {
        res.send('Your session has timed out: User idle or User has logged out.');
    }
}

/* SERVER - ACCOUNTCREATE/LOGIN */

// adds a new user to the data base. (creates account)
// if username is already taken, user will be told to try again.
app.post('/add/user/', (req, res) => {
    let pw = req.body.password;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    User.find({ username: req.body.username }, (err, user) => {
        if (user.length == 0) {
            let salt = crypto.randomBytes(64).toString('base64');
            crypto.pbkdf2(pw, salt, iterations, 64, 'sha512', (err, hash) => {
                if (err) throw err;
                let user = new User({
                    username: req.body.username,
                    salt: salt,
                    hash: hash.toString('base64'),
                    creationDate: date,
                    gameHistory: [],
                    messageHistory: []
                });
                user.save(function(err) { if (err) console.log('ERROR: Adding User!') });
                res.send('Account Created!');
            });
        } else {
            res.send('Username already taken!, Please try again');
        }
    });
});

// log into account.
app.get('/login/:username/:password', (req, res) => {
    let u = req.params.username;
    User.find({ username: u }, (err, result) => {
        if (result.length == 1) {
            let password = req.params.password;
            let salt = result[0].salt;
            crypto.pbkdf2(password, salt, iterations, 64, 'sha512', (err, hash) => {
                if (err) {
                    res.send('incorrect_login');
                    throw err;
                }
                let hashString = hash.toString('base64');
                if (result[0].hash === hashString) {
                    let sessionKey = Math.floor(Math.random() * 1000);
                    sessionKeys[u] = [sessionKey, Date.now()];
                    console.log('login success');
                    res.cookie('login', { username: u, key: sessionKey }, { maxAge: 1200000 }); // set maxAge to 20mins
                    res.send('successful_login');
                } else {
                    console.log('login failure');
                    res.send('incorrect_login');
                }
            });
        } else {
            console.log('login failure');
            res.send('incorrect_login');
        }
    });
});

/* SERVER - MENU */

// tells front end to go to home page.
app.get('/home/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    res.send('goto_home');
});

// tells front end to go to game page.
app.get('/game/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    res.send('play_game');
});

// tells front end to go to allScores page.
app.get('/allScores/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    res.send('goto_allScores');
});

// tells front end to go to chat page.
app.get('/chatroom/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    res.send('goto_chatroom');
});

// tells front end to go to profile page.
app.get('/profile/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    res.send('goto_profile');
});

// remove session from array & set cookie MaxAge to 1 (delete cookie).
app.get('/logout/', (req, res) => {
    let un = req.cookies.login.username;
    let sessionKey = req.cookies.login.key;
    delete sessionKeys[un];
    res.clearCookie('login', { username: un, key: sessionKey }, { maxAge: 1200000 });
    res.send();
});

/* SERVER - CHATROOM */

// get message from client side and save to database.
app.post('/post/chat/', (req, res) => {
    let currentUser = req.cookies.login.username
    var message = new ChatMessage({
        time: new Date().getTime(), // time is retrieved from server
        user: currentUser,
        message: req.body.message
    });
    message.save(function(err) { if (err) console.log('ERROR: Saving Chat Message!') });
    User.findOne({ username: currentUser }, (err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: User Not Found!');
                res.status(404).send();
            } else {
                entry.messageHistory.push(message._id); // update gameHistory list with new game.
                entry.save();
                console.log('message history for ' + currentUser + ' successfully updated!');
                res.send();
            }
        }
    });
});

// sort data base chat messages by time & update client side.
app.get('/update/chatroom/', (req, res) => {
    ChatMessage.find({}).sort({ time: 1 }).exec(function(error, results) {
        let output = '';
        for (i in results) {
            output += '<b>' + results[i].user + '</b>: ' + results[i].message + '<br/>';
        }
        res.send(output);
    });
});

// send current active users online to front end
app.get('/update/usersOnline/', (req, res) => {
    let output = ''
    for (user in Object.keys(sessionKeys)) {
        output += '<p> ● ' + Object.keys(sessionKeys)[user] + '</p>';
    }
    res.send(output);
});

/* SERVER - ALLSCORES */

// tells front end to display allScores default call, displays ordered by scores highest to lowest
app.get('/get/allScores/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'score': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                let output = '';
                for (i in entry) {
                    output += '<tr>' + '<th>' + entry[i].username + '</th>' +
                        '<th>' + entry[i].gameDate + '</th>' +
                        '<th>' + entry[i].gametime + '</th>' +
                        '<th>' + entry[i].score + '</th>' +
                        '<th>' + entry[i].rounds + '</th>' +
                        '<th>' + entry[i].asteroidsSpawned + '</th>' +
                        '<th>' + entry[i].asteroidsDestroyed + '</th>' +
                        '<th>' + entry[i].enemiesSpawned + '</th>' +
                        '<th>' + entry[i].enemiesDestroyed + '</th>' + '<tr/>';
                }
                res.send(output);
            }
        }
    });
});

// username sends scores sorted by username
app.get('/sort/username/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'username': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// GameDate sends scores sorted by GameDate
app.get('/sort/date/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'GameDate': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// gametime 1 sends scores sorted by gametime (highest to lowest)
app.get('/sort/time/H2L', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'gametime': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// gametime 2 sends scores sorted by gametime (lowest to highest)
app.get('/sort/time/L2H', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'gametime': 1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// score 1 sends scores sorted by score (highest to lowest)
app.get('/sort/score/H2L', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'score': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// score 2 sends scores sorted by score (lowest to highest)
app.get('/sort/score/L2H', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'score': 1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// rounds 1 sends scores sorted by rounds (highest to lowest)
app.get('/sort/rounds/H2L', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'rounds': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// rounds 2 sends scores sorted by rounds (lowest to highest)
app.get('/sort/rounds/L2H', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'rounds': 1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// asteroidsSpawned 1 sends scores sorted by asteroidsSpawned (highest to lowest)
app.get('/sort/asteroidsSpawned/H2L', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'asteroidsSpawned': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// asteroidsSpawned 2 sends scores sorted by asteroidsSpawned (lowest to highest)
app.get('/sort/asteroidsSpawned/L2H', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'asteroidsSpawned': 1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// asteroidsDestroyed 1 sends scores sorted by asteroidsDestroyed (highest to lowest)
app.get('/sort/asteroidsDestroyed/H2L', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'asteroidsDestroyed': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// asteroidsDestroyed 2 sends scores sorted by asteroidsDestroyed (lowest to highest)
app.get('/sort/asteroidsDestroyed/L2H', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'asteroidsDestroyed': 1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// enemiesSpawned 1 sends scores sorted by enemiesSpawned (highest to lowest)
app.get('/sort/enemiesSpawned/H2L', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'enemiesSpawned': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// enemiesSpawned 2 sends scores sorted by enemiesSpawned (lowest to highest)
app.get('/sort/enemiesSpawned/L2H', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'enemiesSpawned': 1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// enemiesDestroyed 1 sends scores sorted by enemiesDestroyed (highest to lowest)
app.get('/sort/enemiesDestroyed/H2L', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'enemiesDestroyed': -1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

// enemiesDestroyed 2 sends scores sorted by enemiesDestroyed (lowest to highest)
app.get('/sort/enemiesDestroyed/L2H', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    GameData.find({}).sort({ 'enemiesDestroyed': 1 }).exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: No GameData Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});



/* SERVER - PROFILE */

// tells front end to display profile
app.get('/get/profile/', (req, res) => {
    let un = req.cookies.login.username;
    resetSessionTime(req, res); // user is active so reset their time to current.
    User.findOne({ username: un }).populate('messageHistory').exec((err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: User Not Found!');
                res.status(404).send();
            } else {
                res.send(entry);
            }
        }
    });
});

/* SERVER - GAME */

// send current user username to frontend.
app.get('/get/username/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    res.send(req.cookies.login.username);
});

// add game to data database of games.
// update user gamehistory list with new game ID.
app.post('/update/user/games/', (req, res) => {
    resetSessionTime(req, res); // user is active so reset their time to current.
    let un = req.cookies.login.username;
    let game = new GameData(req.body);
    game.save(function(err) { if (err) console.log('ERROR: Adding GameData!') });
    User.findOne({ username: un }, (err, entry) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!entry) {
                console.log('Error: User Not Found!');
                res.status(404).send();
            } else {
                entry.gameHistory.push(game._id); // update gameHistory list with new game.
                entry.save();
                console.log('game history for ' + un + ' successfully updated!');
                res.send();
            }
        }
    });
    res.send('update_successful')
});

/**
 * 
 * @param {*} req - request
 * @param {*} res - response
 * 
 * @description: function to update user's session to current time every time they make an active call to the website
 * showing they are not idle, so the user can stay on as long as they are active and the timer will be reset
 * everytime they perform an interaction with the website.
 */
function resetSessionTime(req, res) {
    let un = req.cookies.login.username;
    let sessionKey = req.cookies.login.key;
    console.log('resetting session time, key & user are:', sessionKey, un);
    res.cookie('login', { username: un, key: sessionKey }, { maxAge: 1200000 }); // reset maxAge for this cookie to 20mins.
    sessionKeys[un][1] = Date.now();
    console.log('Update: user is active, session time countdown reset.');
}
app.listen(port, () => console.log('App Listening at http://localhost:${' + port + '}'));