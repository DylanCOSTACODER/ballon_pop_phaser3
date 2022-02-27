let balloons;

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    init(data) {
        // Pasing your last scene choice into this.choice for the actual scene
        this.choice = data.choice;
    }

    /**
     *   Load the game assets.
     */
    preload() {
        // Load balloon spritesheet
        this.load.spritesheet('balloons', 'assets/ballon-sprite.png', {
            frameWidth: 521,
            frameHeight: 521,
        });

        // Load sound
        this.load.audio('clickBalloon', ['./sounds/clickBalloon.wav']);
        this.load.audio('endGame', ['./sounds/endGame.wav']);
    }

    /**
     *   Create the game objects (images, groups, sprites and animations).
     */
    create() {
        // Sound manager
        this.clickBalloonSound = this.sound.add('clickBalloon');
        this.endGameSound = this.sound.add('endGame');

        // get Params
        this.getParams(true);
        // Delays for creating balloons speed
        this.delay = 1000;
        // Reset play values
        this.resetValues();
        // Init is horizontal boolean
        this.isHorizontal = this.game.scale.gameSize.width > this.game.scale.gameSize.height;
        // Init scale balloon width this will give a responsive ballon size
        balloons = this.physics.add.group();

        // Init generateBalloon for creating balloon
        this.generateBalloon = this.time.addEvent({
            delay: this.delay,
            callback: this.createBallon,
            callbackScope: this,
            loop: true,
            paused: false,
        });

        // Instantiate chrono
        this.timer = this.time.addEvent({
            delay: this.delay,
            callback: this.secondCounter,
            callbackScope: this,
            loop: true,
        });
    }

    resetValues() {
        // Life losts
        this.lifesLosts = 0;
        // Instantiate score and display
        this.score = 0;
        // Instantiate chrono and display
        this.chrono = 0;
    }

    /**
     * Here go the code to create a balloon
     */
    createBallon() {
        this.getParams(false);
        this.scaleBalloon = this.isHorizontal ?
            this.game.scale.gameSize.width * 0.0002 * this.ballonSize :
            this.game.scale.gameSize.width * 0.0001 * this.ballonSize;
        // Instantiate variables
        let colorBalloon;
        let gameMode;
        // Manage mode difference for instance balloon
        if (this.choice == 'balloons') {
            gameMode = 1;
        } else {
            gameMode = 2;
        }

        // Generate color target or random based on game mode
        colorBalloon = gameMode == 1 ? this.color : Phaser.Math.Between(0, 8);

        // Set a random gravity X
        var xGravity = Phaser.Math.Between(0, this.isHorizontal ? -this.gravity / 5 : -this.gravity / 10);
        var balloon = balloons.create(
            Phaser.Math.Between(0 + 100, this.game.scale.gameSize.width - 100),
            this.game.scale.gameSize.height + 100,
            'balloons',
            colorBalloon
        );

        // Initialize instance balloon
        balloon.setScale(this.scaleBalloon);
        balloon.allowGravity = true;
        balloon.setInteractive();

        // Set gravity to balloon instance
        balloon.setGravityY(this.gravity);
        balloon.setGravityX(balloon.body.x > this.game.scale.gameSize.width / 2 ? -xGravity : xGravity);

        // Interaction click in balloon
        balloon.once(
            'pointerdown',
            function() {
                balloon.destroy();
                this.clickBalloonSound.play();
                if (gameMode == 1) {
                    this.score++;
                } else {
                    if (this.color == colorBalloon) {
                        this.score++;
                    } else {
                        this.lifesLosts++;
                    }
                }
                document.getElementById('scoreDisplay').style.width = (this.score / this.maxScore) * 100 + '%';
                document.getElementById('chanceDisplay').innerHTML = this.life - this.lifesLosts;
            },
            this
        );
    }

    /**
     * Go back to startScene
     */
    goToStartScene() {
        this.scene.start('StartScene');
    }

    /**
     * Go back to endScene
     */
    goToEndScene() {
        this.scene.start('EndScene', { score: this.score, time: this.chrono });
    }

    /**
     *  Update the scene frame by frame, responsible for move and rotate the bird and to create and move the pipes.
     */
    update() {
        // Update params
        this.getParams(true);
        // this.life = document.getElementById('chanceRange').value;
        this.ballonSize = document.getElementById('sizeRange').value;
        this.scaleBalloon = this.isHorizontal ?
            this.game.scale.gameSize.width * 0.0002 * this.ballonSize :
            this.game.scale.gameSize.width * 0.0001 * this.ballonSize;

        // Update actual balloons
        if (balloons) {
            balloons.getChildren().forEach(function(balloon) {
                if (balloon) {
                    balloon.body.gravity.y = this.gravity;
                    balloon.setScale(this.scaleBalloon);
                    if (this.choice == 'balloons') {
                        balloon.setFrame(this.color);
                    }
                }

                if (balloon.body.y < -this.game.scale.gameSize.height * 0.1) {
                    if (balloon.frame.name == this.color && this.choice == 'colors') {
                        this.lifesLosts++;
                        console.log(this.lifesLosts);
                    }
                    // Destroy balloons of range
                    balloon.destroy();
                }
            }, this);
        }

        document.getElementById('chanceDisplay').innerHTML = this.life - this.lifesLosts;

        // Check if game over
        this.gameOver();
    }

    getParams(all) {
        this.ballonSize = document.getElementById('sizeRange').value;
        this.speed = document.getElementById('speedRange').value;
        this.life = document.getElementById('chanceRange').value;
        this.color = localStorage.getItem('Color') ? localStorage.getItem('Color') : 1;
        this.gravity = -this.speed * 10;
        if (all) {
            this.maximumTime = parseInt(document.getElementById('timeRange').value);
            this.maxScore = document.getElementById('scoreRange').value;
        }
    }

    /**
     * Chrono manager
     */
    secondCounter() {
        this.chrono++;
        document.getElementById('chronoDisplay').style.width = (this.chrono / this.maximumTime) * 100 + '%';
    }

    /**
     * Manage game over context
     */
    gameOver() {
        //Context life equal to zero
        if (
            (this.life - this.lifesLosts <= 0 && this.choice == 'colors') ||
            (this.maxScore <= this.score && this.maxScore != 0) ||
            (this.chrono >= this.maximumTime && this.maximumTime != 0)
        ) {
            this.goToEndScene();
            this.endGameSound.play();
        }
    }
}