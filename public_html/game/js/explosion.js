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