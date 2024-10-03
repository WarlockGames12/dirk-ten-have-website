// JavaScript source code
class Bullet
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.speed = 10;
    }

    update()
    {
        this.y -= this.speed;
    }

    draw()
    {
        fill(0, 255, 0);
        rect(this.x, this.y, 10, 20);
    }

    hits(enemy)
    {
        for (let i = 0; i < enemy.length; i++)
        {
            let enem = enemy[i];
            if (enem instanceof Enemy) {
                let d = dist(this.x, this.y, enem.x, enem.y);
                if (d < (enem.radius + 8))
                    return enem;
            }
            else if (enem instanceof SpecialEnemy) {
                if (this.x > enem.x && this.x < enem.x + 50 && this.y > enem.y && this.y < enem.y + 50)
                    return enem;
            }
            else if (enem instanceof Ufo)
            {
                if (this.x > enem.x && this.x < enem.x + 35 && this.y > enem.y && this.y < enem.y + 25)
                    return enem;
            }
        }
        return null;
    }
}