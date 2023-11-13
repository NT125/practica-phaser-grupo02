class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    preload() {
         //Precargando Sonidos
         this.load.audio('sonidoPerdiendo', ['/public/sound/error_006.ogg']);
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
        console.log(this.data)
        /* this.scoreText = this.add.text(16, 16, score, {
            fontFamily: "sans-serif",
            fontSize: "32px",
            fill: "#fff",
        }); */
        let sonidoPerdiendo = this.sound.add('sonidoPerdiendo');
        sonidoPerdiendo.play();
        this.add.image(400, 200, 'game-over');
        this.startButton = this.add.image(400, 450, 'buttonReset').setInteractive();
        this.startButton.on('pointerdown', () => {
            this.scene.start('Menu');
        });

    }
}
export default GameOver;