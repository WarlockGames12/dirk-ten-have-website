// Screen Settings: 
var mode = 0;

// Player Stats: 
let player;
let playerImage;
let playerPressedKeys = {};
let bulletPlayer = [];
let shootCooldown = 100;
let cooldown = false;
let playerLives = 3;
let playerDamage;

// Enemy Stats: 
let enemy = [];
let numRows = 3;
let numCols = 5;
let enemySpacingX = 80;
let enemySpacingY = 100;
let currentFillNumber = 0;

// Enemy Shoots Settings: 
let bulletEnemy = [];
let randomShootTime = 100;
let speed = 1;
let particles = [];

// wave system
let wave = 1;
let countOne = false;
let waitBeforeNextWave = 250;

// Player Shoots Sound var:
let playerShootSound;
let theme;

// Enemy Dies sound var:
let enemyDies;

// score system
let score = 0;

//for stars
let num = 100;
let star = [num];

// Canvas Settings: 
let cnv;

// Custom Font Settings: 
let customFont;

// volume settings
let sliderVolume;

// Action SFX:
let afterWin;
let afterLose;
let playOnce = false;

let currentBullet;

let ufoImage;
let ufos = [];
let ufoSpawnTimer = 500;

let saveUrl;
let loadUrl;
let loadOnce;

let id;
let playersName = 'TestPlayer';
// const app = window.firebaseApp;

function preload()
{
    // Preload Font
    customFont = loadFont('assets/04B_30__.TTF');

    // Preload Image
    playerImage = loadImage('assets/Player.png');
    ufoImage = loadImage('assets/Ufo.png');

    // Preload Sound
    playerShootSound = loadSound('shoot.mp3');
    enemyDies = loadSound('enemyDeath.wav');
    playerDamage = loadSound('playerDeath.wav');
    afterWin = loadSound('afterWin.wav');
    afterLose = loadSound('AfterGameOver.wav');

    // Preload Theme
    theme = loadSound('faster-tempo-2020-03-22_-_8_bit_surf_-_fesliyanstudios.com_-_david_renda_1.mp3');
    // console.log('Firebase App:', app);

    saveUrl = 'https://oege.ie.hva.nl/~hofem/blok1/highscore/save.php?https://oege.ie.hva.nl/gd/blok1/highscore/save.php?game=345675634345756&name=Hal&score=15';
    loadUrl = 'https://oege.ie.hva.nl/gd/blok1/highscore/load.php?game=345675634345756';
}




function submitScore()
{
    httpDo(saveUrl, 'json', false, function (response)
    {
        playerName = response.name;
        score = response.score;
    });
}

function loadScore()
{
    httpGet(loadUrl, 'json', false, function (response)
    {
        // let limited = response.splice(0, 10);   
        if (!loadOnce)
        {
            loadOnce = true;
            response.sort((a, b) => b.score - a.score);

            textAlign(CENTER);
            textFont(customFont);
            textSize(32);
            text("HighScore:", width / 2, height / 2 - 40);

            let topScores = response.slice(0, 10);
            for (var i = 0; i < topScores.length; i++)
            {
                let highScore = topScores[i];
                textSize(24)
                text((i + 1) + ". " + highScore.name + " : " + highScore.score, width / 2, height / 2 + i * 20);
            }
        }
    });
}

async function saveData()
{
    // Create an random id 
    id = random(2500, 10000000000);

    // Get Database from this link
    const { getDatabase, ref, push } = await import('https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js');
    const database = getDatabase(app);

    // Create database with 3 things that need to be known, ID, NAME and HIGHSCORE
    const playerRef = ref(database, 'players/');
    const data = {
        playerId: id,
        playerName: playersName,
        score: score
    }

    push(playerRef, data).then(() => {
        console.log("Player Data Saved Succesfully: ", data);
    }).catch((error) => {
        console.error("Error saving player Data: ", data);
    })
}

async function loadData() {
    // Get Database from this link
    const { getDatabase, ref, get, push: firebasePush } = await import('https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js');
    const database = getDatabase(app);

    const playerRef = ref(database, 'players/');
    try {
        const snapshot = await get(playerRef);
        if (snapshot.exists()) {
            const playerData = snapshot.val();
            let highScores = [];

            for (let ids in playerData)
            {
                const scoreData =
                {
                    playerName: playerData[ids].playerName,
                    score: playerData[ids].score
                }

                await firebasePush(playerRef, scoreData).then(() => {
                    console.log("Score Data pushed Succesfully: ", scoreData);
                }).catch((error) => {
                    console.error("Error pushing score Data: ", error);
                });

                highScores.push(scoreData);
            }

            highScores.sort((a, b) => b.score - a.score);
            displayHighscores(highScores);
        }
        else
            console.log("No Data Available");
    }
    catch (error) {
        console.error("Error Loading Scores: " + error);
    }
}

function displayHighscores(highScore)
{
    if (!highScore || highScore.length === 0)
    {
        textSize(32);
        text('No high scores available.', width / 2, height / 2 - 60);
        return;
    }

    textAlign(CENTER);
    textSize(32);
    text(`High Score:`, width / 2, height / 2 - 60);

    for (var i = 0; i < highScore.length; i++)
    {
        let player = highScore[i];
        text(`${i + 1}. ${player.playerName}: ${player.highScore}`, width / 2, height / 2 - i * 20);
    }
}

function setup() 
{
    frameRate(60);
    cnv = createCanvas(800, 600);

    player = new Player(320);
    theme.loop();
    theme.setVolume(0.5);

    // Instantiate Stars
    for (let i = 0; i < num; i++)
        star[i] = new Star(random(width), random(height), random(1, 6), random(1, 6));

    sliderVolume = createSlider(0, 1, 0.5, 0.01);
    sliderVolume.position(625, 775);

    // Instantiate Enemies in rows and cols
    spawnInEnemiesInRows();
}

function CenterCanvas()
{
    // Put Canvas in middle of Screen constantly
    let canvasX = (windowWidth - width) / 2;
    let canvasY = (windowHeight - height) / 2;

    // Set canvas on position of Canvas X and Canvas Y
    cnv.position(canvasX, canvasY);
}

function Slider()
{
    // Function of setting the volume with the slider
    theme.setVolume(sliderVolume.value());
}

function draw()
{
    // Center canvas and make the background entirely black
    CenterCanvas();
    background(0, 0, 0);
    Slider();

    // Create an cooldown for the player after they shot an bullet
    if (cooldown && shootCooldown >= 0)
        shootCooldown -= 5;
    else if (cooldown && shootCooldown <= 0)
    {
        cooldown = false;
        shootCooldown = 100;
    }

    // Display stars and move them
    for (let i = 0; i < num; i++)
    {
        star[i].display();
        star[i].move();
    }

    switch (mode)
    {
        case 0:
            // Main Menu
            fill(255);
            textAlign(CENTER);
            textFont(customFont);
            textSize(32);
            text(`Alien Abductors`, width / 2, height / 2 - 20);
            textSize(16); 
            text(`Press Enter to Play`, width / 2, height / 2 + 20);
            text(`Press C to See Controls`, width / 2, height / 2 + 40);
            text(`Press J to See High Score`, width / 2, height / 2 + 60)
            numCols = 5;
            break;
        case 1:
            // Game

            // Create Enemy in Batch with rows and cols
            drawAndUpdateEnemy();
            handleEnemyShooting();

            // Ufo Thingy
            ufoSpawnTime();
            updateAndDrawUfo();

            // Update and draw Player
            player.update();
            player.draw();

            showUIText();

            // Use bullet behaviour
            for (let i = bulletPlayer.length - 1; i >= 0; i--)
            {
                let bullet = bulletPlayer[i];
                bullet.update();
                bullet.draw();

                let hitEnemy = bullet.hits(enemy);
                if (hitEnemy && enemy.length !== 1)
                {
                    if (hitEnemy instanceof Ufo)
                        score += 1;
                    else
                        score += 10; 
                    new DeathExplosion(bullet.x, bullet.y);
                    bulletPlayer.splice(i, 1);
                    enemy.splice(enemy.indexOf(hitEnemy), 1);

                    if (getAudioContext().state !== 'running')
                        getAudioContext().resume();

                    if (enemyDies.isLoaded())
                        enemyDies.play();
                }
                else if (hitEnemy && enemy.length === 1 && wave < 3)
                    mode = 4;
                else if (hitEnemy && enemy.length === 1 && wave === 3)
                    mode = 3;
            }

            if (bulletEnemy.includes(currentBullet))
            {
                currentBullet.update();
                currentBullet.draw();
                let hasBeenHit = currentBullet.hits(player);

                if (hasBeenHit && playerLives > 0)
                {
                    playerLives--;
                    new DeathExplosion(player.x, 440);
                    bulletEnemy.splice(currentBullet, 1);

                    if (getAudioContext().state !== 'running')
                        getAudioContext().resume();

                    if (playerDamage.isLoaded())
                        playerDamage.play();
                    break;
                }
                else if (currentBullet.y > height)
                    bulletEnemy.splice(currentBullet, 1);
            }

            // Remove bullets off-screen
            bulletPlayer = bulletPlayer.filter(bullet => bullet.y > 0);
            bulletEnemy = bulletEnemy.filter(enemyBullet => enemyBullet.y < height);

            DeathExplosion.updateAll();
            DeathExplosion.drawAll();

            if (playerLives <= 0)
            {
                mode = 2;
                numCols = 5;
            }
               
            break;
        case 2:
            // Game Over Screen
            fill(255);
            textAlign(CENTER);
            textFont(customFont);
            textSize(32);
            text(`Game Over`, width / 2, height / 2 - 20);
            textSize(16);
            text(`Press R to restart`, width / 2, height / 2 + 20);
            text(`High Score: ${score}`, width / 2, height / 2 + 40);
            numcols = 5;

            // Play One Game Over Sound
            if (!playOnce)
            {
                playOnce = true;
                // saveData();

                if (getAudioContext().state !== 'running')
                    getAudioContext().resume();

                if (afterLose.isLoaded())
                    afterLose.play();
            }

            wave = 0;
            break;
        case 3:
            // You won Screen
            fill(255);
            textAlign(CENTER);
            textFont(customFont);
            textSize(32);
            text(`You Won!`, width / 2, height / 2 - 20);
            textSize(16);
            text(`Press Escape to return to menu`, width / 2, height / 2 + 20);
            text(`High Score: ${score}`, width / 2, height / 2 + 40);
            text(`wave Count: ${wave}`, width / 2, height / 2 + 60);

            // Play one Win Sound
            if (!playOnce)
            {
                playOnce = true;
                // saveData();

                if (getAudioContext().state !== 'running')
                    getAudioContext().resume();

                if (afterWin.isLoaded())
                    afterWin.play();
            }

            break;
        case 4:
            // Wave Counter Screen
            fill(255);
            textAlign(CENTER);
            textFont(customFont);
            textSize(32);
            text(`Next Wave: ${wave}`, width / 2, height / 2 - 20);

            if (!countOne) {
                countOne = true;

                if (getAudioContext().state !== 'running')
                    getAudioContext().resume();

                if (afterWin.isLoaded())
                    afterWin.play();
                wave += 1;
                numCols += 1;
            }

            waitBeforeNextWave -= 1;

            if (waitBeforeNextWave <= 0) {
                destroyEveryEnemy();
                mode = 1;
                spawnInEnemiesInRows();
                waitBeforeNextWave = 250;
                countOne = false;
            }
            break;
        case 5:
            textAlign(CENTER);
            textFont(customFont);
            textSize(32);
            text(`Controls:`, width / 2, height / 2 - 20);
            textSize(16);
            text(`Press A, D or Left and Right to let the Player move`, width / 2, height / 2 + 20);
            text(`Press Space to Let the Player Shoot`, width / 2, height / 2 + 40);
            text(`Press Escape to Exit Controls Menu`, width / 2, height / 2 + 60);
            break;
        case 6:
            // displayHighscores();
            loadScore();
            break;
    }
}

function ufoSpawnTime()
{
    if (ufoSpawnTimer <= 0)
    {
        let randomSpeed = random(2, 5);
        enemy.push(new Ufo(width, randomSpeed));
        ufoSpawnTimer = random(300, 600);
    }
    ufoSpawnTimer -= 1;
}

function updateAndDrawUfo()
{
    for (var i = enemy.length; i >= 0; i--)
    {
        let ufo = enemy[i];
        if (ufo && typeof ufo.update === 'function' && ufo instanceof Ufo)
        {
            if (ufo.update()) 
                enemy.splice(i, 1);
            else 
                ufo.draw();
        }
    }
}

// Destroy Enemies after game is done
function destroyEveryEnemy()
{
    for (var i = 0; i < enemy.length; i++)
        enemy.splice(i, enemy.length);
    for (var i = 0; i < bulletPlayer.length; i++)
        bulletPlayer.splice(i, bulletPlayer.length);
    for (var i = 0; i < bulletEnemy.length; i++)
        bulletEnemy.splice(i, bulletEnemy.length);
    for (var i = 0; i < ufos.length; i++)
        ufos.splice(i, ufos.length);
    ufoSpawnTimer = random(300, 600);
}

// Enemy Behaviour
function drawAndUpdateEnemy()
{
    // Normally this boolean is set to false
    let hitEdge = false;

    for (var i = 0; i < enemy.length; i++)
    {
        // Update and draw all enemies in the array
        let currentEnemy = enemy[i]; 
        currentEnemy.update();
        currentEnemy.draw();

        // If the enemy hits the edge of the screen, they will go down and go the other way, same behaviour goes for the special enemy
        if (currentEnemy instanceof Enemy)
        {
            if (currentEnemy.x > width - currentEnemy.radius || currentEnemy.x < currentEnemy.radius)
                hitEdge = true;
        }
        else if (currentEnemy instanceof SpecialEnemy)
        {
            let rectWidth = 50;
            if (currentEnemy.x > width - rectWidth || currentEnemy.x < 0)
                hitEdge = true;
        }
    }

    for (var i = 0; i < enemy.length; i++)
    {
        // if Hit edge is true, use this function that is contained in the enemy length
        if (hitEdge && enemy[i] instanceof SpecialEnemy || hitEdge && enemy[i] instanceof Enemy)
             enemy[i].changeDir();
    }
}

// Enemy Shooting
function handleEnemyShooting()
{
    // TODO: Make this fucking work >:(
    for (var i = 0; i < enemy.length; i++)
    {
        if (enemy[i].shootTimer <= 0 && bulletEnemy.length < 1 && enemy[i] instanceof Enemy)
        {
            if (random() < 0.5)
            {
                // When enemy uses this method, this entire game just crashes, why, I don't know why, just fucking work, everything works normally, why and only you...
                enemy[i].shoot();
                enemy[i].shootTimer = random(250, 1000);
                if (getAudioContext().state !== 'running') getAudioContext().resume();
                if (playerShootSound.isLoaded()) playerShootSound.play();
            }
        }

        if (enemy[i].shootTimer > 0) 
            enemy[i].shootTimer -= 5;
        else
            console.log("Hoi")
    }
}

// Enemy Will spawn in rows and Cols
function spawnInEnemiesInRows()
{
    // Make an batch of enemies in rows and cols, with the number within the value of numRows and numCols
    for (var row = 0; row < numRows; row++)
    {
        for (var cols = 0; cols < numCols; cols++)
        {
            let x = cols * enemySpacingX + 100;
            let y = row * enemySpacingY + 100;

            // This map is an color map that would change the gradient of the color
            let colorIntensity = map(cols, 0, numCols - 1, 50, 75, 255);
            let enemyColor;

            // With each row, it would change the intensity of the gradient of an color scale, like 0 for red, 1 for green and 2 for blue...
            switch (row)
            {
                case 0:
                    enemyColor = color(colorIntensity, 0, 0);
                    break;
                case 1:
                    enemyColor = color(0, colorIntensity, 0);
                    break;
                case 2:
                    enemyColor = color(0, 0, colorIntensity);
                    break;
                default:
                    enemyColor = color(0, 0, 0);
                    break;
            }   

            if (cols % 2 === 0)
                enemy.push(new SpecialEnemy(x - 25, y - 25))
            else
            {
                // Make an new ShootTimer after being spawned
                let newEnemy = new Enemy(x, y, enemyColor);
                newEnemy.shootTimer = random(200, 1000);
                enemy.push(newEnemy);
            }
                
        }
    }
}

// Show the UI of the main game
function showUIText()
{
    // Show Score, Lives and Waves
    fill(255);
    textSize(12);
    text(`Score: ${score}`, 45, 20);
    text(`Lives: ${playerLives}`, 37, 40);
    text(`Wave: ${wave}`, 37, 60)
}

// After Key has been pressed
function keyPressed()
{
    playerPressedKeys[key.toLowerCase()] = true;
    playerPressedKeys[keyCode] = true; 

    // Player Shoot Command
    if (mode === 1 && key === ' ' && !cooldown)
    {
        cooldown = true;
        bulletPlayer.push(new Bullet(player.x - 5, 570));

        if (getAudioContext().state !== 'running') getAudioContext().resume();
        if (playerShootSound.isLoaded()) playerShootSound.play();
    }   

    if (mode === 0 && key === 'c')
        mode = 5;

    // Go to Main Menu
    if (mode === 1 && keyCode === ESCAPE || mode === 3 && keyCode === ESCAPE || mode === 5 && keyCode === ESCAPE || mode === 6 && keyCode === ESCAPE)
    {
        playerLives = 3;
        score = 0;
        playOnce = false;
        numCols = 5;
        wave = 1;
        mode = 0;
        loadOnce = false;
    }

    // From Main Menu to Game
    if (mode === 0 && key === 'Enter')
    {
        destroyEveryEnemy();
        mode = 1;
        playOnce = false;
        wave = 1;
        numCols = 5;
        spawnInEnemiesInRows()
    }

    if (mode === 0 && key === 'j')
        mode = 6;

    // Restart Game
    if (mode === 2 && key === 'r')
    {
        for (var i = 0; i < enemy.length; i++)
            enemy.splice(i, enemy.length);
        for (var i = 0; i < bulletPlayer.length; i++)
            bulletPlayer.splice(i, bulletPlayer.length);
        playerLives = 3;
        playOnce = false;
        score = 0;
        wave = 1;
        numCols = 5;
        mode = 1;
        spawnInEnemiesInRows()
    }
}

// Release Key
function keyReleased()
{
    delete playerPressedKeys[key.toLowerCase()];
    delete playerPressedKeys[keyCode];
}

class DeathParticles
{
    constructor(x,y)
    {
       this.x = x;
       this.y = y;
       this.lifetime = 255;
       this.size = random(5, 12);
       this.speed = createVector(random(-2,2), random(-2,2));
    }
    
    update()
    {
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.lifetime -= 5;
    }
    
    draw()
    {
        fill(255, this.lifetime);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
    
    isAlive()
    {
        return this.lifetime > 0;
    }
    
    static updateAll() 
    {
        particles = particles.filter(p => p.isAlive());
        particles.forEach(p => p.update());
    }
    
    static drawAll() 
    {
        particles.forEach(p => p.draw());
    }
}

class DeathExplosion
{
   constructor(x,y)
   {
       this.particles = [];
       for (let i = 0; i < 30; i++)
           this.particles.push(new DeathParticles(x,y));
   }
    
    static updateAll() 
    {
        // Filter out dead particles
        particles = particles.filter(p => p.isAlive());
        // Update all alive particles
        particles.forEach(p => p.update());
    }

    static drawAll() 
    {
        particles.forEach(p => p.draw());
    }
}