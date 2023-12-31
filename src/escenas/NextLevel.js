class NextLevel extends Phaser.Scene{
    constructor(){
        super("NextLevel");
    }
    preload() {
        // this.load.audio('cancion', '/public/sound/cancion.mp3')
        this.load.image('level-complete', '/public/img/level-complete.png');
        this.load.image('buttonNextLevel', '/public/img/next-level.png');
    }
    create() {

        this.add.image(400,300, 'level-complete');
        this.startButton = this.add.image(400,520, 'buttonNextLevel').setInteractive();
        this.startButton.on('pointerdown', () =>{
            this.scene.start('Escena2');
        });

    }
}
export default NextLevel;