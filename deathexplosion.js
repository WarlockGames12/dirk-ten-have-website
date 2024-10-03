import Sketch from 'sketch.js';

class DeathExplosion
{
    constructor(x, y)
    {
        this.particles = [];
        for (let i = 0; i < 30; i++)
            this.particles.push(new DeathParticles(x, y));
    }

    static updateAll()
    {
        // Filter out dead particles
        Sketch.particles = Sketch.particles.filter(p => p.isAlive());
        // Update all alive particles
        Sketch.particles.forEach(p => p.update());
    }

    static drawAll() {
        Sketch.particles.forEach(p => p.draw());
    }
}