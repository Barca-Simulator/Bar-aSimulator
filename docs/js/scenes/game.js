class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.speed = 100;
        this.player = null;
        this.cursors = null;
        this.ball = null;
        this.ground = null;
        this.pause_label = null;
        this.enemy = null;
        this.Playerlabel = null;
        this.Enemylabel = null;
        this.playerScore = 0
        this.enemyScore = 0
        var saveObject = {
            player: this.player,
            enemy: this.enemy,
            ball: this.ball,
	        player_score: this.playerScore,
	        enemy_score: this.enemyScore
            
        };

    }

    preload (){	
		this.load.image('Personatge', '../resources/Personatge.png');
		this.load.image('SpriteMovimiento', '../resources/SpriteMovimiento.svg');
        this.load.image('Mapa', '../resources/MapaJPG.jpg');
        this.load.image('Pilota', '../resources/Ball2.png');
        this.load.image('Terra', '../resources/Terra.png');
        this.load.image('Enemic', '../resources/Enemic.png');

	}
	
    create (){
	    
        this.background = this.add.image(400,300,'Mapa');

	    this.ground = this.physics.add.staticGroup();
		this.ground.create(0, 400, '').setScale(100, 0).refreshBody();
        //Mur sobre les porteries
        this.ground.create(0, 190, '').setScale(5, 0).refreshBody();
        this.ground.create(800, 190, '').setScale(5, 0).refreshBody();

        this.player = this.physics.add.sprite(150 ,300,'Personatge').setCircle(78, 8);

        this.player.setScale(0.45);
		this.player.setCollideWorldBounds(true);
        

        this.enemy = this.physics.add.sprite(650 ,300,'Enemic').setCircle(78, 8);

        this.enemy.setScale(0.45);
		this.enemy.setCollideWorldBounds(true);

        this.ball = this.physics.add.sprite(400 ,200,'Pilota').setCircle(55, 0, -50);
        
        this.ball.setScale(0.5);
        this.ball.setCollideWorldBounds(true);
        
        this.ball.body.setBounce(1);
        


        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        

        this.cursors = this.input.keyboard.createCursorKeys();

        this.Playerlabel = this.add.text(340, 60, this.playerScore, { fill: '#fff' })
        this.Enemylabel = this.add.text(450, 60, this.playerScore, { fill: '#fff' })
        
        //Col·lisions
        this.physics.add.collider(this.player, this.ball);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.ball, this.ground);

        this.physics.add.collider(this.enemy, this.ball);
        this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.enemy, this.player);

        //Pausa i guardar partida
       
        const pauseButton = this.add.text(650, 0, 'Pause', { fill: '#fff' });
        pauseButton.setInteractive();

        const resumeButton = this.add.text(375, 245, 'Resume', { fill: '#fff' });
        resumeButton.setInteractive();
        resumeButton.visible = false;

        const saveButton = this.add.text(375, 275, 'Save', { fill: '#fff' });
        saveButton.setInteractive();
        saveButton.visible = false;

        const exitButton = this.add.text(375, 300, 'Exit', { fill: '#fff' });
        exitButton.setInteractive();
        exitButton.visible = false;

        pauseButton.on('pointerdown', () => { 
            this.ball.body.moves = false;
            this.player.body.moves = false;
            this.enemy.body.moves = false;
            resumeButton.visible = true;
            exitButton.visible = true;
            saveButton.visible = true;
        });

        saveButton.on('pointerdown', () => { 
            localStorage.setItem("save", JSON.stringify(saveObject));
        });

        resumeButton.on('pointerdown', () => { 
            this.ball.body.moves = true;
            this.player.body.moves = true;
            this.enemy.body.moves = true;
            resumeButton.visible = false;
            exitButton.visible = false;
            saveButton.visible = false;
        });

        exitButton.on('pointerdown', () => { 
            loadpage("../index.html");
        });

        //this.ball.body.moves = false;
        //this.player.body.moves = false;
        //this.enemy.body.moves = false;

	}
	
	update (){
       /*
        if(this.ball.body.touching.down){
            this.ball.body.setVelocityY(-350)
        }*/

        if (this.ball.body.position.x < 50 && this.ball.body.position.y > 200){
            this.ball.body.position.x = 375
            this.enemyScore += 1
            this.Enemylabel.setText(this.enemyScore)
            
            this.ball.body.position.x = 400
            this.ball.body.position.y = 200
            
            this.enemy.body.position.x = 650
            this.player.body.position.x = 150
        }
        else if (this.ball.body.position.x > 725 && this.ball.body.position.y > 200){
            this.ball.body.position.x = 375
            this.playerScore += 1
            this.Playerlabel.setText(this.playerScore)

            this.ball.body.position.x = 400
            this.ball.body.position.y = 200
            
            this.enemy.body.position.x = 650
            this.player.body.position.x = 150
        }
        
        if (this.cursors.left.isDown){
            this.player.flipX=true;
            this.player.setVelocityX(-200);
            //this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown){
            this.player.flipX=false;
            this.player.setVelocityX(200);
            //this.player.anims.play('right', true);
        }
        else{
            this.player.setVelocityX(0);
            //this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
            this.player.setVelocityY(-350);

        
        //Moviment Enemic
        if (this.ball.body.position.x > this.enemy.body.position.x){
            this.enemy.setVelocityX(200);
            //this.enemy.flipX=false;
            if(this.ball.body.position.x - this.enemy.body.position.x < 20 && this.enemy.body.touching.down){
                this.enemy.setVelocityY(-350);
            }
        }
        else{
            this.enemy.setVelocityX(-200);
            this.enemy.flipX=true;
            if(this.ball.body.position.y > this.ball.body.position.y && this.enemy.body.touching.down){
                this.enemy.setVelocityY(-350)
            }
        }

    

        if (this.ball.body.position.x < 20){
            this.ball.setVelocityX(300);
            this.ball.setVelocityY(-100);
        }

        if (this.ball.body.position.x > 750){
            this.ball.setVelocityX(-300);
            this.ball.setVelocityY(100);
        }

    }
}
