/**
 * @author Reza Munoz-Asayesh
 * @file chatroom.js 
 * @project Asteroid Wars
 * @description This js file provides functionality for the chatrom to communicate with the 
 * server using Ajax to post messages to the server as well as retrieve and update the chat
 * every cycle of interval time.
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

    setInterval(updateChatRoom, 1000); // update chat every 1 second
    setInterval(updateUsersOnline, 1000); // update users currently online every 5 seconds

    $(document).keydown((e) => {
        if (e.keyCode == '13') $('#sendButton').click(); // if user hits enter send message
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

/* chatroom functions */

// send a message.
function postToChat() {
    let message = $('#sendInput').val();
    $('#sendInput').val('');
    $.ajax({
        url: '/post/chat/',
        data: { message: message },
        method: 'POST',
        success: function(output) {
            //console.log(output);
        }
    });
}


// update messages in client chatroom.
function updateChatRoom() {
    $.ajax({
        url: '/update/chatroom/',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#messages').html(output);
        }
    });
}

// update users currently online.
function updateUsersOnline() {
    $.ajax({
        url: '/update/usersOnline/',
        data: {},
        method: 'GET',
        success: function(output) {
            $('#online').html(output);
        }
    });
}