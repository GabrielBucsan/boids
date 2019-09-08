$(document).ready(()=>{

    const canvas = new Canvas(400, 400);
    const c = canvas.context;

    const numBoids = 200;
    const boids = [];

    for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid({
            position: new Vector(canvas.size.x * Math.random(), canvas.size.y * Math.random()),
            context: c,
            sSize: {
                x: canvas.size.x,
                y: canvas.size.y
            }
        }))
    }

    // MAIN FUNCTION
    (function animate(){
        requestAnimationFrame(animate);
        canvas.update();

        for (let i = 0; i < boids.length; i++) {
            boids[i].draw();
            boids[i].flockAcceleration(boids);
            boids[i].update();
        }
    })();

});