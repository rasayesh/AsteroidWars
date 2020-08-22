/**
 * @author Reza Munoz-Asayesh
 * @file profile.js 
 * @project Asteroid Wars
 * @description This js page provides functionality to see the users profile information
 * such as when it was created, previous games and previous chats messages sent in the 
 * global chat.
 * 
 */

let thisUser = '';


$(document).ready(() => {
    // open menu when hovering over hamburger tab
    $('#tabContainer').on({
        mouseenter: () => {
            $('#dropdownMenu').css('display', 'block');
            $('.button').css('display', 'block')
        }
    });

    // close menu when user takes mouse off menu
    $('#dropdownMenu').on({
        mouseleave: () => {
            $('#dropdownMenu').css('display', 'none');
            $('.button').css('display', 'none')
        }
    });

    // close menu when user takes mouse off menu
    $('#content').on({
        mouseenter: () => {
            $('#dropdownMenu').css('display', 'none');
            $('.button').css('display', 'none')
        }
    });

    // close menu when user takes mouse off menu
    $('.container').on({
        mouseenter: () => {
            $('#dropdownMenu').css('display', 'none');
            $('.button').css('display', 'none')
        }
    });
    profile();
});


/* menu access */

function home() {
    $.ajax({
        url: '/home/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            window.location = '../home.html';
        }
    });
}

function playGame() {
    $.ajax({
        url: '/game/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            window.location = '../game/asteroid_wars.html';
        }
    });
}

function allScores() {
    $.ajax({
        url: '/allScores/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            window.location = '../all_scores.html';
        }
    });
}

function chatRoom() {
    $.ajax({
        url: '/chatroom/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            window.location = '../chatroom.html';
        }
    });
}

function profile() {
    $.ajax({
        url: '/profile/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            window.location = '../profile.html';
        }
    });
}

function logout() {
    $.ajax({
        url: '/logout/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            location.reload();
            window.location.replace('../index.html'); // removes history
        }
    });
}

/* profile functions */

function profile() {
    $.ajax({
        url: '/get/profile/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            thisUser = output.username;
            let creationDate = output.creationDate;
            $('#userProfile').html(thisUser.toUpperCase() + '\'S PROFILE');
            $('#accountCreationDate').html('Creation Date: ' + creationDate);
            initializeAllScores();
            let messageHistory = '<tr> <th id=\'user\'>Username</th> <th id=\'messageTime\'>Time</th> <th id=\'message\'>Message</th></tr>';
            let messageEntry = output['messageHistory'];
            for (i in messageEntry) {
                let date = new Date(messageEntry[i].time);
                messageHistory +=
                    '<tr>' +
                    '<th>' + messageEntry[i].user + '</th>' +
                    '<th>' + date.toLocaleString() + '</th>' +
                    '<th id="messageInner">' + messageEntry[i].message + '</th>' +
                    '<tr/>';
            }
            $('#messageTable').html(messageHistory);
        }
    });
}

// order flag -  if false then low to high
let highToLow = true;

// code to reduce repetitive loading of scores into chart
function loadScores(output) {
    let scores = '<tr> <th id=\'username\'>Username</th> <th id=\'date\'>GameDate</th> <th id=\'time\'>GameTime</th> <th id=\'score\'>Scores</th> <th id=\'rounds\'>Rounds</th>  <th id=\'asteroidsSpawned\'>Asteroids Spawned</th> <th id=\'asteroidsDestroyed\'>Asteroids Destroyed</th> <th id=\'enemiesSpawned\'>Enemies Spawned</th> <th id=\'enemiesDestroyed\'>Enemies Destroyed</th> </tr>';
    for (i in output) {
        if (output[i].username === thisUser) {
            scores +=
                '<tr>' +
                '<th>' + output[i].username + '</th>' +
                '<th>' + output[i].gameDate + '</th>' +
                '<th>' + msToTime(output[i].gametime) + '</th>' +
                '<th>' + output[i].score + '</th>' +
                '<th>' + output[i].rounds + '</th>' +
                '<th>' + output[i].asteroidsSpawned + '</th>' +
                '<th>' + output[i].asteroidsDestroyed + '</th>' +
                '<th>' + output[i].enemiesSpawned + '</th>' +
                '<th>' + output[i].enemiesDestroyed + '</th>' +
                '<tr/>';
        }
    }
    return scores;
}

// convert milliseconds to time format
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

// sets all the orderings to false and resets the html of all the boxes
function clearBools() {
    $('#username').text('Username');
    $('#date').text('GameDate');
    $('#time').text('GameTime');
    $('#score').text('Scores');
    $('#rounds').text('Rounds');
    $('#asteroidsSpawned').text('Asteroids Spawned');
    $('#asteroidsDestroyed').text('Asteroids Destroyed');
    $('#enemiesSpawned').text('Enemies Spawned');
    $('#enemiesDestroyed').text('Enemies Destroyed');
}

// by default will display games ordered by largest scores to least
function initializeAllScores() {
    $.ajax({
        url: '/get/allScores/',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#score').click(); // ordered highest to lowest score by default
        }
    });
}

// orders scores by user
function orderByUser() {
    $.ajax({
        url: '/sort/username/',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#username').text('Username●');
        }
    });
}

// orders scores by date
function orderByDate() {
    $.ajax({
        url: '/sort/date/',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#date').text('GameDate●');
        }
    });
}

// orders scores by time highest to lowest
function orderByTimeH2L() {
    $.ajax({
        url: '/sort/time/H2L',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#time').text('GameTime↑');
        }
    });
}

// orders scores by time lowest to highest
function orderByTimeL2H() {
    $.ajax({
        url: '/sort/time/L2H',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#time').text('GameTime↓');
        }
    });
}

// orders scores by score highest to lowest
function orderByScoreH2L() {
    $.ajax({
        url: '/sort/score/H2L',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#score').text('Scores↑');
        }
    });
}

// orders scores by score lowest to highest
function orderByScoreL2H() {
    $.ajax({
        url: '/sort/score/L2H',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#score').text('Scores↓');
        }
    });
}

// orders scores by rounds highest to lowest
function orderByRoundsH2L() {
    $.ajax({
        url: '/sort/rounds/H2L',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#rounds').text('Rounds↑');
        }
    });
}

// orders scores by rounds lowest to highest
function orderByRoundsL2H() {
    $.ajax({
        url: '/sort/rounds/L2H',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#rounds').text('Rounds↓');
        }
    });
}

// orders scores by asteroidsSpawned highest to lowest
function orderByAsteroidsSpawnedH2L() {
    $.ajax({
        url: '/sort/asteroidsSpawned/H2L',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#asteroidsSpawned').text('Asteroids Spawned↑');
        }
    });
}

// orders scores by asteroidsSpawned lowest to highest
function orderByAsteroidsSpawnedL2H() {
    $.ajax({
        url: '/sort/asteroidsSpawned/L2H',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#asteroidsSpawned').text('Asteroids Spawned↓');
        }
    });
}

// orders scores by asteroidsDestroyed highest to lowest
function orderByAsteroidsDestroyedH2L() {
    $.ajax({
        url: '/sort/asteroidsDestroyed/H2L',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#asteroidsDestroyed').text('Asteroids Destroyed↑');
        }
    });
}

// orders scores by asteroidsDestroyed lowest to highest
function orderByAsteroidsDestroyedL2H() {
    $.ajax({
        url: '/sort/asteroidsDestroyed/L2H',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#asteroidsDestroyed').text('Asteroids Destroyed↓');
        }
    });
}

// orders scores by enemiesSpawned highest to lowest
function orderByEnemiesSpawnedH2L() {
    $.ajax({
        url: '/sort/enemiesSpawned/H2L',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#enemiesSpawned').text('Enemies Spawned↑');
        }
    });
}

// orders scores by enemiesSpawned lowest to highest
function orderByEnemiesSpawnedL2H() {
    $.ajax({
        url: '/sort/enemiesSpawned/L2H',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#enemiesSpawned').text('Enemies Spawned↓');
        }
    });
}

// orders scores by enemiesDestroyed highest to lowest
function orderByEnemiesDestroyedH2L() {
    $.ajax({
        url: '/sort/enemiesDestroyed/H2L',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#enemiesDestroyed').text('Enemies Destroyed↑');
        }
    });
}

// orders scores by enemiesDestroyed lowest to highest
function orderByEnemiesDestroyedL2H() {
    $.ajax({
        url: '/sort/enemiesDestroyed/L2H',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#table').html(loadScores(output)); // insert table into html
            linkIDs();
            $('#enemiesDestroyed').text('Enemies Destroyed↓');
        }
    });
}

// link id's
function linkIDs() {
    // order by user
    $('#username').click(() => {
        clearBools();
        orderByUser();
    });
    // order by date
    $('#date').click(() => {
        clearBools();
        orderByDate();
    });
    // order by time
    $('#time').click(() => {
        clearBools();
        if (highToLow) {
            highToLow = false;
            orderByTimeH2L();
        } else {
            highToLow = true;
            orderByTimeL2H();
        }
    });
    // order by score
    $('#score').click(() => {
        clearBools();
        if (highToLow) {
            highToLow = false;
            orderByScoreH2L();
        } else {
            highToLow = true;
            orderByScoreL2H();
        }
    });
    // order by rounds
    $('#rounds').click(() => {
        clearBools();
        if (highToLow) {
            highToLow = false;
            orderByRoundsH2L();
        } else {
            highToLow = true;
            orderByRoundsL2H();
        }
    });
    // order by asteroids spawned
    $('#asteroidsSpawned').click(() => {
        clearBools();
        if (highToLow) {
            highToLow = false;
            orderByAsteroidsSpawnedH2L();
        } else {
            highToLow = true;
            orderByAsteroidsSpawnedL2H();
        }
    });
    // order by asteroids destroyed
    $('#asteroidsDestroyed').click(() => {
        clearBools();
        if (highToLow) {
            highToLow = false;
            orderByAsteroidsDestroyedH2L();
        } else {
            highToLow = true;
            orderByAsteroidsDestroyedL2H();
        }
    });
    // order by enemies spawned
    $('#enemiesSpawned').click(() => {
        clearBools();
        if (highToLow) {
            highToLow = false;
            orderByEnemiesSpawnedH2L();
        } else {
            highToLow = true;
            orderByEnemiesSpawnedL2H();
        }
    });
    // order by enemies destroyed
    $('#enemiesDestroyed').click(() => {
        clearBools();
        if (highToLow) {
            highToLow = false;
            orderByEnemiesDestroyedH2L();
        } else {
            highToLow = true;
            orderByEnemiesDestroyedL2H();
        }
    });
}