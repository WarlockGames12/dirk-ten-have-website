// JavaScript source code
class EnemyBullet
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.speed = 8;
    }

    update()
    {
        this.y += this.speed;
    }

    draw()
    {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 8, 8);
    }

    hits(player)
    {
        if (this.y < 0 || this.y > height)
            return false; 

        let d = dist(this.x, this.y, player.x, 550);
        return d < player.radius + 8;
    }
}