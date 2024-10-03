// JavaScript source code
class SpecialEnemy
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = [0, 255, 0];
        this.shootTime = randomShootTime;
    }

    update()
    {
        this.x += this.speed;
         
        if (this.y > height)
            playerLives--;
    }

    changeDir()
    {
        this.speed = -this.speed;
        this.y += 50;
    }

    draw()
    {
        fill(255, 0, 0);
        rect(this.x, this.y, 50);
    }
}