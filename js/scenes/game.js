class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.speed = 100;
        this.player = null;
        this.cursors = null;
        this.ball = null;
        this.ground = null;
        this.pause_label = null;
    }

    preload (){	
		this.load.image('Personatge', '../resources/Personatge.png');
		this.load.image('SpriteMovimiento', '../resources/SpriteMovimiento.svg');
        this.load.image('Mapa', '../resources/MapaJPG.jpg');
        this.load.image('Pilota', '../resources/Ball2.png');
        this.load.image('Terra', '../resources/Terra.png');
	}
	
    create (){
	    
        this.background = this.add.image(400,300,'Mapa');

	    this.ground = this.physics.add.staticGroup();
		this.ground.create(0, 450, 'ground').setScale(100, 1).refreshBody();

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
        this.physics.add.collider(this.player, this.ground);this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.ball, this.ground);

        //Pausa
       
        const pauseButton = this.add.text(650, 0, 'Pause', { fill: '#fff' });
        pauseButton.setInteractive();

        const resumeButton = this.add.text(725, 0, 'Resume', { fill: '#fff' });
        resumeButton.setInteractive();

        pauseButton.on('pointerdown', () => { 
            this.ball.body.moves = false;
            this.player.body.moves = false;
        });

        resumeButton.on('pointerdown', () => { 
            this.ball.body.moves = true;
            this.player.body.moves = true;
        });
        
	}
	
	update (){
        if (this.cursors.left.isDown){
            this.player.flipX=true;
            this.player.setVelocityX(-250);
            //this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown){
            this.player.flipX=false;
            this.player.setVelocityX(250);
            //this.player.anims.play('right', true);
        }
        else{
            this.player.setVelocityX(0);
            //this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
            this.player.setVelocityY(-350);

          
    }
}
