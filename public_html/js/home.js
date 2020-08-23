/**
 * @author Reza Munoz-Asayesh
 * @file home.js 
 * @project Asteroid Wars
 * @description This js file provides functionality to display the content,
 * that is in the home page. The home page is the first page that users see 
 * when they are logged into the website.
 * 
 */

/* home functions */

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