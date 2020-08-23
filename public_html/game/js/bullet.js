/**
 * @author Reza Munoz-Asayesh
 * @file bullet.js 
 * @project Asteroid Wars
 * @description This file, contains the class for the Bullet.
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
        this.range = 100000; // range of cannon
        this.rangeTravelled = 0;
    }
}