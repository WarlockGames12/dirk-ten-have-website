// JavaScript source code
class Ufo
{
    constructor(x, speed)
    {
        this.x = x;
        this.speed = speed;
    }

    update()
    {
        this.x -= this.speed;

        if (this.x < -50)
            return true;
        return false;
    }

    draw()
    {
        fill(16, 150, 25);
        image(ufoImage, this.x - 18, 10, 35, 25);
    }
}