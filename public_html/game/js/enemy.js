class Enemy {
    constructor() {
        // sound vars
        this.spaceShipExplodeSound = new Howl({
            src: ['/asteroid_game/sounds/ship_explode.mp3'],
        });

        // general vars
        this.isAlive = false;
        this.x = window.innerWidth - 100;
        this.y = window.innerHeight / 2;
        this.width = parseInt($('#enemy')[0].width);
        this.height = parseInt($('#enemy')[0].height);
        this.horizontalVelocity = 0;
        this.angle = 0; //radians
    }

    enemyDied() {
        this.spaceShipExplodeSound.play();
        this.isAlive = false;
        this.isSafeToSpawn = false;
        this.horizontalVelocity = 0;
        this.angle = 0; //radians
        this.resetToSpawnLocation();
    }

}