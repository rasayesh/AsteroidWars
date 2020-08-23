/**
 * @author Reza Munoz-Asayesh
 * @file enemy.js 
 * @project Asteroid Wars
 * @description This file, contains the Enemy class for holding the enemies 
 * attributes that will be manipulated by the controller, when a enemy is created
 * and stored in the model.
 * 
 */

class Enemy {
    constructor() {
        // pause flag, to pause shooting when game is paused
        this.pause = false;

        // enemy spawn sound
        this.spawnSound = new Howl({ src: ['../../game/sounds/enemy/enemy_spawn.mp3'], volume: 0.6 });
        this.spawnSound.play();

        // enemy lazer gun sound
        this.shoot = new Howl({ src: ['../../game/sounds/enemy/enemy_lazer_gun.mp3'], volume: 0.05 });

        // enemy ship explode sound
        this.spaceShipExplodeSound = new Howl({ src: ['../../game/sounds/explosion/ship_explode.mp3'], volume: 0.8 });

        // enemy thrust sound
        this.thrustOn = false;
        this.thrustSound = new Howl({
            src: ['../../game/sounds/enemy/enemy_thrust.mp3'],
            onplay: () => { this.thrustOn = true; },
            onend: () => { this.thrustOn = false; },
            volume: 1
        });

        // health
        this.health = 100;

        // isHit
        this.isHit = false;

        // alive flag
        this.isAlive = true;

        // position x & y
        this.x = window.innerWidth;
        this.y = window.innerHeight / 2;

        // size
        this.width = parseInt($('#enemy')[0].width);
        this.height = parseInt($('#enemy')[0].height);

        // velocity x & y
        this.verticalVelocity = 0;
        this.horizontalVelocity = -.5;

        // variable attached to interval timer
        this.intervalVar;

        // ammo
        this.ammunition = [];
        this.initializeWeapons();

        // who destroyed this enemy
        this.destroyedByPlayer = false;
        this.destroyedByAsteroid = false;

    }

    // make enemy shoot every 1 second in 12 directions, initialize thrust sound
    initializeWeapons() {
        this.intervalVar = setInterval(() => {
            // while enemy is firing weapons it will be running so also play thrust sound.
            if (!this.pause) {
                if (!this.thrustOn) {
                    this.thrustSound.play();
                }
            } else {
                this.thrustSound.stop();
            }

            // fire weapons
            if (!this.pause) {
                for (let i = 0; i < 12; i++) {
                    let newBullet = new Bullet();
                    newBullet.isEnemyBullet = true;
                    newBullet.x = this.x;
                    newBullet.y = this.y;
                    newBullet.width = parseInt($('#enemyBullet')[0].width);
                    newBullet.height = parseInt($('#enemyBullet')[0].height);
                    newBullet.verticalVelocity = 0;
                    newBullet.horizontalVelocity = 0;
                    newBullet.angle = i;
                    this.ammunition.push(newBullet);
                    this.shoot.play();
                }
            }
        }, 1000);


    }

    // set enemy variables to dead, to remove this object
    enemyDied() {
        clearInterval(this.intervalVar);
        this.thrustSound.stop();
        this.spaceShipExplodeSound.play();
        this.isAlive = false;
        this.horizontalVelocity = 0;
    }

}