class Player {
    constructor() {
        // player ship explode sound
        this.spaceShipExplodeSound = new Howl({ src: ['/public_html/game/sounds/ship_explode.mp3'] });

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

    engineBurst() {
        let arc = .01;
        this.verticalVelocity += -1 * arc * Math.sin(this.angle);
        this.horizontalVelocity += arc * Math.cos(this.angle);
    }

    turnLeft() {
        this.angle += .05;
        //if (this.angle > (Math.PI / 180) * 2) this.angle = this.angle - (Math.PI / 180 * 2);
    }

    turnRight() {
        this.angle -= .05;
        //if (this.angle < 0) this.angle = this.angle + (Math.PI / 180 * 2);
    }

    playerDied() {
        this.spaceShipExplodeSound.play();
        this.isAlive = false;
        this.isSafeToSpawn = false;
        this.verticalVelocity = 0;
        this.horizontalVelocity = 0;
        this.angle = 0; //radians
        this.resetToSpawnLocation();
    }

    resetToSpawnLocation() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }
}