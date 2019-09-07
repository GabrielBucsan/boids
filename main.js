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

        let quadTree = new QuadTree(new Rectangle(new Vector(), new Vector(canvas.size.x, canvas.size.y)), 4, c);

        for (let i = 0; i < boids.length; i++) {
            quadTree.insert(boids[i]);
        }

        // quadTree.render();

        for (let i = 0; i < boids.length; i++) {
            boids[i].draw();
            let nBoids = quadTree.query(new Circle(boids[i].position, boids[i].perceptionRadius));
            boids[i].flockAcceleration(nBoids);
            boids[i].update();
        }
    })();

});