/**
 * @author Reza Munoz-Asayesh
 * @file asteroid.js 
 * @project Asteroid Miners
 * @description This program, is the class for the Asteroid.
 * 
 */

class Asteroid {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = parseInt($('#asteroidLarge')[0].width);
        this.height = parseInt($('#asteroidLarge')[0].height);
        this.verticalVelocity = 0;
        this.horizontalVelocity = 0;
        this.angle = 0; //radians
        this.isHit = false;

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