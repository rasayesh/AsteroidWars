/**
 * @author Reza Munoz-Asayesh
 * @file index.js 
 * @project Asteroid Miners
 * @description 
 * 
 */

/**
 * @param {N/A} 
 * @returns - N/A
 * 
 * @description This function logs a user into
 * the site.
 * 
 */
function login() {
    let username = $('#username').val(); // username_input
    let password = $('#password').val(); // password_input
    $('#username').val('');
    $('#password').val('');
    $.ajax({
        url: '/login/' + username + '/' + password,
        data: {},
        method: 'GET',
        success: function(output) {
            if (output == 'incorrect_login') // add error output to warn user of failed login.
                $('#incorrectCredentialsError')
                .html('Issue logging in with that info')
                .css('color', 'red');
            else {
                window.location = '../main_menu.html';
            }
        }
    });
}


function goToCreateAccount() {
    window.location = '../create_account.html'; // keeps history.
}