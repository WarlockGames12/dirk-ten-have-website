// JavaScript source code
class Star
{
    constructor(x, y, s, sp)
    {
        this.x = x;
        this.y = y;
        this.s = s;
        this.sp = sp;
    }

    display()
    {
        noStroke();
        fill(255, 255, 255);
        ellipse(this.x, this.y, this.s, this.sp);
    }

    move()
    {
        this.y = this.y + this.sp;
        if (this.y > height)
        {
            this.y = 0;
            this.x = random(width);
        }
    }
}