/**
 * @author Reza Munoz-Asayesh
 * @file profile.js 
 * @project Asteroid Miners
 * @description 
 * 
 */

$(document).ready(() => {
    profile();
});

function profile() {
    $.ajax({
        url: '/get/profile/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            let user = output.username;
            let creationDate = output.creationDate;
            let gameHistory = '<tr> <th>Username</th> <th>GameDate</th> <th>gameTime</th> <th>Scores</th> <th>Asteroids Spawned</th> <th>Asteroids Destroyed</th> </tr>';
            for (i in output.gameHistory) {
                gameHistory += '<tr>' + '<th>' + output.gameHistory[i].username + '</th>' +
                    '<th>' + output.gameHistory[i].gameDate + '</th>' +
                    '<th>' + output.gameHistory[i].gametime + '</th>' +
                    '<th>' + output.gameHistory[i].score + '</th>' +
                    '<th>' + output.gameHistory[i].asteroidsSpawned + '</th>' +
                    '<th>' + output.gameHistory[i].asteroidsDestroyed + '</th>' + '<tr/>';
            }
            $('#username').html(user);
            $('#accountCreationDate').html(creationDate);
            $('#table').html(gameHistory);


        }
    });
}