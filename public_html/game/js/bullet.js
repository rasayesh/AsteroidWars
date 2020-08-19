/**
 * @author Reza Munoz-Asayesh
 * @file bullet.js 
 * @project Asteroid Miners
 * @description This program, is the class for the Bullet.
 * 
 */

class Bullet {
    constructor() {
        // owner
        this.isPlayerBullet = false;
        this.isEnemyBullet = false;

        // position
        this.x = 0;
        this.y = 0;

        // size
        this.width;
        this.height;

        // speed 
        this.verticalVelocity = 0;
        this.horizontalVelocity = 0;

        // angle
        this.angle = 0; //radians

        // range
        this.range = 10000; // range of cannon
        this.rangeTravelled = 0;
    }
}