/**
 * @author Reza Munoz-Asayesh
 * @file asteroid.js 
 * @project Asteroid Miners
 * @description This program, is the class for the Asteroid.
 * 
 */

class Asteroid {
    constructor() {
        // asteroid explosion sound
        this.asteroidExplodeSound = new Howl({ src: ['/public_html/game/sounds/explosion/asteroid_explode.mp3'], volume: 0.5 });

        // position x & y
        this.x = 0;
        this.y = 0;

        // size
        this.width = parseInt($('#asteroidLarge')[0].width);
        this.height = parseInt($('#asteroidLarge')[0].height);

        // velocity x & y
        this.verticalVelocity = 0;
        this.horizontalVelocity = 0;

        // angle
        this.angle = 0; //radians

        // is hit
        this.isHit = false;

        // who destroyed this asteroid
        this.destroyedByPlayer = false;
        this.destroyedByEnemy = false;

        // size;
        this.large = true;
        this.medium = false;
        this.small = false;
    }

    setSmall() {
        this.large = false;
        this.medium = false;
        this.small = true;
    }

    setMedium() {
        this.large = false;
        this.medium = true;
        this.small = false;
    }

    setLarge() {
        this.large = true;
        this.medium = false;
        this.small = false;
    }
}