class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
         // Precargando Sonidos
         this.load.audio('sonidoPerdiendo', ['/public/sound/error_006.ogg']);
         this.load.image('game-over', '/public/img/game-over.jpg');
         this.load.image('buttonReset', '/public/img/reset.jpg');
    }

    create() {
        // Agregando Sonido
        let sonidoPerdiendo = this.sound.add('sonidoPerdiendo');
        sonidoPerdiendo.play();

        this.add.image(400, 200, 'game-over');

        // Creando el botón de reset
        this.resetButton = this.add.image(400, 450, 'buttonReset').setInteractive();
        
        // Configurando el evento de clic para recargar la página
        this.resetButton.on('pointerdown', () => {
            window.location.reload();
        });
    }
}

export default GameOver;
