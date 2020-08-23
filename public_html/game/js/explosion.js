/**
 * @author Reza Munoz-Asayesh
 * @file explosion.js 
 * @project Asteroid Wars
 * @description This file, contains the Enemy class for holding the explosion 
 * attributes that will be manipulated by the controller, and displayed when
 * an asteroid, enemy or the player is destroyed.
 * 
 */

class Explosion {
    constructor(x, y) {
        // columns & rows in sprite
        this.numCols = 5;
        this.numRows = 1;

        // Define the size of a frame
        this.frameWidth = 148;
        this.frameHeight = 148;

        // position x & y, where explosion is taking place.
        this.x = x;
        this.y = y;

        // determine explosion size
        this.isLargeAsteroid = false;
        this.isMediumAsteroid = false;
        this.isSmallAsteroid = false;
        this.isPlayer = false;
        this.isEnemy = false;
    }


}