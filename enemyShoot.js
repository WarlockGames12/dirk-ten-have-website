// JavaScript source code

class EnemyShoot extends Enemy
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.timer = random(200, 5000);
        this.bulletColor;
    }

    Shoot()
    {
        let bullet = new EnemyBullet(this.x, this.y);
        bulletEnemy.push(bullet);
    }

    update()
    {
        for (let bulletTest of enemyBullet)
        {
            bulletTest.update();
            bulletTest.draw();
        }
    }

    draw()
    {
        super.draw();
        this.timer--;

        if (this.timer < 0)
        {
            this.enemyShoot();
            this.timer = random(200, 5000);
        }
    }
}