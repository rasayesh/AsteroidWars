/**
 * @author Reza Munoz-Asayesh
 * @file controller.js 
 * @project Asteroid Wars
 * @description This program, is the controller for the Asteroid Wars game.
 * It monitors and facilitates all communication between the view and the model,
 * updating the model whenever the user interacts with the game or a game 
 * event occures it always goes through this.
 * 
 */

class Controller {
    constructor(model) {
        this.model = model;
        this.asteroidArray = [];
    }


    // respawn player 
    respawn() {
        model.player.isAlive = true;
        model.player.isSafeToSpawn = true;
    }

    // make model explosion array empty, no more explosions on map
    resetExplosionArray() {
        model.explosionArray = [];
    }

    // player ship controls
    turnLeft() { model.player.turnLeft(); }
    turnRight() { model.player.turnRight(); }
    thrust() { model.player.thrust(); }

    firePlayerCannon() {
        let newBullet = new Bullet();
        newBullet.isPlayerBullet = true;
        newBullet.x = model.player.x + (model.player.width / 2);
        newBullet.y = model.player.y + (model.player.height / 2);
        newBullet.width = parseInt($('#playerBullet')[0].width);
        newBullet.height = parseInt($('#playerBullet')[0].height);
        newBullet.verticalVelocity = model.player.verticalVelocity;
        newBullet.horizontalVelocity = model.player.horizontalVelocity;
        newBullet.angle = model.player.angle;
        model.player.ammunition.push(newBullet);
        model.player.shoot.play();
    }

    // update player/enemy/asteroid/playerBullet/enemyBullet position
    updatePlayerPosition() { this.updatePosition(model.player); }
    updateEnemyPosition() { for (let i = 0; i < model.enemyArray.length; i++) this.updatePosition(model.enemyArray[i]); }
    updateAsteroidPosition() { for (let i = 0; i < model.asteroidCount; i++) this.updatePosition(model.asteroidArray[i]); }

    // updates the position of the given object on the canvas based off of the 
    // objects velocity and angle
    updatePosition(object) {
        object.x += object.horizontalVelocity;
        object.y += object.verticalVelocity;
        if (object.x > window.innerWidth) object.x = 0;
        if (object.x < 0) object.x = innerWidth;
        if (object.y > window.innerHeight) object.y = 0
        if (object.y < 0) object.y = innerHeight;
    }

    // update player bullets position on map
    updatePlayerBullets() {
        for (let i = 0; i < model.player.ammunition.length; i++) {
            if (model.player.ammunition[i].rangeTravelled >= model.player.ammunition[i].range) {
                model.player.ammunition.splice(i, 1); // remove old asteroid
            } else {
                let shipDegree = (model.player.ammunition[i].angle * 180) / Math.PI;
                while (shipDegree > 360) { shipDegree -= 360; }
                while (shipDegree < -360) { shipDegree += 360; }
                if (shipDegree < 0) shipDegree = 360 + shipDegree;
                let remainingAngle = 90 - shipDegree;
                let x = (100 * Math.sin(remainingAngle * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
                let y = (100 * Math.sin(shipDegree * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
                model.player.ammunition[i].x += x / 10;
                model.player.ammunition[i].y -= y / 10;
                model.player.ammunition[i].rangeTravelled += Math.abs(x);
            }
        }
    }

    // update enemy bullets position on map
    updateEnemyBullets() {
        for (let k = 0; k < model.enemyArray.length; k++) {
            let enemy = model.enemyArray[k];
            for (let i = 0; i < enemy.ammunition.length; i++) {
                if (enemy.ammunition[i].rangeTravelled >= enemy.ammunition[i].range) {
                    enemy.ammunition.splice(i, 1); // remove old asteroid
                } else {
                    let shipDegree = (enemy.ammunition[i].angle * 180) / Math.PI;
                    while (shipDegree > 360) { shipDegree -= 360; }
                    while (shipDegree < -360) { shipDegree += 360; }
                    if (shipDegree < 0) shipDegree = 360 + shipDegree;
                    let remainingAngle = 90 - shipDegree;
                    let x = (100 * Math.sin(remainingAngle * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
                    let y = (100 * Math.sin(shipDegree * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
                    enemy.ammunition[i].x += x / 50;
                    enemy.ammunition[i].y -= y / 50;
                    enemy.ammunition[i].rangeTravelled += Math.abs(x);
                }
            }
        }
    }

    // create a new asteroid
    makeNewAsteroid(x, y, width, height, verticalVelocity, horizontalVelocity, angle, size) {
        let newAsteroid = new Asteroid();
        newAsteroid.x = x;
        newAsteroid.y = y;
        newAsteroid.width = width;
        newAsteroid.height = height;
        newAsteroid.verticalVelocity = verticalVelocity;
        newAsteroid.horizontalVelocity = horizontalVelocity;
        newAsteroid.angle = angle;
        if (size === 'small') newAsteroid.setSmall();
        if (size === 'medium') newAsteroid.setMedium();
        if (size === 'large') newAsteroid.setLarge();
        model.asteroidArray.push(newAsteroid);
        model.asteroidCount++;
        model.totalAsteroids++;
    }

    // if the asteroid is hit then it will be broken up, or removed
    updateAsteroidDestroyed() {
        // check if a player bullet has hit an asteroid and destroyed it
        for (let i = 0; i < model.asteroidCount; i++) {
            let asteroid = model.asteroidArray[i];
            let asteroidXRadiusRight = asteroid.x + (asteroid.width / 2.5);
            let asteroidXRadiusLeft = asteroid.x - (asteroid.width / 2.5);
            let asteroidYRadiusDown = asteroid.y + (asteroid.height / 2.5);
            let asteroidYRadiusUp = asteroid.y - (asteroid.height / 2.5);
            for (let j = 0; j < model.player.ammunition.length; j++) {
                let bulletX = model.player.ammunition[j].x;
                let bulletY = model.player.ammunition[j].y;
                if ((bulletX <= asteroidXRadiusRight && bulletX >= asteroidXRadiusLeft) &&
                    bulletY <= asteroidYRadiusDown && bulletY >= asteroidYRadiusUp) {
                    asteroid.isHit = true; // destroy asteroid
                    asteroid.destroyedByPlayer = true;
                    model.player.ammunition[j].rangeTravelled = model.player.ammunition[j].range; // get rid of bullet 
                }
            }
        }
        // check if a enemy bullet has hit an asteroid and destroyed it
        for (let k = 0; k < model.enemyArray.length; k++) {
            let enemy = model.enemyArray[k];
            for (let i = 0; i < model.asteroidCount; i++) {
                let asteroid = model.asteroidArray[i];
                let asteroidXRadiusRight = asteroid.x + (asteroid.width / 2.5);
                let asteroidXRadiusLeft = asteroid.x - (asteroid.width / 2.5);
                let asteroidYRadiusDown = asteroid.y + (asteroid.height / 2.5);
                let asteroidYRadiusUp = asteroid.y - (asteroid.height / 2.5);
                for (let j = 0; j < enemy.ammunition.length; j++) {
                    let bulletX = enemy.ammunition[j].x;
                    let bulletY = enemy.ammunition[j].y;
                    if ((bulletX <= asteroidXRadiusRight && bulletX >= asteroidXRadiusLeft) &&
                        bulletY <= asteroidYRadiusDown && bulletY >= asteroidYRadiusUp) {
                        asteroid.isHit = true; // destroy asteroid
                        asteroid.destroyedByEnemy = true;
                        enemy.ammunition[j].rangeTravelled = enemy.ammunition[j].range; // get rid of bullet 
                    }
                }
            }
        }
        // for all asteroids that are "hit" break or remove them
        for (let asteroid = 0; asteroid < model.asteroidCount; asteroid++) {
            if (model.asteroidArray[asteroid].isHit) {
                if (model.asteroidArray[asteroid].large) {
                    // make large asteroid explosion
                    let newExplosion = new Explosion(model.asteroidArray[asteroid].x, model.asteroidArray[asteroid].y);
                    newExplosion.isLargeAsteroid = true;
                    model.explosionArray.push(newExplosion);
                    for (let i = 0; i < 2; i++) {
                        let x = model.asteroidArray[asteroid].x;
                        let y = model.asteroidArray[asteroid].y;
                        let width = parseInt($('#asteroidMedium')[0].width);
                        let height = parseInt($('#asteroidMedium')[0].height);
                        let vertVelocity = Math.random() * (1.7 - .6) + .6;
                        vertVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                        let horzVelocity = Math.random() * (1.7 - .6) + .6;
                        horzVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                        let angle = (Math.random() * (Math.PI / 180) * 2);
                        let size = 'medium';
                        this.makeNewAsteroid(x, y, width, height, vertVelocity, horzVelocity, angle, size);
                    }
                    model.asteroidArray[asteroid].asteroidExplodeSound.play();
                    if (model.asteroidArray[asteroid].destroyedByPlayer) model.playerScore += 100;
                    model.asteroidArray.splice(asteroid, 1); // remove old asteroid
                    model.asteroidCount--;
                    model.totalLargeAsteroidsDestroyed += 1;
                    model.totalAsteroidsDestroyed += 1
                } else if (model.asteroidArray[asteroid].medium) {
                    // make medium asteroid explosion
                    let newExplosion = new Explosion(model.asteroidArray[asteroid].x, model.asteroidArray[asteroid].y);
                    newExplosion.isMediumAsteroid = true;
                    model.explosionArray.push(newExplosion);
                    for (let i = 0; i < 4; i++) {
                        let x = model.asteroidArray[asteroid].x;
                        let y = model.asteroidArray[asteroid].y;
                        let width = parseInt($('#asteroidSmall')[0].width);
                        let height = parseInt($('#asteroidSmall')[0].height);
                        let vertVelocity = Math.random() * (1.7 - .6) + .6;
                        vertVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                        let horzVelocity = Math.random() * (1.7 - .6) + .6;
                        horzVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                        let angle = (Math.random() * (Math.PI / 180) * 2);
                        let size = 'small';
                        this.makeNewAsteroid(x, y, width, height, vertVelocity, horzVelocity, angle, size);
                    }
                    model.asteroidArray[asteroid].asteroidExplodeSound.play();
                    if (model.asteroidArray[asteroid].destroyedByPlayer) model.playerScore += 50;
                    model.asteroidArray.splice(asteroid, 1); // remove old asteroid
                    model.asteroidCount--;
                    model.totalMediumAsteroidsDestroyed += 1;
                    model.totalAsteroidsDestroyed += 1
                } else if (model.asteroidArray[asteroid].small) {
                    // make small asteroid explosion
                    let newExplosion = new Explosion(model.asteroidArray[asteroid].x, model.asteroidArray[asteroid].y);
                    newExplosion.isSmallAsteroid = true;
                    model.explosionArray.push(newExplosion);
                    model.asteroidArray[asteroid].asteroidExplodeSound.play();
                    if (model.asteroidArray[asteroid].destroyedByPlayer) model.playerScore += 10;
                    model.asteroidArray.splice(asteroid, 1);
                    model.asteroidCount--;
                    model.totalSmallAsteroidsDestroyed += 1;
                    model.totalAsteroidsDestroyed += 1
                } else console.log('ERROR: not sure what to do with this asteroid.');
            }
        }
    }

    // checks if the player's ship has crashed into any of the asteroids or player has been shot by enemy spaceship
    updatePlayerDestroyed() {
        for (let i = 0; i < model.asteroidCount; i++) {
            let asteroid = model.asteroidArray[i];
            let asteroidXRadiusRight = asteroid.x + (asteroid.width / 2.75);
            let asteroidXRadiusLeft = asteroid.x - (asteroid.width / 2.75);
            let asteroidYRadiusDown = asteroid.y + (asteroid.height / 2.75);
            let asteroidYRadiusUp = asteroid.y - (asteroid.height / 2.75);
            let spaceshipX = model.player.x + model.player.width / 2;
            let spaceshipY = model.player.y + model.player.height / 2;
            if ((spaceshipX <= asteroidXRadiusRight && spaceshipX >= asteroidXRadiusLeft) &&
                spaceshipY <= asteroidYRadiusDown && spaceshipY >= asteroidYRadiusUp && model.player.isAlive) {
                console.log('spaceship crashed!');
                let newExplosion = new Explosion(spaceshipX, spaceshipY);
                newExplosion.isPlayer = true;
                model.explosionArray.push(newExplosion);
                model.player.playerDied();
                model.numPlayerLives--; // player loses 1 life
                if (model.numPlayerLives === 0) {
                    for (let a = 0; a < model.enemyArray.length; a++) model.enemyArray[a].enemyDied(); // remove enemy ships from map on player death
                    console.log('game over event');
                    model.gameOver = true;
                }
            }
        }
        // check if a enemy bullet has hit player ship and destroyed it
        let player = model.player;
        let playerXRadiusRight = player.x + (player.width / 2);
        let playerXRadiusLeft = player.x - (player.width / 2);
        let playerYRadiusDown = player.y + (player.height / 2);
        let playerYRadiusUp = player.y - (player.height / 2);
        for (let k = 0; k < model.enemyArray.length; k++) {
            let enemy = model.enemyArray[k];
            for (let j = 0; j < enemy.ammunition.length; j++) {
                let bulletX = enemy.ammunition[j].x;
                let bulletY = enemy.ammunition[j].y;
                if ((bulletX <= playerXRadiusRight && bulletX >= playerXRadiusLeft) &&
                    bulletY <= playerYRadiusDown && bulletY >= playerYRadiusUp && model.player.isAlive) {
                    enemy.ammunition[j].rangeTravelled = enemy.ammunition[j].range; // get rid of bullet 
                    // add new explosion
                    let newExplosion = new Explosion(player.x, player.y);
                    newExplosion.isPlayer = true;
                    model.explosionArray.push(newExplosion);
                    // set player to dead
                    model.player.playerDied();
                    model.numPlayerLives--; // player loses 1 life
                    if (model.numPlayerLives === 0) {
                        for (let a = 0; a < model.enemyArray.length; a++) model.enemyArray[a].enemyDied(); // remove enemy ships from map on player death
                        console.log('game over event');
                        model.gameOver = true;
                    }
                }
            }
        }
        // check if player has crashed into enemy ship
        for (let i = 0; i < model.enemyArray.length; i++) {
            let playerX = model.player.x;
            let playerY = model.player.y;
            let enemyShip = model.enemyArray[i];
            let enemyShipXRadiusRight = enemyShip.x + (enemyShip.width / 2.5);
            let enemyShipXRadiusLeft = enemyShip.x - (enemyShip.width / 2.5);
            let enemyShipYRadiusDown = enemyShip.y + (enemyShip.height / 2.5);
            let enemyShipXRadiusUp = enemyShip.y - (enemyShip.height / 2.5);
            if ((playerX <= enemyShipXRadiusRight && playerX >= enemyShipXRadiusLeft) &&
                playerY <= enemyShipYRadiusDown && playerY >= enemyShipXRadiusUp && model.player.isAlive) {
                // add new explosion
                let newExplosion = new Explosion(player.x, player.y);
                newExplosion.isPlayer = true;
                model.explosionArray.push(newExplosion);
                // set player to dead
                model.player.playerDied();
                model.numPlayerLives--; // player loses 1 life
                if (model.numPlayerLives === 0) {
                    for (let a = 0; a < model.enemyArray.length; a++) model.enemyArray[a].enemyDied(); // remove enemy ships from map on player death
                    console.log('game over event');
                    model.gameOver = true;
                }
            }
        }

    }

    // check if a bullet or asteroid has hit enemy space ship and  destroyed it
    updateEnemyDestroyed() {
        // reset enemy is hit
        for (let enemy = 0; enemy < model.enemyArray.length; enemy++) {
            model.enemyArray[enemy].isHit = false;
        }
        // check if player killed enemy
        for (let i = 0; i < model.enemyArray.length; i++) {
            let enemyShip = model.enemyArray[i];
            let enemyShipXRadiusRight = enemyShip.x + (enemyShip.width / 2.5);
            let enemyShipXRadiusLeft = enemyShip.x - (enemyShip.width / 2.5);
            let enemyShipYRadiusDown = enemyShip.y + (enemyShip.height / 2.5);
            let enemyShipXRadiusUp = enemyShip.y - (enemyShip.height / 2.5);
            for (let j = 0; j < model.player.ammunition.length; j++) {
                let bulletX = model.player.ammunition[j].x;
                let bulletY = model.player.ammunition[j].y;
                if ((bulletX <= enemyShipXRadiusRight && bulletX >= enemyShipXRadiusLeft) &&
                    bulletY <= enemyShipYRadiusDown && bulletY >= enemyShipXRadiusUp) {
                    model.player.ammunition[j].rangeTravelled = model.player.ammunition[j].range; // get rid of bullet 
                    if (enemyShip.health === 0) {
                        let newExplosion = new Explosion(enemyShip.x, enemyShip.y);
                        newExplosion.isEnemy = true;
                        model.explosionArray.push(newExplosion);
                        enemyShip.destroyedByPlayer = true;
                        enemyShip.enemyDied();
                    } else {
                        enemyShip.health--;
                        console.log('enemy ship shot health : ', enemyShip.health);
                        enemyShip.isHit = true;
                    }
                }
            }
        }
        // check if asteroid killed enemy
        for (let i = 0; i < model.asteroidCount; i++) {
            let asteroid = model.asteroidArray[i];
            let asteroidX = asteroid.x;
            let asteroidY = asteroid.y;
            for (let j = 0; j < model.enemyArray.length; j++) {
                let enemyShip = model.enemyArray[j];
                let enemyShipXRadiusRight = enemyShip.x + (enemyShip.width / 2.5);
                let enemyShipXRadiusLeft = enemyShip.x - (enemyShip.width / 2.5);
                let enemyShipYRadiusDown = enemyShip.y + (enemyShip.height / 2.5);
                let enemyShipXRadiusUp = enemyShip.y - (enemyShip.height / 2.5);
                if ((asteroidX <= enemyShipXRadiusRight && asteroidX >= enemyShipXRadiusLeft) &&
                    asteroidY <= enemyShipYRadiusDown && asteroidY >= enemyShipXRadiusUp && enemyShip.isAlive) {
                    if (enemyShip.health === 0) {
                        let newExplosion = new Explosion(enemyShip.x, enemyShip.y);
                        newExplosion.isEnemy = true;
                        model.explosionArray.push(newExplosion);
                        enemyShip.destroyedByAsteroid = true;
                        enemyShip.enemyDied();
                    } else {
                        enemyShip.health--;
                        console.log('enemy ship hit by asteroid health : ', enemyShip.health);
                        enemyShip.isHit = true;
                    }
                }
            }
        }
        // check if enemy is dead and remove it from game / give player bounty
        for (let j = 0; j < model.enemyArray.length; j++) {
            if (!model.enemyArray[j].isAlive) {
                if (model.enemyArray[j].destroyedByAsteroid) model.enemyArray.splice(j, 1); // remove enemy from enemy array
                else if (model.enemyArray[j].destroyedByPlayer) {
                    model.enemyArray.splice(j, 1); // remove enemy from enemy array
                    model.playerScore += (500 * model.round); // add 500 * round multiplier to player score
                    model.enemiesDestroyed++;
                } else {
                    console.log('enemy killed by neither asteroid or player, must be game reset');
                }
            }
        }
    }

    // check if all the asteroids are gone, then respawn more asteroids by 1.5x previous amount
    asteroidsAllGoneEvent() {
        if (model.asteroidCount === 0 && model.enemyArray.length === 0) {
            model.staticAsteroidCount *= 1.5;
            model.asteroidCount = Math.floor(model.staticAsteroidCount);
            model.initializeAsteroids();
            model.player.resetToSpawnLocation();
            model.round++;
        }
    }

    // check if a minute has passed, then spawn enemy
    updateEnemyEvent(minutes) {
        if (minutes === model.enemySpawnTicker) {
            console.log('spawn enemy ship!');
            model.enemySpawnTicker++;
            // add enemy ship to enemyShipArray
            let newEnemy = new Enemy();
            newEnemy.health = newEnemy.health * model.round; // enemy health increases as rounds increase
            console.log('Enemy Health', newEnemy.health);
            model.enemyArray.push(newEnemy);
            model.enemiesSpawned++;
        }
    }
}