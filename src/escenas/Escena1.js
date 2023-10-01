class Escena1 extends Phaser.Scene {
  constructor() {
    super("Escena1");
    this.score = 0;
    this.scoreText = "";
    this.cantStarts = 2;
  }
  preload() {
    //Precargando Imagenes
    this.load.image("sky", "../../public/img/sky.png");
    this.load.image("ground", "../../public/img/platform.png");
    this.load.image("star", "../../public/img/star.png");
    this.load.image("bomb", "../../public/img/bomb.png");
    this.load.spritesheet("dude", "../../public/img/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    // TODO: Todo lo que se va a agregar a la Escena
    this.add.image(400, 300, "sky");
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
    
    this.player = this.physics.add.sprite(100, 100, "dude");

    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);

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
    this.physics.add.collider(this.player, this.platforms);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Se agregan Estrellas
    this.stars = this.physics.add.group({
      key: "star",
      repeat: this.cantStarts,
      setXY: { x: Phaser.Math.Between(0, 600), y: 0, stepX: 70 },
    });
    // Rebote en el grupo de estrellas
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    // habilita las coliciones de las estrellas con la plataforma
    this.physics.add.collider(this.stars, this.platforms);

    // Superpocicion/Choque entre jugador y estella
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    // Para controlar el mensaje
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    //Agregar Bombas
    this.bombs = this.physics.add.group();
    this.bombs2 = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }
  update() {
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
    }
  }
  // revisando colisiones
  collectStar(player, star) {
    //Cuando se superpone jugador con estrella
    star.disableBody(true, true);
    //Mensaje, sumando puntos cada 10
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    //Hay estrellas en la pantalla?
    if (this.stars.countActive(true) === 0) {
      // Mostrando pantalla de victoria (del nivel)
      this.scene.start('NextLevel')
    }
  }
  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    this.scene.start("GameOver");
    this.score = 0;
  }
}
export default Escena1;
