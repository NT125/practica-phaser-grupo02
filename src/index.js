import Escena1 from "./escenas/Escena1.js";
import Escena2 from "./escenas/Escena2.js";
import GameOver from "./escenas/GameOver.js";
import Menu from "./escenas/Menu.js";
import NextLevel from "./escenas/NextLevel.js";
import Tutorial from "./escenas/Tutorial.js";
import Escena3 from "./escenas/Escena3.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:300},
            debug: false
        }
    },
    scene:[Menu, Tutorial, Escena1, NextLevel,Escena2,GameOver,Escena3]
};

let game = new Phaser.Game(config);
