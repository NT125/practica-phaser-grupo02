class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload() {
        // this.load.audio('cancion', '/public/sound/cancion.mp3')
        //Fondo
        this.load.image('background', '/public/img/FondoMenu.jpg');
        //Boton play
        this.load.image('button', '/public/img/BotonPlay.jpg');
    }
    create() {
        // Agregando Sonido
        // this.sonido = this.sound.add('cancion')
        // const soundConfig = {
        //     volume: 1,
        //     loop: true
        // }

        this.add.image(400,300, 'background');
        //hacer el boton interactivo
        this.startButton = this.add.image(400,400, 'button').setInteractive();
        //cuando el boton sea precionado pasar a Escena1
        this.startButton.on('pointerdown', () =>{
            this.scene.start('Escena1');
        });

    }
}
export default Menu;