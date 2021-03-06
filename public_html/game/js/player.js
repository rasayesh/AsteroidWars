/**
 * @author Reza Munoz-Asayesh
 * @file player.js 
 * @project Asteroid Wars
 * @description This file, contains the player class, and all of its 
 * attributes and attribute manipulating methods.
 * 
 */

class Player {
    constructor() {
        // player spawn sound
        this.spawn = new Howl({ src: ['../../game/sounds/player/player_spawn.mp3'], volume: 0.7 });

        // player lazer gun sound
        this.shoot = new Howl({ src: ['../../game/sounds/player/player_lazer_gun.mp3'], volume: 0.7 });

        // player engine thrust sound
        this.thrustOn = false;
        this.thrustSound = new Howl({
            src: ['../../game/sounds/player/player_thrust.mp3'],
            onplay: () => { this.thrustOn = true; },
            onend: () => { this.thrustOn = false; },
            volume: 0.7
        });

        // player ship explode sound
        this.spaceShipExplodeSound = new Howl({ src: ['../../game/sounds/explosion/ship_explode.mp3'], volume: 0.7 });

        // alive flag
        this.isAlive = false;

        // position x & y
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;

        // size
        this.width = parseInt($('#player')[0].width);
        this.height = parseInt($('#player')[0].height);

        // velocity x & y
        this.verticalVelocity = 0;
        this.horizontalVelocity = 0;

        // angle
        this.angle = 0; //radians

        // ammo
        this.ammunition = [];
    }

    thrust() {
        let arc = .03;
        // console.log('vertical: ', this.verticalVelocity);
        // console.log('horizontal: ', this.horizontalVelocity);
        this.verticalVelocity += -1 * arc * Math.sin(this.angle);
        this.horizontalVelocity += arc * Math.cos(this.angle);
        if (this.verticalVelocity > 4) this.verticalVelocity = 4; // max 4
        if (this.verticalVelocity < -4) this.verticalVelocity = -4; // max -4
        if (this.horizontalVelocity > 4) this.horizontalVelocity = 4; // max 4
        if (this.horizontalVelocity < -4) this.horizontalVelocity = -4; // max -4
        if (!this.thrustOn) this.thrustSound.play();
    }

    turnLeft() {
        this.angle += .04;
        //if (this.angle > (Math.PI / 180) * 2) this.angle = this.angle - (Math.PI / 180 * 2);
    }

    turnRight() {
        this.angle -= .04;
        //if (this.angle < 0) this.angle = this.angle + (Math.PI / 180 * 2);
    }

    playerDied() {
        this.spaceShipExplodeSound.play();
        this.isAlive = false;
        this.isSafeToSpawn = false;
        this.angle = 0; //radians
        this.resetToSpawnLocation();
    }

    resetToSpawnLocation() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.verticalVelocity = 0;
        this.horizontalVelocity = 0;
    }
}