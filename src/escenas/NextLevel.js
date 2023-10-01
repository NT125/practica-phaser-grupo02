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
        this.startButton = this.add.image(400,450, 'buttonNextLevel').setInteractive();
        this.startButton.on('pointerdown', () =>{
            this.scene.start('Escena1');
        });

    }
}
export default NextLevel;