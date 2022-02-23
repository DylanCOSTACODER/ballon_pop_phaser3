let balloons;
let delay = 1000;
let gravity = -50;
let score = 0;

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
        this.load.spritesheet('balloons', 'assets/ballon-sprite.png', {
            frameWidth: 128,
            frameHeight: 128,
        });
    }

    /**
     *   Create the game objects (images, groups, sprites and animations).
     */
    create() {
        // Init is horizontal boolean
        this.isHorizontal = this.game.config.width > this.game.config.height;
        // Init scale balloon width this will give a responsive ballon size
        this.scaleBalloon = this.isHorizontal ? this.game.config.width * 0.0005 : this.game.config.width * 0.001;
        balloons = this.physics.add.group();

        // Init timer for creating balloon
        this.timer = this.time.addEvent({
            delay: delay,
            callback: this.createBallon,
            callbackScope: this,
            loop: true,
            paused: false,
        });
    }

    /**
     * Here go the code to create a balloon
     */
    createBallon() {
        // Set a random gravity X
        var xGravity = Phaser.Math.Between(0, this.isHorizontal ? -gravity : -gravity / 10);

        // Instantiate balloon with equation of movement
        var balloon = balloons.create(
            Phaser.Math.Between(0 + 100, this.game.config.width - 100),
            this.game.config.height + 100,
            'balloons',
            0
        );

        // Initialize instance balloon
        balloon.allowGravity = true;
        balloon.setInteractive();

        // Set gravity to balloon instance
        balloon.setGravityY(gravity);
        balloon.setGravityX(balloon.body.x > this.game.config.width / 2 ? -xGravity : xGravity);

        // Interaction click in balloon
        balloon.once(
            'pointerdown',
            function() {
                balloon.destroy();
                score++;
            },
            this
        );
    }

    /**
     *  Update the scene frame by frame, responsible for move and rotate the bird and to create and move the pipes.
     */
    update() {
        balloons.getChildren().forEach(function(balloon) {
            if (balloon.body.y < 0) {
                // Destroy balloons of range
                balloon.destroy();
            }
        }, this);
    }
}