/**
 * @author Reza Munoz-Asayesh
 * @file model.js 
 * @project Asteroid Wars
 * @description This file, contains the Model class that stores the state of the game, it is 
 * directly manipulated by the controller and is observed by the view which updates to reflect
 * the game state.
 * 
 */

class Model {
    constructor() {
        // game background music
        this.backgroundmusic = new Howl({ src: ['../../game/sounds/background/Serval.mp3'], loop: true, volume: .7 });
        this.backgroundmusic.play();

        // game over flag
        this.gameOver = false;

        // current game round (+1 every time all asteroids destroyed)
        this.round = 1;

        // asteroid stats
        this.totalAsteroids = 0;
        this.totalAsteroidsDestroyed = 0;
        this.totalSmallAsteroidsDestroyed = 0;
        this.totalMediumAsteroidsDestroyed = 0;
        this.totalLargeAsteroidsDestroyed = 0;

        // enemy stats
        this.enemySpawnTicker = 1; // determines when ship is spawned (1 equals min 1)
        this.enemiesSpawned = 0;
        this.enemiesDestroyed = 0;
        this.enemyArray = [];
        this.enemyOnMap = false; // flag to play enemy engine sound

        // player
        this.numPlayerLives = 4;
        this.playerScore = 0;
        this.player = new Player();

        // asteroids
        this.staticAsteroidCount = 3; // beginning asteroid count
        this.asteroidCount = 3; // current asteroids on map
        this.asteroidArray = []; // array of asteroid objects 
        this.initializeAsteroids();

        // explosions
        this.explosionArray = [];
    }

    initializeAsteroids() {
        for (let i = 0; i < this.asteroidCount; i++) {
            let newAsteroid = new Asteroid();
            let randVelocity = Math.random() * (1.2 - .6) + .6;
            randVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            newAsteroid.verticalVelocity = randVelocity;
            randVelocity = Math.random() * (1.2 - .6) + .6;
            randVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            newAsteroid.horizontalVelocity = randVelocity;
            newAsteroid.angle = (Math.random() * (Math.PI / 180) * 2);
            let playerX = this.player.x + (this.player.width / 2);
            let playerY = this.player.y + (this.player.height / 2);
            while (true) {
                let x = (Math.random() * window.innerWidth);
                let y = (Math.random() * window.innerHeight);
                if ((x < playerX - 200 || x > playerX + 200) && (y < playerY - 200 || y > playerY + 200)) { //------- bounds check.
                    newAsteroid.x = x;
                    newAsteroid.y = y;
                    break;
                }
            }
            this.totalAsteroids++;
            this.asteroidArray.push(newAsteroid);
        }
    }
}