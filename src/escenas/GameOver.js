class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }
    preload() {
        // this.load.audio('cancion', '/public/sound/cancion.mp3')
        this.load.image('game-over', '/public/img/game-over.jpg');
        this.load.image('buttonReset', '/public/img/reset.jpg');
    }
    create() {
        // Agregando Sonido
        // this.sonido = this.sound.add('cancion')
        // const soundConfig = {
        //     volume: 1,
        //     loop: true
        // }

        this.add.image(400,300, 'game-over');
        this.startButton = this.add.image(400,450, 'buttonReset').setInteractive();
        this.startButton.on('pointerdown', () =>{
            this.scene.start('Menu');
        });

    }
}
export default GameOver;