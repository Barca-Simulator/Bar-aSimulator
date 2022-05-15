class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.speed = 100;
        this.player = null;
        this.cursors = null;
        this.ball = null;
        this.ground = null;
    }

    preload (){	
		this.load.image('Personatge', '../resources/Personatge.png');
		this.load.image('SpriteMovimiento', '../resources/SpriteMovimiento.svg');
        this.load.image('Mapa', '../resources/MapaJPG.jpg');
        this.load.image('Pilota', '../resources/Ball2.png');
        this.load.image('Terra', '../resources/Terra.png');
        this.load.image('Pausa', '../resources/Pausa.png');
        this.load.image('Play', '../resources/Play.png');
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

        //Menu Pausa
        
        gameIsPaused = false;
        
        pausa = this.add.tileSprite(600, 25, 'Pausa').setOrigin(0);
        pausa.setInteractive();
        pausa.aplha = 0.5
        resume = this.add.tileSprite(600, 25, 'Play').setOrigin(0);
        resume.setInteractive();
        resume.depth = 2;
        
        list = [pausa, resume];
        list.forEach(l => {
            l.setVisible(false);
            l.setActive(false);
        });

        pausa.on('pointerdown', function(){
            if (gameIsPaused===false) {
                gameIsPaused = true;
                pausa.setVisible(false);
                pause.setActive(false);
                list.forEach(l => {
                    l.setVisible(true);
                    l.setActive(true);
                });
            }
        });

        resume.on('pointerdown', function(){
            if (gameIsPaused===true) {
                gameIsPaused = false;
                pause.setVisible(true);
                pause.setActive(true);
                list.forEach(l => {
                    l.setVisible(false);
                    l.setActive(false);
                });
            }
        })
        
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
