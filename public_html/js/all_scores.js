/**
 * @author Reza Munoz-Asayesh
 * @file highScores.js 
 * @project Asteroid Miners
 * @description 
 * 
 */

$(document).ready(() => {
    highScores();
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