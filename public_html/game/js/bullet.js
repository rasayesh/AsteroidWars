/**
 * @author Reza Munoz-Asayesh
 * @file bullet.js 
 * @project Asteroid Miners
 * @description This program, is the class for the Bullet.
 * 
 */

class Bullet {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = parseInt($('#bullet')[0].width);
        this.height = parseInt($('#bullet')[0].height);
        this.verticalVelocity = 0;
        this.horizontalVelocity = 0;
        this.angle = 0; //radians
        this.range = 10000; // range of cannon
        this.rangeTravelled = 0;
    }
}