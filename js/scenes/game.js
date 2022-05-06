
class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
    }

    preload (){	
		this.load.image('SpriteQuieto', '../resources/SpriteQuieto.svg');
		this.load.image('SpriteMovimiento', '../resources/SpriteMovimiento.svg');
	}
	
    create (){

	    this.add.image(250 ,300,'SpriteQuieto');

	    this.add.image(250 ,450,'SpriteMovimiento');

	}
	
	update (){	}
}