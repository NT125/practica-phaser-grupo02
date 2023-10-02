class Tutorial extends Phaser.Scene{
    constructor(){
        super("Tutorial");
    }
    preload() {
        // this.load.audio('cancion', '/public/sound/cancion.mp3')
        this.load.image('tutorial', '/public/img/tutorial.png');
        this.load.image('buttonIniciarTuto', '/public/img/iniciar-tutorial.png');
    }
    create() {

        this.add.image(400,300, 'tutorial');
        this.startButton = this.add.image(400,520, 'buttonIniciarTuto').setInteractive();
        this.startButton.on('pointerdown', () =>{
            this.scene.start('Escena1');
        });

    }
}
export default Tutorial;