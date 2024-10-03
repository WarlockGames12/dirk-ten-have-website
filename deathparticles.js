import Sketch from 'sketch.js';

// JavaScript source code
class DeathParticles
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.lifetime = 255;
        this.size = random(5, 12);
        this.speed = createVector(random(-2, 2), random(-2, 2));
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
        Sketch.particles = Sketch.particles.filter(p => p.isAlive());
        Sketch.particles.forEach(p => p.update());
    }

    static drawAll()
    {
        Sketch.particles.forEach(p => p.draw());
    }
}