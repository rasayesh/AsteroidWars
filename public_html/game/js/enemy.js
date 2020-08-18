class Enemy {
    constructor() {

        // sound vars
        this.spaceShipExplodeSound = new Howl({ src: ['/asteroid_game/sounds/ship_explode.mp3'] });

        // general vars
        this.isAlive = true;
        this.x = window.innerWidth;
        this.y = window.innerHeight / 2;
        this.width = parseInt($('#enemy')[0].width);
        this.height = parseInt($('#enemy')[0].height);

        // position
        this.verticalVelocity = 0;
        this.horizontalVelocity = -.5;
    }

    enemyDied() {
        this.spaceShipExplodeSound.play();
        this.isAlive = false;
        this.horizontalVelocity = 0;
    }

}