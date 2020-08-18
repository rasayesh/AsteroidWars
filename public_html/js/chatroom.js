/**
 * @author Reza Munoz-Asayesh
 * @file chatroom.js 
 * @project Asteroid Miners
 * @description 
 * 
 */

$(document).ready(() => {
    setInterval(updateChatRoom, 1000);
});

// send a message.
function postToChat() {
    let message = $('#messageInput').val();
    $('#messageInput').val('');
    console.log(message);
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
            //console.log(output);
            $('#messages').html(output);
        }
    });
}