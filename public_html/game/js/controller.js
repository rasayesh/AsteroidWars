/**
 * @author Reza Munoz-Asayesh
 * @file controller.js 
 * @project Asteroid Miners
 * @description This program, is the controller for the asteroid game.
 * It monitors and facilitates all communication between the view and the model,
 * thus updating the model whenever the user interacts with the game or a game 
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

    // player ship controls
    turnLeft() { model.player.turnLeft(); }
    turnRight() { model.player.turnRight(); }
    fireCannon() { this.addBullet(); }
    engineBurst() { model.player.engineBurst(); }


    addBullet() {
        let newBullet = new Bullet();
        newBullet.x = model.player.x + (model.player.width / 2);
        newBullet.y = model.player.y + (model.player.height / 2);
        newBullet.verticalVelocity = model.player.verticalVelocity;
        newBullet.horizontalVelocity = model.player.horizontalVelocity;
        newBullet.angle = model.player.angle;
        model.playerBulletsArray.push(newBullet);
        model.playerBulletsOnScreen++;
    }

    // update player/enemy/asteroid/playerBullet/enemyBullet position
    updatePlayerPosition() { this.updatePosition(model.player); }
    updateEnemyPosition() { for (let i = 0; i < model.enemyArray.length; i++) this.updatePosition(model.enemyArray[i]); }
    updateAsteroidPosition() { for (let i = 0; i < model.asteroidCount; i++) this.updatePosition(model.asteroidArray[i]); }
    updatePlayerBullets() { this.updateBulletPosition(); }


    // updates the position of the given object on the canvas based off of the 
    // objects velocity and angle.
    updatePosition(object) {
        object.x += object.horizontalVelocity;
        object.y += object.verticalVelocity;
        if (object.x > window.innerWidth) object.x = 0;
        if (object.x < 0) object.x = innerWidth;
        if (object.y > window.innerHeight) object.y = 0
        if (object.y < 0) object.y = innerHeight;
    }

    updateBulletPosition() {
        for (let i = 0; i < model.playerBulletsOnScreen; i++) {
            if (model.playerBulletsArray[i].rangeTravelled >= model.playerBulletsArray[i].range) {
                model.playerBulletsArray.splice(i, 1); // remove old asteroid.
                model.playerBulletsOnScreen--;
            } else {
                let shipDegree = (model.playerBulletsArray[i].angle * 180) / Math.PI;
                while (shipDegree > 360) { shipDegree -= 360; }
                while (shipDegree < -360) { shipDegree += 360; }
                if (shipDegree < 0) shipDegree = 360 + shipDegree;
                let remainingAngle = 90 - shipDegree;
                let x = (100 * Math.sin(remainingAngle * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
                let y = (100 * Math.sin(shipDegree * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
                model.playerBulletsArray[i].x += x / 10;
                model.playerBulletsArray[i].y -= y / 10;
                model.playerBulletsArray[i].rangeTravelled += Math.abs(x);
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
        // check if a player bullet has hit an asteroid and thus destroyed it
        for (let i = 0; i < model.asteroidCount; i++) {
            let asteroidXRadiusRight = model.asteroidArray[i].x + (model.asteroidArray[i].width / 2.5);
            let asteroidXRadiusLeft = model.asteroidArray[i].x - (model.asteroidArray[i].width / 2.5);
            let asteroidYRadiusDown = model.asteroidArray[i].y + (model.asteroidArray[i].height / 2.5);
            let asteroidYRadiusUp = model.asteroidArray[i].y - (model.asteroidArray[i].height / 2.5);
            for (let j = 0; j < model.playerBulletsOnScreen; j++) {
                let bulletX = model.playerBulletsArray[j].x;
                let bulletY = model.playerBulletsArray[j].y;
                if ((bulletX <= asteroidXRadiusRight && bulletX >= asteroidXRadiusLeft) &&
                    bulletY <= asteroidYRadiusDown && bulletY >= asteroidYRadiusUp) {
                    model.asteroidArray[i].isHit = true; // code to destroy asteroid
                    model.playerBulletsArray[j].rangeTravelled = model.playerBulletsArray[j].range; // get rid of bullet 
                }
            }
        }

        // for all asteroids that are "hit" break or remove them
        for (let i = 0; i < model.asteroidCount; i++) {
            if (model.asteroidArray[i].isHit) {
                if (model.asteroidArray[index].large) {
                    for (let i = 0; i < 2; i++) {
                        let x = model.asteroidArray[index].x;
                        let y = model.asteroidArray[index].y;
                        let width = parseInt($('#asteroidMedium')[0].width);
                        let height = parseInt($('#asteroidMedium')[0].height);
                        let vertVelocity = Math.random() * (.9 - .21) + .21;
                        vertVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                        let horzVelocity = Math.random() * (.9 - .21) + .21;
                        horzVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                        let angle = (Math.random() * (Math.PI / 180) * 2);
                        let size = 'medium';
                        this.makeNewAsteroid(x, y, width, height, vertVelocity, horzVelocity, angle, size);
                    }
                    model.asteroidArray.splice(index, 1); // remove old asteroid.
                    model.asteroidExplodeSound.play();
                    model.asteroidCount--;
                    model.totalLargeAsteroidsDestroyed += 1;
                    model.totalAsteroidsDestroyed += 1
                    model.playerScore += 10;
                } else if (model.asteroidArray[index].medium) {
                    for (let i = 0; i < 4; i++) {
                        let x = model.asteroidArray[index].x;
                        let y = model.asteroidArray[index].y;
                        let width = parseInt($('#asteroidSmall')[0].width);
                        let height = parseInt($('#asteroidSmall')[0].height);
                        let vertVelocity = Math.random() * (.9 - .21) + .21;
                        vertVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                        let horzVelocity = Math.random() * (.9 - .21) + .21;
                        horzVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                        let angle = (Math.random() * (Math.PI / 180) * 2);
                        let size = 'small';
                        this.makeNewAsteroid(x, y, width, height, vertVelocity, horzVelocity, angle, size);
                    }
                    model.asteroidArray.splice(index, 1); // remove old asteroid
                    model.asteroidExplodeSound.play();
                    model.asteroidCount--;
                    model.totalMediumAsteroidsDestroyed += 1;
                    model.totalAsteroidsDestroyed += 1
                    model.playerScore += 50;
                } else if (model.asteroidArray[index].small) {
                    model.asteroidArray.splice(index, 1);
                    model.asteroidExplodeSound.play();
                    model.asteroidCount--;
                    model.totalSmallAsteroidsDestroyed += 1;
                    model.totalAsteroidsDestroyed += 1
                    model.playerScore += 100;
                } else console.log('ERROR: not sure what to do with this asteroid.');
            }
        }
    }

    // checks if the player's ship has crashed into any of the asteroids.
    updatePlayerDestroyed() {
        for (let i = 0; i < model.asteroidCount; i++) {
            let asteroidXRadiusRight = model.asteroidArray[i].x + (model.asteroidArray[i].width / 2.75);
            let asteroidXRadiusLeft = model.asteroidArray[i].x - (model.asteroidArray[i].width / 2.75);
            let asteroidYRadiusDown = model.asteroidArray[i].y + (model.asteroidArray[i].height / 2.75);
            let asteroidYRadiusUp = model.asteroidArray[i].y - (model.asteroidArray[i].height / 2.75);
            let spaceshipX = model.player.x + model.player.width / 2;
            let spaceshipY = model.player.y + model.player.height / 2;
            if ((spaceshipX <= asteroidXRadiusRight && spaceshipX >= asteroidXRadiusLeft) &&
                spaceshipY <= asteroidYRadiusDown && spaceshipY >= asteroidYRadiusUp && model.player.isAlive) {
                console.log('spaceship crashed!');
                console.log('you died!');
                model.player.playerDied();
                model.numPlayerLives--;
                if (model.numPlayerLives === 0) {
                    console.log('game over event');
                    model.gameOver = true;
                }
            }
        }
    }

    // check if all the asteroids are gone, then respawn more asteroids by 1.5x previous amount.
    asteroidsAllGoneEvent() {
        if (model.asteroidCount === 0) {
            model.staticAsteroidCount *= 1.5;
            model.asteroidCount = Math.floor(model.staticAsteroidCount);
            model.initializeAsteroids();
            model.player.resetToSpawnLocation();
        }
    }

    // check if a minute has passed, then spawn enemy
    updateEnemyEvent(minutes) {
        if (minutes === model.enemySpawnTicker) {
            console.log('spawn enemy ship!');
            model.enemySpawnTicker++;
            // add enemy ship to enemyShipArray
            let newEnemy = new Enemy();
            model.enemyArray.push(newEnemy);
            model.enemiesSpawned++;
        }
    }


    // check if a bullet or asteroid has hit enemy space ship and thus destroyed it.
    updateEnemyDestroyed() {
        // check if player killed enemy
        for (let i = 0; i < model.enemyArray.length; i++) {
            let enemyShipXRadiusRight = model.enemyArray[i].x + (model.enemyArray[i].width / 2.5);
            let enemyShipXRadiusLeft = model.enemyArray[i].x - (model.enemyArray[i].width / 2.5);
            let enemyShipYRadiusDown = model.enemyArray[i].y + (model.enemyArray[i].height / 2.5);
            let enemyShipXRadiusUp = model.enemyArray[i].y - (model.enemyArray[i].height / 2.5);
            for (let j = 0; j < model.playerBulletsOnScreen; j++) {
                let bulletX = model.playerBulletsArray[j].x;
                let bulletY = model.playerBulletsArray[j].y;
                if ((bulletX <= enemyShipXRadiusRight && bulletX >= enemyShipXRadiusLeft) &&
                    bulletY <= enemyShipYRadiusDown && bulletY >= enemyShipXRadiusUp) {
                    model.enemyArray[i].isAlive = false; // set enemy to dead
                    model.playerBulletsArray[j].rangeTravelled = model.playerBulletsArray[j].range; // get rid of bullet 
                    model.enemyArray[i].enemyDied();
                }
            }
        }

        // check if asteroid killed enemy
        for (let i = 0; i < model.asteroidCount; i++) {
            let asteroidXRadiusRight = model.asteroidArray[i].x + (model.asteroidArray[i].width / 2.75);
            let asteroidXRadiusLeft = model.asteroidArray[i].x - (model.asteroidArray[i].width / 2.75);
            let asteroidYRadiusDown = model.asteroidArray[i].y + (model.asteroidArray[i].height / 2.75);
            let asteroidYRadiusUp = model.asteroidArray[i].y - (model.asteroidArray[i].height / 2.75);
            for (let j = 0; j < model.enemyArray.length; j++) {
                let enemyX = model.enemyArray[j].x + model.enemyArray[j].width / 2.5;
                let enemyY = model.enemyArray[j].y + model.enemyArray[j].height / 2.5;
                if ((enemyX <= asteroidXRadiusRight && enemyX >= asteroidXRadiusLeft) &&
                    enemyY <= asteroidYRadiusDown && enemyY >= asteroidYRadiusUp && model.enemyArray[j].isAlive) {
                    console.log('enemyShip crashed!');
                    model.enemyArray[j].enemyDied();
                }
            }
        }

        // check if enemy is dead and remove it from game / give player bounty
        for (let j = 0; j < model.enemyArray.length; j++) {
            if (!model.enemyArray[j].isAlive) {
                model.enemyArray.splice(j, 1); // remove enemy from enemy array
                // update player bounty--------------------------------------------------------------------------------------
            }
        }
    }

    // add enemy projectiles here .
    // 0. get enemy bullet sprite
    // 1. create enemy projectile array
    // 2. when enemy spawned add x bullets to array every 1 second
    // 3. fire every second in all directions
    //     - if enemy alive and has bullets fire
    //     - after 1 second add more bullets to enemyBulletArray 
    // repeat.




}