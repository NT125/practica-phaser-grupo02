class Escena3 extends Phaser.Scene {
  constructor() {
    super("Escena3");
    this.score = 0;
    this.scoreText = "";
    this.cantStarts = 4;
  }

  preload() {
    // Precargando Sonidos
    this.load.audio('sonidoEstrella', ['/public/sound/confirmation_003.ogg']);
    this.load.audio('sonidoEstrellaFinal', ['/public/sound/confirmation_002.ogg']);
    this.load.audio('sonidoSalto', ['/public/sound/maximize_008.ogg']);

    // Precargando Imagenes
    this.load.image("sky3", "../../public/img/sky3.png");
    this.load.image("ground", "../../public/img/platform.png");
    this.load.image("star", "../../public/img/star.png");
    this.load.image("bomb", "../../public/img/bomb.png");
    this.load.image("ground2", "../../public/img/platform-copia.png")
    this.load.spritesheet("dude", "../../public/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // TODO: Todo lo que se va a agregar a la Escena
    this.add.image(400, 300, "sky3").setDisplaySize(800, 600);

    this.platforms = this.physics.add.staticGroup();

    this.platforms = this.physics.add.staticGroup();

    // Plataformas
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
    
    // Jugador
    this.player = this.physics.add.sprite(50, 500, "dude");
    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);

    // Animaciones del jugador
    this.createAnimations();

    // Colisiones entre jugador y plataformas
    this.physics.add.collider(this.player, this.platforms);

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();

    // Estrellas
    this.stars = this.physics.add.group({
      key: "star",
      repeat: this.cantStarts,
      setXY: { x: 300, y: 50, stepX: 90 },
    });

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Puntuación
    this.scoreText = this.add.text(16, 16, "Puntuación: 0", {
      fontFamily: "sans-serif",
      fontSize: "32px",
      fill: "#000",
    });

    // Bombas
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  update() {
    // Actualización de controles y animaciones del jugador
    this.updatePlayerControls();
  }

  createPlatform(x, y, key, scaleX = 1, scaleY = 1) {
    const platform = this.platforms.create(x, y, key).setScale(scaleX, scaleY).refreshBody();
    return platform;
  }

  createAnimations() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  updatePlayerControls() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
      let sonidoSalto = this.sound.add('sonidoSalto');
      sonidoSalto.play();
    }
  }

  collectStar(player, star) {
    let sonidoEstrella = this.sound.add('sonidoEstrella');
    let sonidoEstrellaFinal = this.sound.add('sonidoEstrellaFinal');

    if (this.stars.countActive(true) > 1) {
      sonidoEstrella.play();
    } else {
      sonidoEstrellaFinal.play();
    };

    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText("Puntuación: " + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        const randomX = Phaser.Math.Between(0, 500);
        child.enableBody(true, randomX, 0, true, true);
      });

      this.createBomb();
      this.createBomb();
    }
  }

  createBomb() {
    const x = this.player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    const bomb = this.bombs.create(x, 16, "bomb");

    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  hitBomb(player, bomb) {
    this.score = 0;
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");

    this.scene.start('GameOver');
  }
}

export default Escena3;
