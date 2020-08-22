/**
 * @author Reza Munoz-Asayesh
 * @file home.js 
 * @project Asteroid Wars
 * @description This js file provides functionality to display the content,
 * that is in the home page. The home page is the first page that users see 
 * when they are logged into the website.
 * 
 */


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

/* home functions */