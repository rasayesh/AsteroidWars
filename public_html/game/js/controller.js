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

    updatePlayerPosition() { this.updatePosition(model.player); }
    engineBurst() { model.player.engineBurst(); }
    turnLeft() { model.player.turnLeft(); }
    turnRight() { model.player.turnRight(); }
    fireCannon() { model.addBullet(); }
    updateBullets() { model.updateBulletPosition(); }
    updateAsteroidPosition() { for (let i = 0; i < model.asteroidCount; i++) this.updatePosition(model.asteroidArray[i]); }
    respawn() {
        model.player.isAlive = true;
        model.player.isSafeToSpawn = true;
    }


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

    // checks if the space ship has crashed into any of the asteroids.
    checkSpaceShipCrash() {
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

    // check if a bullet has hit an asteroid and thus destroyed it.
    checkAsteroidIsDestroyed() {
        for (let i = 0; i < model.asteroidCount; i++) {
            let asteroidXRadiusRight = model.asteroidArray[i].x + (model.asteroidArray[i].width / 2.5);
            let asteroidXRadiusLeft = model.asteroidArray[i].x - (model.asteroidArray[i].width / 2.5);
            let asteroidYRadiusDown = model.asteroidArray[i].y + (model.asteroidArray[i].height / 2.5);
            let asteroidYRadiusUp = model.asteroidArray[i].y - (model.asteroidArray[i].height / 2.5);
            for (let j = 0; j < model.bulletsOnScreen; j++) {
                let bulletX = model.bulletsArray[j].x;
                let bulletY = model.bulletsArray[j].y;
                if ((bulletX <= asteroidXRadiusRight && bulletX >= asteroidXRadiusLeft) &&
                    bulletY <= asteroidYRadiusDown && bulletY >= asteroidYRadiusUp) {
                    model.asteroidArray[i].isHit = true; // code to destroy asteroid.
                    model.bulletsArray[j].rangeTravelled = model.bulletsArray[j].range; // get rid of bullet 
                }
            }
        }
    }

    // if the asteroid is hit then it will be broken up, or removed.
    breakHitAsteroids() {
        for (let i = 0; i < model.asteroidCount; i++)
            if (model.asteroidArray[i].isHit) model.updateAsteroidList(i)
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
}