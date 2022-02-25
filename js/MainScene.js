let balloons;

/**
 * Convert rgb string into value number
 */
const colors = {
    Verts: { rgb: 'rgb(124,252,0)', value: 0 },
    Jaunes: { rgb: 'rgb(255,255,0)', value: 1 },
    Bleus: { rgb: 'rgb(0,0,255)', value: 2 },
    Oranges: { rgb: 'rgb(255,165,0)', value: 3 },
    Violets: { rgb: 'rgb(238,130,238)', value: 4 },
    Marrons: { rgb: 'rgb(126,51,0)', value: 5 },
    Noirs: { rgb: 'rgb(0,0,0)', value: 6 },
    Rouges: { rgb: 'rgb(255,0,0)', value: 7 },
    Lavandes: { rgb: 'rgb(230,230,250)', value: 8 },
};
/**
 * Make enum of color in function of rgb
 */

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
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
    }

    /**
     *   Create the game objects (images, groups, sprites and animations).
     */
    create() {
        // Delays for creating balloons speed
        this.delay = 1000;
        // Init maximum time
        this.generalTime = 100000;
        // Init is horizontal boolean
        this.isHorizontal = this.game.config.width > this.game.config.height;
        // Instantiate size and display
        this.ballonSize = 1;
        this.sizeText = this.add.text(275, 25, 'Size: ' + this.ballonSize, {
            fontSize: '20px',
            fill: '#000',
        });

        // Init scale balloon width this will give a responsive ballon size
        this.scaleBalloon = this.isHorizontal
            ? this.game.config.width * 0.0002 * this.ballonSize
            : this.game.config.width * 0.001 * this.ballonSize;
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

        // Instantiate score and display
        this.score = 0;
        this.scoreText = this.add.text(25, 25, 'Score: 0', {
            fontSize: '20px',
            fill: '#000',
        });

        // Instantiate speed and display
        this.speed = 5;
        this.speedText = this.add.text(150, 25, 'Speed: ' + this.speed, {
            fontSize: '20px',
            fill: '#000',
        });

        this.gravity = -this.speed * 10;

        // Instantiate color and display
        this.color = colors['Verts'].value;
        this.colorText = this.add.text(400, 25, 'Color:' + this.color, {
            fontSize: '20px',
            fill: '#000',
        });

        // Instantiate life and display
        this.life = 2;
        this.lifeText = this.add.text(525, 25, 'Life: ' + this.life, {
            fontSize: '20px',
            fill: '#000',
        });

        // Instantiate chrono and display
        this.chrono = 0;
        this.chronoText = this.add.text(650, 25, 'Life: ' + this.chrono, {
            fontSize: '20px',
            fill: '#000',
        });

        //Init general timer for end of scene
        if (this.generalTime) {
            this.generalTimer = this.time.addEvent({
                delay: this.generalTime,
                callback: this.goToStartScene,
                callbackScope: this,
                loop: false,
                paused: false,
            });
        }
    }

    /**
     * Here go the code to create a balloon
     */
    createBallon() {
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
        var xGravity = Phaser.Math.Between(0, this.isHorizontal ? -this.gravity : -this.gravity / 10);
        var balloon = balloons.create(
            Phaser.Math.Between(0 + 100, this.game.config.width - 100),
            this.game.config.height + 100,
            'balloons',
            colorBalloon
        );

        // Initialize instance balloon
        balloon.setScale(this.scaleBalloon);
        balloon.allowGravity = true;
        balloon.setInteractive();

        // Set gravity to balloon instance
        balloon.setGravityY(this.gravity);
        balloon.setGravityX(balloon.body.x > this.game.config.width / 2 ? -xGravity : xGravity);

        // Interaction click in balloon
        balloon.once(
            'pointerdown',
            function () {
                balloon.destroy();
                if (gameMode == 1) {
                    this.score++;
                } else {
                    if (this.color == colorBalloon) {
                        this.score++;
                    } else {
                        this.life--;
                    }
                }
                this.scoreText.setText('Score: ' + this.score);
            },
            this
        );

        // Create balloon geometry
        // var balloon = new Phaser.Geom.Circle(
        //     Phaser.Math.Between(0 + 100, this.game.config.width - 100),
        //     this.game.config.height + 100,
        //     10
        // );
        // this.add.circle(200, 200, 80, 0x6666ff);
        // graphics.fillCircleShape(balloon);

        // var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        // var test = new Phaser.Geom.Circle(50, 50, 50);
        // graphics.fillCircleShape(balloon);

        // Instantiate balloon with equation of movement
        // var balloon = balloons.create(, this.game.config.width - 100),
        //       this.game.config.height + 100,
        //     ' 'balloo's',
        //       0
        //   );
        //
        // Initialize instance balloon
        // Initialize instance balloon
        // var balloon = this.add.circle(200, 200, 80, 0x6666ff);
        // balloon.allowgravity = true;
        // balloon.setInteractive();

        // balloon.setGravityY(gravity);
        // balloon.setGravityX(balloon.body.x > this.game.config.width / 2 ? -xGravity : xGravity);

        // // Interaction click in balloon
        // balloon.once(
        //     'pointerdown',
        //     function () {
        //         balloon.destroy();
        //         score++;
        //     },
        //     this
        // );
    }

    /**
     * Go back to startScene
     */
    goToStartScene() {
        this.scene.start('StartScene');
    }

    /**
     *  Update the scene frame by frame, responsible for move and rotate the bird and to create and move the pipes.
     */
    update() {
        // Set Text to display change
        this.chronoText.setText('Chrono :' + this.chrono);
        this.lifeText.setText('Life :' + this.life);

        balloons.getChildren().forEach(function (balloon) {
            if (balloon.body.y < 0) {
                // Destroy balloons of range
                balloon.destroy();
            }
        }, this);

        if (this.life == 0) {
            this.goToStartScene();
        }
    }

    /**
     * Chrono manager
     */
    secondCounter() {
        this.chrono++;
    }
}
