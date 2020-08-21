/**
 * @author Reza Munoz-Asayesh
 * @file index.js 
 * @project Asteroid Wars
 * @description This js page controls the functionality of the welcome page, this is the first
 * page users see when they go to this website, this handles the ajax requests and posts to the 
 * server for login and account creation information. This also will send the user to the main
 * menu of the site on successful login.
 * 
 */

// show login div, hide directory & signup divs
function showLogin() {
    $('#directoryButton').css('display', 'none');
    $('#loginContainer').css('display', 'block');
    $('#signupContainer').css('display', 'none');
}

// show signup div, hide directory & login divs
function showSignup() {
    $('#directoryButton').css('display', 'none');
    $('#loginContainer').css('display', 'none');
    $('#signupContainer').css('display', 'block');
}

// show directory div, hide login & signup divs
function back() {
    $('#directoryButton').css('display', 'block');
    $('#loginContainer').css('display', 'none');
    $('#signupContainer').css('display', 'none');
}

// validate the passwords by confirming matching passwords before user creates an account
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

// This function logs a user into the site, making sure information matches that in database
function login() {
    let username = $('#loginUsername').val(); // username_input
    let password = $('#loginPassword').val(); // password_input
    $('#loginUsername').val('');
    $('#loginPassword').val('');
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
                window.location = '../home.html';
            }
        }
    });
}

// This function adds a user to the database by taking inputs of username and password 
// and sending them over to the server, via JSON format.
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
            back();
        }
    });
}