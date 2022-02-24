let balloons;
let delay = 1000;
let generalTime = 100000;
let gravity = -50;
let score = 0;
let color = 1;

/**
 * Convert rgb string into value number
 */
const colors = {
    'rgb(124,252,0)': { value: 0, name: 'Verts' },
    'rgb(255,255,0)': { value: 1, name: 'Jaunes' },
    'rgb(0,0,255)': { value: 2, name: 'Bleus' },
    'rgb(255,165,0)': { value: 3, name: 'Oranges' },
    'rgb(238,130,238)': { value: 4, name: 'Violets' },
    'rgb(126,51,0)': { value: 5, name: 'Marrons' },
    'rgb(0,0,0)': { value: 6, name: 'Noirs' },
    'rgb(255,0,0)': { value: 7, name: 'Rouges' },
    'rgb(230,230,250)': { value: 8, name: 'Lavandes' },
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
        // Init is horizontal boolean
        this.isHorizontal = this.game.config.width > this.game.config.height;
        // Init scale balloon width this will give a responsive ballon size
        this.scaleBalloon = this.isHorizontal ? this.game.config.width * 0.0001 : this.game.config.width * 0.001;
        balloons = this.physics.add.group();

        // Init timer for creating balloon
        this.timer = this.time.addEvent({
            delay: delay,
            callback: this.createBallon,
            callbackScope: this,
            loop: true,
            paused: false,
        });

        // Instantiate score and display
        this.score = 0;
        this.scoreText = this.add.text(25, 25, 'Score: 0', {
            fontSize: '20px',
            fill: '#000',
        });

        // Instantiate speed and display
        this.speedText = this.add.text(150, 25, 'Speed: 0', {
            fontSize: '20px',
            fill: '#000',
        });

        // Instantiate size and display
        this.sizeText = this.add.text(275, 25, 'Size: 0', {
            fontSize: '20px',
            fill: '#000',
        });

        // Instantiate color and display
        this.colorText = this.add.text(400, 25, 'Color: 0', {
            fontSize: '20px',
            fill: '#000',
        });

        //Init general timer for end of scene
        if (generalTime) {
            this.generalTimer = this.time.addEvent({
                delay: generalTime,
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
        // Set a random gravity X
        var xGravity = Phaser.Math.Between(0, this.isHorizontal ? -gravity : -gravity / 10);
        var balloon = balloons.create(
            Phaser.Math.Between(0 + 100, this.game.config.width - 100),
            this.game.config.height + 100,
            'balloons',
            0
        );

        // Initialize instance balloon
        balloon.setScale(this.scaleBalloon);
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
                this.score++;
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
        balloons.getChildren().forEach(function(balloon) {
            if (balloon.body.y < 0) {
                // Destroy balloons of range
                balloon.destroy();
            }
        }, this);
    }
}