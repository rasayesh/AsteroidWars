/**
 * @author Reza Munoz-Asayesh
 * @file create_account.js 
 * @project Asteroid Miners
 * @description 
 * 
 */

function validatePassword() {
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    if (password == confirmPassword) {
        createAccount();
    } else {
        $('#passwordDontMatchError')
            .html('Passwords Don\'t Match')
            .css('color', 'red');
    }
}


/**
 * @param {N/A} 
 * @returns - N/A
 * 
 * @description This function adds a user to the database
 * by taking inputs of username and password and sending them
 * over to the server, via JSON format.
 * 
 */
function createAccount() {
    let un = $('#username').val();
    let pw = $('#password').val();
    $('#username').val('');
    $('#password').val('');
    $.ajax({
        url: '/add/user/',
        data: { username: un, password: pw },
        method: 'POST',
        success: function(output) {
            alert(output);
            window.location = '../index.html';
        }
    });
}