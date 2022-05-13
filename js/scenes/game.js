class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.speed = 100;
        this.player = null;
        this.cursors = null;
    }

    preload (){	
		this.load.image('Personatge', '../resources/Personatge.png');
		this.load.image('SpriteMovimiento', '../resources/SpriteMovimiento.svg');
        this.load.image('Mapa', '../resources/MapaJPG.jpg');
	}
	
    create (){

        //Menu Pausa
        /*
        pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
            // When the paus button is pressed, we pause the game
            game.paused = true;
    
            // Then add the menu
            menu = game.add.sprite(w/2, h/2, 'menu');
            menu.anchor.setTo(0.5, 0.5);
    
            // And a label to illustrate which menu item was chosen. (This is not necessary)
            choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
            choiseLabel.anchor.setTo(0.5, 0.5);
        });
        */

        this.background = this.add.image(400,300,'Mapa');
   
	this.player = this.physics.add.sprite(150 ,370,'Personatge');
        this.player.setScale(0.5);
	this.player.setCollideWorldBounds(true);
	    
	this.ball = this.physics.add.sprite(250 ,370,'Pilota');
        this.ball.setScale(0.5);
        this.ball.setCollideWorldBounds(true);

        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        

        this.cursors = this.input.keyboard.createCursorKeys();
	    
	 //Col·lisions
        this.physics.add.collider(this.player, this.ball);

	}
	
	update (){
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            //this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(160);
            //this.player.anims.play('right', true);
        }
        else{
            this.player.setVelocityX(0);
            //this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
            this.player.setVelocityY(-330);
    
    }
}
