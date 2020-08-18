/**
 * @author Reza Munoz-Asayesh
 * @file main_menu.js 
 * @project Asteroid Miners
 * @description 
 * 
 */

function playGame() {
    $.ajax({
        url: '/game/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            window.location = '../game/asteroidminers.html';
        }
    });
}

function highScores() {
    $.ajax({
        url: '/highscores/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            window.location = '../high_scores.html';
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

function credits() {
    $.ajax({
        url: '/credits/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            window.location = '../credits.html';
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