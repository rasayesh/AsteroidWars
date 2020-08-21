/**
 * @author Reza Munoz-Asayesh
 * @file all_scores.js 
 * @project Asteroid Wars
 * @description This js file provides functionality to access all of the scores
 * in the game, the user is able to order them by different values, by 
 * selecting the sort by menu and making their selection. by default the
 * page displays highest scores at the top and lowest at the bottom.
 * 
 */

$(document).ready(() => {
    displayAllScores();

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
});

/* menu access */

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

/* all_scores functions */

// by default will display games ordered by largest scores to least
function displayAllScores() {
    $.ajax({
        url: '/get/allScores/',
        data: {},
        method: 'GET',
        success: function(output) {
            // console.log(output);
            let scores = '<tr> <th>Username</th> <th>GameDate</th> <th>gameTime</th> <th>Scores</th> <th>rounds</th>  <th>Asteroids Spawned</th> <th>Asteroids Destroyed</th> <th>Enemies Spawned</th> <th>Enemies Destroyed</th> </tr>' + output;
            $('#table').html(scores);
        }
    });
}