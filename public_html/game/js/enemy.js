class Enemy {
    constructor() {

        // enemy spawn sound
        this.spawnSound = new Howl({ src: ['/public_html/game/sounds/enemy_spawn.mp3'] });
        this.spawnSound.play();

        // enemy lazer gun sound
        this.shoot = new Howl({ src: ['/public_html/game/sounds/enemy_lazer_gun.mp3'] });

        // enemy ship explode sound
        this.spaceShipExplodeSound = new Howl({ src: ['/public_html/game/sounds/ship_explode.mp3'] });

        // health
        this.health = 100;

        // isHit
        this.isHit = false;

        // alive flag
        this.isAlive = true;

        // position x & y
        this.x = window.innerWidth;
        this.y = window.innerHeight / 2;

        // size
        this.width = parseInt($('#enemy')[0].width);
        this.height = parseInt($('#enemy')[0].height);

        // velocity x & y
        this.verticalVelocity = 0;
        this.horizontalVelocity = -.5;

        // ammo
        this.ammunition = [];
    }

    enemyDied() {
        this.spaceShipExplodeSound.play();
        this.isAlive = false;
        this.horizontalVelocity = 0;
    }

}