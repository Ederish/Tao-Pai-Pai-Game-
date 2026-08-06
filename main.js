var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    antialias: false,

    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 300 } }
    },

    scene: { preload, create, update }
};
var game = new Phaser.Game(config);

var cursors;
var player;
var bg;
var tronco;

function preload() 
{
    //----------------------pleyer-------------------//
    this.load.spritesheet('tao', 'Assets/Img/tao.png',
        { frameWidth: 42, frameHeight: 48 }
    );
    //----------------------pleyer-------------------//
    this.load.image('tronco', 'Assets/Img/Tronco.png');
    //----------------------Background-------------------//
    this.load.image('bg', 'Assets/Img/bg.jpeg');
}

function create() 
{
    //-----------------backgraund-------------//
    bg = this.add.tileSprite(400, 300, 0, 0, 'bg')
        .setScrollFactor(0)
        .setDisplaySize(800, 600);
    //--------------------  fisicas de la bola -------------------------------------//
    player = this.physics.add.sprite(400, 230, 'tao');
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);

    this.textures.get('tao').setFilter(Phaser.Textures.FilterMode.NEAREST);

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('tao', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'tao', frame: 3 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('tao', { start: 4, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    //-------------------- Tronco -------------------------------------//
    tronco = this.physics.add.staticGroup();
    tronco.create(400, 300, 'tronco').setDisplaySize(150, 20).refreshBody();
    this.physics.add.collider(tronco, player);
    //-------------------crear controles----------//
    cursors = this.input.keyboard.createCursorKeys();
}

function update() 
{
    //------efecto paralax
    bg.tilePositionX -= -5;
    //-----------------controles----------------//
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);
    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);
    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);
    player.anims.play('right');
}

if (cursors.space.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
}