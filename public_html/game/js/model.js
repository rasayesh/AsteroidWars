class Model {
    constructor() {
        // sounds vars
        this.asteroidExplodeSound = new Howl({
            src: ['/asteroid_game/sounds/asteroid_explode.mp3'],
        });

        // general vars
        this.gameOver = false;
        this.totalAsteroids = 0;
        this.totalAsteroidsDestroyed = 0;
        this.totalSmallAsteroidsDestroyed = 0;
        this.totalMediumAsteroidsDestroyed = 0;
        this.totalLargeAsteroidsDestroyed = 0;
        this.numPlayerLives = 3;
        this.playerScore = 0;
        this.staticAsteroidCount = 2;
        this.player = new Player();
        this.asteroidCount = 2;
        this.asteroidArray = [];
        this.initializeAsteroids();
        this.bulletsOnScreen = 0;
        this.bulletsArray = [];
    }

    initializeAsteroids() {
        for (let i = 0; i < this.asteroidCount; i++) {
            let newAsteroid = new Asteroid();
            let randVelocity = Math.random() * (.9 - .21) + .21;
            randVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            newAsteroid.verticalVelocity = randVelocity;
            randVelocity = Math.random() * (.9 - .21) + .21;
            randVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            newAsteroid.horizontalVelocity = randVelocity;
            newAsteroid.angle = (Math.random() * (Math.PI / 180) * 2);
            let playerX = this.player.x + (this.player.width / 2);
            let playerY = this.player.y + (this.player.height / 2);
            while (true) {
                let x = (Math.random() * window.innerWidth);
                let y = (Math.random() * window.innerHeight);
                if ((x < playerX - 125 || x > playerX + 125) && (y < playerY - 125 || y > playerY + 125)) { //------- bounds check.
                    newAsteroid.x = x;
                    newAsteroid.y = y;
                    break;
                }
            }
            this.totalAsteroids++;
            this.asteroidArray.push(newAsteroid);
        }
    }

    makeNewAsteroid(x, y, width, height, verticalVelocity, horizontalVelocity, angle, size) {
        let newAsteroid = new Asteroid();
        newAsteroid.x = x;
        newAsteroid.y = y;
        newAsteroid.width = width;
        newAsteroid.height = height;
        newAsteroid.verticalVelocity = verticalVelocity;
        newAsteroid.horizontalVelocity = horizontalVelocity;
        newAsteroid.angle = angle;
        if (size === 'small') newAsteroid.setSmall();
        if (size === 'medium') newAsteroid.setMedium();
        if (size === 'large') newAsteroid.setLarge();
        this.asteroidArray.push(newAsteroid);
        this.asteroidCount++;
        this.totalAsteroids++;
    }

    updateAsteroidList(index) {
        if (this.asteroidArray[index].large) {
            for (let i = 0; i < 2; i++) {
                let x = this.asteroidArray[index].x;
                let y = this.asteroidArray[index].y;
                let width = parseInt($('#asteroidMedium')[0].width);
                let height = parseInt($('#asteroidMedium')[0].height);
                let vertVelocity = Math.random() * (.9 - .21) + .21;
                vertVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                let horzVelocity = Math.random() * (.9 - .21) + .21;
                horzVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                let angle = (Math.random() * (Math.PI / 180) * 2);
                let size = 'medium';
                this.makeNewAsteroid(x, y, width, height, vertVelocity, horzVelocity, angle, size);
            }
            this.asteroidArray.splice(index, 1); // remove old asteroid.
            this.asteroidExplodeSound.play();
            this.asteroidCount--;
            this.totalLargeAsteroidsDestroyed += 1;
            this.totalAsteroidsDestroyed += 1
            this.playerScore += 10;
        } else if (this.asteroidArray[index].medium) {
            for (let i = 0; i < 4; i++) {
                let x = this.asteroidArray[index].x;
                let y = this.asteroidArray[index].y;
                let width = parseInt($('#asteroidSmall')[0].width);
                let height = parseInt($('#asteroidSmall')[0].height);
                let vertVelocity = Math.random() * (.9 - .21) + .21;
                vertVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                let horzVelocity = Math.random() * (.9 - .21) + .21;
                horzVelocity *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                let angle = (Math.random() * (Math.PI / 180) * 2);
                let size = 'small';
                this.makeNewAsteroid(x, y, width, height, vertVelocity, horzVelocity, angle, size);
            }
            this.asteroidArray.splice(index, 1); // remove old asteroid
            this.asteroidExplodeSound.play();
            this.asteroidCount--;
            this.totalMediumAsteroidsDestroyed += 1;
            this.totalAsteroidsDestroyed += 1
            this.playerScore += 50;
        } else if (this.asteroidArray[index].small) {
            this.asteroidArray.splice(index, 1);
            this.asteroidExplodeSound.play();
            this.asteroidCount--;
            this.totalSmallAsteroidsDestroyed += 1;
            this.totalAsteroidsDestroyed += 1
            this.playerScore += 100;
        } else console.log('ERROR: not sure what to do with this asteroid.');
    }

    addBullet() {
        let newBullet = new Bullet();
        newBullet.x = this.player.x + (this.player.width / 2);
        newBullet.y = this.player.y + (this.player.height / 2);
        newBullet.verticalVelocity = this.player.verticalVelocity;
        newBullet.horizontalVelocity = this.player.horizontalVelocity;
        newBullet.angle = this.player.angle;
        this.bulletsArray.push(newBullet);
        this.bulletsOnScreen++;
    }

    updateBulletPosition() {
        for (let i = 0; i < this.bulletsOnScreen; i++) {
            if (this.bulletsArray[i].rangeTravelled >= this.bulletsArray[i].range) {
                this.bulletsArray.splice(i, 1); // remove old asteroid.
                this.bulletsOnScreen--;
            } else {
                let shipDegree = (this.bulletsArray[i].angle * 180) / Math.PI;
                while (shipDegree > 360) { shipDegree -= 360; }
                while (shipDegree < -360) { shipDegree += 360; }
                if (shipDegree < 0) shipDegree = 360 + shipDegree;
                let remainingAngle = 90 - shipDegree;
                let x = (100 * Math.sin(remainingAngle * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
                let y = (100 * Math.sin(shipDegree * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
                this.bulletsArray[i].x += x / 10;
                this.bulletsArray[i].y -= y / 10;
                this.bulletsArray[i].rangeTravelled += Math.abs(x);
            }
        }
    }
}