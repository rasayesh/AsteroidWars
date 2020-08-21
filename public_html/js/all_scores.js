/**
 * @author Reza Munoz-Asayesh
 * @file highScores.js 
 * @project Asteroid Miners
 * @description 
 * 
 */

$(document).ready(() => {
    highScores();

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

function highScores() {
    $.ajax({
        url: '/get/highscores/',
        data: {},
        method: 'GET',
        success: function(output) {
            // console.log(output);
            let scores = '<tr> <th>Username</th> <th>GameDate</th> <th>gameTime</th> <th>Scores</th> <th>Asteroids Spawned</th> <th>Asteroids Destroyed</th> </tr>' +
                output;
            $('#table').html(scores);
        }
    });
}


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