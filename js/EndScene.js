import { convertMinutesSeconds } from './game.js';

export default class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    init(data) {
        // Pasing your last scene choice into this.choice for the actual scene
        this.score = data.score;
        this.time = data.time;
    }

    /**
     *   Load the game assets.
     */
    preload() {}

    /**
     *   Create the game objects (images, groups, sprites and animations).
     */
    create() {
        let r1 = this.add.rectangle(
            this.game.scale.gameSize.width / 2,
            this.game.scale.gameSize.height / 4,
            this.game.scale.gameSize.width / 3,
            this.game.scale.gameSize.height / 2.5,
            0xe55c90
        );

        let title = this.add.text(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height / 4, 'Bravo');
        title.setStyle({ fontSize: 32 });
        title.x = this.game.scale.gameSize.width / 2 - title.width / 2;
        title.y = this.game.scale.gameSize.height / 8;

        let scoreText = this.add.text(
            this.game.scale.gameSize.width / 2,
            this.game.scale.gameSize.height / 4,
            'Ton score : ' + this.score
        );

        scoreText.setStyle({ fontSize: 32 });
        scoreText.x = this.game.scale.gameSize.width / 2 - scoreText.width / 2;
        scoreText.y = (this.game.scale.gameSize.height * 1.5) / 7;

        let timeText = this.add.text(
            this.game.scale.gameSize.width / 2,
            this.game.scale.gameSize.height / 4,
            'Ton temps : ' + convertMinutesSeconds(this.time)
        );
        timeText.setStyle({ fontSize: 32 });
        timeText.x = this.game.scale.gameSize.width / 2 - timeText.width / 2;
        timeText.y = (this.game.scale.gameSize.height * 2) / 7;

        // Init restart button
        let restartButton = this.add.text(100, 100, 'Rejouer');
        restartButton.setPadding(10);
        restartButton.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        restartButton.setInteractive();
        restartButton.x = this.game.scale.gameSize.width / 2 - restartButton.width / 2;
        restartButton.y = (this.game.scale.gameSize.height * 3) / 5 - restartButton.height / 2;
        // Restart
        restartButton.on('pointerdown', () => {
            this.goToStartScene();
        });

        // var text = this.add.text(this.game.scale.gameSize.width / 2, this.game.scale.gameSize.height / 2, 'BRAVO');

        // //  Centers the text
        // text.setOrigin(0.5);
        // text.align = 'center';

        // //  Our font + size
        // text.font = 'Arial';
        // text.fontWeight = 'bold';
        // text.fontSize = 70;
        // text.fill = '#ffffff';

        // var textReflect = this.add.text(
        //     this.game.scale.gameSize.width / 2,
        //     this.game.scale.gameSize.height / 2 + 50,
        //     'BRAVO'
        // );

        // //  Centers the text
        // textReflect.setOrigin(0.5);
        // textReflect.align = 'center';
        // textReflect.setScale(-1);

        // //  Our font + size
        // textReflect.font = 'Arial';
        // textReflect.fontWeight = 'bold';
        // textReflect.fontSize = 70;

        // //  Here we create a linear gradient on the Text context.
        // //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
        // var grd = textReflect.context.createLinearGradient(0, 0, 0, text.canvas.height);

        // //  Add in 2 color stops
        // grd.addColorStop(0, 'rgba(255,255,255,0)');
        // grd.addColorStop(1, 'rgba(255,255,255,0.08)');

        // //  And apply to the Text
        // textReflect.fill = grd;
    }

    /**
     * Go to Start scene
     */
    goToStartScene() {
        this.scene.start('StartScene');
    }

    /**
     *  Update the scene frame by frame, responsible for move and rotate the bird and to create and move the pipes.
     */
    update() {}
}
