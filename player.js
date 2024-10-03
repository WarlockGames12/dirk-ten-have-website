// JavaScript source code
class Player
{
    constructor(x)
    {
        this.x = x;
        this.speed = 4;
        this.radius = 23;
        this.playerPressedKeys = playerPressedKeys;
    }

    update()
    {
        let movePlayer = createVector(0, 0);

        if (this.playerPressedKeys['a'] || this.playerPressedKeys['A'] || this.playerPressedKeys[LEFT_ARROW])
            movePlayer.x -= this.speed;
        if (this.playerPressedKeys['d'] || this.playerPressedKeys['D'] || this.playerPressedKeys[RIGHT_ARROW])
            movePlayer.x += this.speed;

        movePlayer.setMag(this.speed);
        this.x += movePlayer.x;

        if (this.x < -this.radius) this.x = width + this.radius;
        else if (this.x > width + this.radius) this.x = -this.radius;
    }

    draw()
    {
        fill(16, 150, 25);
        image(playerImage, this.x - 18, 550, 35, 45);
    }
}