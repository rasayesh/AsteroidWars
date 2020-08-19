class Enemy {
    constructor() {
        // pause flag, to pause shooting when game is paused
        this.pause = false;

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

        // variable attached to interval timer
        this.intervalVar;

        // ammo
        this.ammunition = [];
        this.initializeWeapons();

        // who destroyed this enemy
        this.destroyedByPlayer = false;
        this.destroyedByAsteroid = false;

    }

    initializeWeapons() {
        this.intervalVar = setInterval(() => {
            if (!this.pause) {
                for (let i = 0; i < 12; i++) {
                    let newBullet = new Bullet();
                    newBullet.isEnemyBullet = true;
                    newBullet.x = this.x;
                    newBullet.y = this.y;
                    newBullet.width = parseInt($('#enemyBullet')[0].width);
                    newBullet.height = parseInt($('#enemyBullet')[0].height);
                    newBullet.verticalVelocity = 0;
                    newBullet.horizontalVelocity = 0;
                    newBullet.angle = i;
                    this.ammunition.push(newBullet);
                    //this.shoot.play();
                }
            }
        }, 1000);


    }

    enemyDied() {
        clearInterval(this.intervalVar);
        this.spaceShipExplodeSound.play();
        this.isAlive = false;
        this.horizontalVelocity = 0;
    }

}