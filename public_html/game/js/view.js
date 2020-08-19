// MVC Setup
let user; // current user
let model; // game state storage.
let controller; // control games state.

//Audio
//let introSound;
let engineBurstSound;
let engineBurstSoundBoolOn = false;

// canvas
let canvas;
let canvasHeight;
let canvasWidth;
let ctx;

// booleans
let engineBurst = false;
let turnLeft = false;
let turnRight = false;
let fireCannon = false;

// game flags
let gameCycling = false;
let firstLoad = true;
let pause = false;
let firstSpawnFlag = false;
let gameBegun = false;
let respawn = false;
let displayedStats = false;

// game time
let timeBeginflag = false;
let timeElapsed, startTime, endTime;
let seconds, minutes, hours;

/* load game sounds on initialization */
function loadSounds() {
    //introSound = new Howl({ src: ['/asteroid_game/sounds/intro.mp3'] });
    engineBurstSound = new Howl({
        src: ['/public_html/game/sounds/thrust.mp3'],
        onplay: () => { engineBurstSoundBoolOn = true; },
        onend: () => { engineBurstSoundBoolOn = false; }
    });
}

/* initial game setup */
$(document).ready(() => {
    initializeGame();
    gameCycling = true;
});

/* cycles through the game updating every 10milliseconds to give moving image affect */
function cycleGame() {
    if (!pause) {
        if (timeBeginflag) {
            startTime = new Date();
            timeBeginflag = false;
        }
        if (!model.gameOver) {
            // update movement
            controller.updateEnemyEvent(minutes); // check if the enemy spaceship should be spawned (happens every 1 minute)
            controller.updatePlayerPosition(); // update player x & y
            controller.updateEnemyPosition(); // update enemy x & y
            controller.updatePlayerBullets(); // update player bullets x & y
            controller.updateEnemyBullets(); // update enemy bullets x & y
            controller.updateAsteroidPosition(); // update asteroid x & y
            // check destroyed conditions
            controller.updatePlayerDestroyed(); // check if player destroyed (remove)
            controller.updateEnemyDestroyed(); // check if enemy asteroid destroyed (remove)
            controller.updateAsteroidDestroyed(); // check if asteroid has been destroyed (remove)
            controller.asteroidsAllGoneEvent(); // if asteroids gone, initialize next round
            if (respawn && !model.player.isAlive) {
                respawn = false;
                controller.respawn();
            }
            if (engineBurst && model.player.isAlive)
                if (!engineBurstSoundBoolOn) engineBurstSound.play();
            if (engineBurst && model.player.isAlive) controller.engineBurst();
            if (turnLeft && model.player.isAlive) controller.turnLeft();
            if (turnRight && model.player.isAlive) controller.turnRight();
            if (fireCannon && model.player.isAlive) controller.firePlayerCannon();
            fireCannon = false;
            resetStage(); // clear
            populateCanvas(); // update
        }
        if (model.gameOver && !displayedStats) displayStats();
    }

}

/* set all game booleans to initial status and create new model/controller connection */
function initializeGame() {
    loadSounds();
    engineBurstSoundBoolOn = false;
    engineBurst = false;
    turnLeft = false;
    turnRight = false;
    fireCannon = false;
    firstSpawnFlag = false;
    gameBegun = false;
    respawn = false;
    displayedStats = false;
    timeBeginflag = false;
    pause = false;
    seconds, minutes, hours = 0;
    model = new Model();
    controller = new Controller(model);
    if (!gameCycling) setInterval(cycleGame, 10) // update gamestate every 10 milliseconds
    $(document).keydown((e) => {
        if (e.keyCode == "87" && !pause) engineBurst = true;
        if (e.keyCode == "65" && !pause) turnLeft = true;
        if (e.keyCode == "68" && !pause) turnRight = true;
        if (e.keyCode == "32" && !pause) fireCannon = true;
        if (e.keyCode == "84" && !pause)
            if (firstSpawnFlag) respawn = true;
        if (e.keyCode == '13' && !pause) {
            if (firstSpawnFlag == false) {
                firstSpawnFlag = true;
                respawn = true;
            }
        }
        if (e.keyCode == '80') {
            if (!pause) pause = true;
            else pause = false;
            $('#pause').toggle();
        }
    });
    $(document).keyup((e) => {
        if (e.keyCode == "87" && !pause) {
            engineBurst = false;
            engineBurstSound.stop();
            engineBurstSoundBoolOn = false;
        }
        if (e.keyCode == "65" && !pause) turnLeft = false;
        if (e.keyCode == "68" && !pause) turnRight = false;
        if (e.keyCode == "32" && !pause) fireCannon = false;
        if (e.keyCode == "84" && !pause) respawn = false;
    });

    if (!firstLoad) startGame();
    else firstLoad = false;

}

/* draw an image onto the canvas */
function populateCanvas() {
    postTime(); // draw current game time
    postLives(); // draw remaining lives
    postScore(); // draw score

    // player image variables
    let playerImg = $('#player')[0];
    let thrustImg = $('#playerThrust')[0];
    let playerBulletImg = $('#playerBullet')[0];

    // enemy image variables
    let enemyImg = $('#enemy')[0];
    let enemyDamagedImg = $('#enemyDamaged')[0];
    let enemyBulletImg = $('#enemyBullet')[0];

    // explosion image variables
    let explosionImg1 = $('#explosion1')[0];
    let explosionImg2 = $('#explosion2')[0];
    let explosionImg3 = $('#explosion3')[0];
    let explosionImg4 = $('#explosion4')[0];
    let explosionImg5 = $('#explosion5')[0];

    // asteroid image variables
    let asteroidLargeImg = $('#asteroidLarge')[0];
    let asteroidMediumImg = $('#asteroidMedium')[0];
    let asteroidSmallImg = $('#asteroidSmall')[0];

    // player x & y position
    let playerX = model.player.x + (model.player.width / 2);
    let playerY = model.player.y + (model.player.height / 2);

    // texture options
    ctx.imageSmoothingEnabled = true; // smooths images when enlarged
    ctx.imageSmoothingQuality = 'high'; // smooths images when enlarged

    // draw player, player thrust, player spawn point, or game start
    if (engineBurst && model.player.isAlive) rotateAndDrawImage(thrustImg, playerX, playerY, model.player.angle);
    else if (model.player.isAlive) rotateAndDrawImage(playerImg, playerX, playerY, model.player.angle);
    else if (!model.player.isalive && !firstSpawnFlag && gameBegun && !model.gameOver) {
        ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.fillStyle = "aqua";
        ctx.fillText("Press 'Enter' to spawn at the circle", playerX / 2, playerY / 2);
        ctx.fillText("Time it wisely... Good Luck", playerX / 1.5, (playerY / 2) + 30);
        ctx.arc(playerX, playerY, playerImg.height / 2, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5;
        ctx.fill();
    } else if (!model.player.isalive && firstSpawnFlag && gameBegun && !model.gameOver) {
        ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.fillStyle = "aqua";
        ctx.fillText("Press 'T' to respawn at the circle", playerX / 2, playerY / 2);
        ctx.fillText("Time it wisely...", playerX / 1.5, (playerY / 2) + 30);
        ctx.arc(playerX, playerY, playerImg.height / 2, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5;
        ctx.fill();
    }

    // draw enemyship/s on canvas
    for (let k = 0; k < model.enemyArray.length; k++) {
        ctx.beginPath();
        let enemyX = model.enemyArray[k].x;
        let enemyY = model.enemyArray[k].y;
        let enemyIsHit = model.enemyArray[k].isHit;
        if (enemyIsHit) rotateAndDrawImage(enemyDamagedImg, enemyX, enemyY, 0);
        else rotateAndDrawImage(enemyImg, enemyX, enemyY, 0);
    }

    // draw all the player bullets to canvas
    for (let j = 0; j < model.player.ammunition.length; j++) {
        ctx.beginPath();
        let bulletX = model.player.ammunition[j].x;
        let bulletY = model.player.ammunition[j].y;
        let angle = model.player.ammunition[j].angle;
        rotateAndDrawImage(playerBulletImg, bulletX, bulletY, angle);
    }

    // draw all the enemy bullets to canvas
    for (let k = 0; k < model.enemyArray.length; k++) {
        let enemy = model.enemyArray[k];
        for (let i = 0; i < enemy.ammunition.length; i++) {
            ctx.beginPath();
            let bulletX = enemy.ammunition[i].x;
            let bulletY = enemy.ammunition[i].y;
            let angle = enemy.ammunition[i].angle;
            rotateAndDrawImage(enemyBulletImg, bulletX, bulletY, angle);
        }
    }

    // draw all the asteroids to canvas
    for (let i = 0; i < model.asteroidCount; i++) {
        let asteroidX = model.asteroidArray[i].x;
        let asteroidY = model.asteroidArray[i].y;
        ctx.beginPath();
        if (model.asteroidArray[i].large) rotateAndDrawImage(asteroidLargeImg, asteroidX, asteroidY, 1);
        else if (model.asteroidArray[i].medium) rotateAndDrawImage(asteroidMediumImg, asteroidX, asteroidY, 1);
        else if (model.asteroidArray[i].small) rotateAndDrawImage(asteroidSmallImg, asteroidX, asteroidY, 1);
    }

    // draw all explosions taking place
    for (let i = 0; i < model.explosionArray.length; i++) {
        ctx.beginPath();
        let explosion = model.explosionArray[i];
        if (explosion.isEnemy || explosion.isLargeAsteroid) {
            rotateAndDrawImage(explosionImg1, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg2, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg3, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg4, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg5, explosion.x, explosion.y, 1);
        } else if (explosion.isPlayer || explosion.isMediumAsteroid) {
            rotateAndDrawImage(explosionImg1, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg2, explosion.x, explosion.y, 1);
        } else if (explosion.isSmallAsteroid) {
            rotateAndDrawImage(explosionImg1, explosion.x, explosion.y, 1);
        } else {
            rotateAndDrawImage(explosionImg1, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg2, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg3, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg4, explosion.x, explosion.y, 1);
            rotateAndDrawImage(explosionImg5, explosion.x, explosion.y, 1);
        }
    }
    controller.resetExplosionArray();
}

/* helper function to draw an image on the canvas */
function rotateAndDrawImage(image, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-1 * angle); // angle already in radians.
    ctx.drawImage(image, -1 * image.width / 2, -1 * image.height / 2, image.width, image.height);
    ctx.restore();
}

/* helper function to manage time display in game and track game time */
function postTime() {
    if (gameBegun && !model.gameOver) {
        endTime = new Date();
        timeElapsed = endTime - startTime;
        seconds = Math.round(timeElapsed / 1000);
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
    }

    if (!gameBegun) {
        $('#timeElapsed')[0].innerHTML = '00:00:00';
    } else {
        if (hours.toString().length !== 2 && (minutes % 60).toString().length !== 2 && (seconds % 60).toString().length !== 2) $('#timeElapsed')[0].innerHTML = '0' + hours + ':' + '0' + minutes % 60 + ':' + '0' + seconds % 60;
        else if (hours.toString().length !== 2 && (minutes % 60).toString().length === 2 && (seconds % 60).toString().length === 2) $('#timeElapsed')[0].innerHTML = '0' + hours + ':' + minutes % 60 + ':' + seconds % 60;
        else if (hours.toString().length === 2 && (minutes % 60).toString().length !== 2 && (seconds % 60).toString().length === 2) $('#timeElapsed')[0].innerHTML = hours + ':' + '0' + minutes % 60 + ':' + seconds % 60;
        else if (hours.toString().length === 2 && (minutes % 60).toString().length === 2 && (seconds % 60).toString().length !== 2) $('#timeElapsed')[0].innerHTML = hours + ':' + minutes % 60 + ':' + '0' + seconds % 60;
        else if (hours.toString().length !== 2 && (minutes % 60).toString().length !== 2 && (seconds % 60).toString().length === 2) $('#timeElapsed')[0].innerHTML = '0' + hours + ':' + '0' + minutes % 60 + ':' + seconds % 60;
        else if (hours.toString().length === 2 && (minutes % 60).toString().length !== 2 && (seconds % 60).toString().length !== 2) $('#timeElapsed')[0].innerHTML = hours + ':' + '0' + minutes % 60 + ':' + '0' + seconds % 60;
        else if (hours.toString().length !== 2 && (minutes % 60).toString().length === 2 && (seconds % 60).toString().length !== 2) $('#timeElapsed')[0].innerHTML = '0' + hours + ':' + minutes % 60 + ':' + '0' + seconds % 60;
        else if (hours.toString().length === 2 && (minutes % 60).toString().length === 2 && (seconds % 60).toString().length === 2) $('#timeElapsed')[0].innerHTML = hours + ':' + minutes % 60 + ':' + seconds % 60;
        else $('#timeElapsed')[0].innerHTML = '0' + hours + ':' + '0' + minutes % 60 + ':' + '0' + seconds % 60;
    }
}

/* helper function to keep track of player lives remaining in game */
function postLives() {
    $('#countLife').html('');
    for (let i = 0; i < model.numPlayerLives; i++) $('#countLife').prepend(' ').prepend('<img src="./graphics/spacecraft/life.png"width="30" height="40" />')
}

/* helper function to display player score */
function postScore() {
    $('#scoreInner').html(model.playerScore);
}

/* erases and upates the stage */
function resetStage() {
    canvasHeight = window.innerHeight;
    canvasWidth = window.innerWidth;
    canvas = $('#primaryStage');
    canvas.attr('height', canvasHeight);
    canvas.attr('width', canvasWidth);
    controller.canvasHeight = canvasHeight;
    controller.canvasWidth = canvasWidth;
    ctx = $("#primaryStage")[0].getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* start window */
function startGame() {
    getUser();
    //introSound.play();
    gameBegun = true
    timeBeginflag = true;
    $('#startWindow').css('display', 'none');
    $('#gameOverWindow').css('display', 'none');
}

/* directions window */
function showDirections() {
    if (model.gameOver) {
        $('#displayDirections').css('display', 'block');
        $('#heading').css('display', 'none');
        $('#gameOverWindow').css('display', 'none');
    } else {
        $('#displayDirections').css('display', 'block');
        $('#heading').css('display', 'none');
        $('#startWindow').css('display', 'none');
    }

}

function exitDirections() {
    if (model.gameOver) {
        $('#displayDirections').css('display', 'none');
        $('#heading').css('display', 'block');
        $('#gameOverWindow').css('display', 'block');
    } else {
        $('#displayDirections').css('display', 'none');
        $('#heading').css('display', 'block');
        $('#startWindow').css('display', 'block');
    }
}

/* stats window */
function displayStats() {
    displayedStats = true;
    $('#gameStats').css('display', 'block');
    // game stats
    $('#user_stat').html('User: ' + user);
    $('#time_stat').html('Time: ' + $('#timeElapsed')[0].innerHTML);
    $('#score_stat').html('Score: ' + model.playerScore);
    $('#asteroidDest_stat').html('Asteroids Destroyed: ' + model.totalAsteroidsDestroyed);
    $('#asteroidSpwn_stat').html('Asteroids Spawned: ' + model.totalAsteroids);
    updateUserGames(); // send stats to server
}

/* gameover window */
function gameOverWindow() {
    $('#gameStats').css('display', 'none');
    $('#gameOverWindow').css('display', 'block');
}

function showGameStats() {
    $('#gameStats').css('display', 'block');
    $('#gameOverWindow').css('display', 'none');
}

function exitGameOverWindow() { $('#gameOverWindow').css('display', 'none'); }

/* AJAX POSTS/GETS */

function updateUserGames() {
    var today = new Date();
    var d = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let u = user;
    let t = $('#timeElapsed')[0].innerHTML;
    let s = model.playerScore;
    let ad = model.totalAsteroidsDestroyed;
    let as = model.totalAsteroids;
    $.ajax({
        url: '/update/user/games/',
        data: { username: u, gameDate: d, gametime: t, score: s, asteroidsDestroyed: ad, asteroidsSpawned: as },
        method: 'POST',
        success: function(output) {}
    });
}

function backToMenu() {
    $.ajax({
        url: '/menu/',
        data: {},
        method: 'GET',
        success: function(output) {
            console.log(output);
            //window.location = '../../main_menu.html';
            window.location.replace('../../main_menu.html')
        }
    });
}

function getUser() {
    $.ajax({
        url: '/get/username/',
        data: {},
        method: 'GET',
        success: function(output) {
            user = output;
        }
    });
}