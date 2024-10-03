// JavaScript source code
class Enemy
{
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.speed = speed;
        this.shootTimer = randomShootTime;
        this.color = color;
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

    shoot()
    {
        currentBullet = new EnemyBullet(this.x, this.y);
        bulletEnemy.push(currentBullet);
        // console.log(bullet);
    }

    draw()
    {
        fill(this.color);
        circle(this.x, this.y, this.radius * 2);
    }

    reset()
    {
        this.x = random(width);
        this.y = random(height / 2);
    }
}