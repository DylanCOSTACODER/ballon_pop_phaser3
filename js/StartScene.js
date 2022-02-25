export default class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    /**
     * Create the game objects (images, groups, sprites and animations).
     */
    create() {
        // Init text title menu
        //@TODO 120 with text width
        this.titleMenu = this.add.text(this.game.config.width / 2 - 135, 100, 'Balloon Pop', {
            fontSize: '40px',
            fill: '#000',
        });

        // Init ballon chase button
        let ballonChaseButton = this.add.text(100, 100, 'Chasse aux ballons');
        ballonChaseButton.setPadding(10);
        ballonChaseButton.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        ballonChaseButton.setInteractive();
        ballonChaseButton.x = this.game.config.width / 2 - ballonChaseButton.width / 2;
        ballonChaseButton.y = this.game.config.height / 4 - ballonChaseButton.height / 2;

        // Init color chase button
        let colorChaseButton = this.add.text(100, 100, 'Chasse aux couleurs');
        colorChaseButton.setPadding(10);
        colorChaseButton.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        colorChaseButton.setInteractive();
        colorChaseButton.x = this.game.config.width / 2 - colorChaseButton.width / 2;
        colorChaseButton.y = (this.game.config.height * 1.4) / 4 - colorChaseButton.height / 2;

        // Manage mode choice
        ballonChaseButton.on('pointerdown', () => {
            this.goToMainScene('balloons');
        });
        colorChaseButton.on('pointerdown', () => {
            this.goToMainScene('colors');
        });
    }

    /**
     * Go to Main scene
     */
    goToMainScene(choice) {
        this.scene.start('MainScene', { choice: choice });
    }
}