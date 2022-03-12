$(document).ready(()=>{

    const canvasWidth = window.innerWidth - 350;
    const canvasHeight = window.innerHeight;

    const canvas = new Canvas(canvasWidth, canvasHeight);
    const c = canvas.context;

    const maxVelSlider = $('#maxVel');
    const percRadiusSlider = $('#percRadius');
    const sepRadiusSlider = $('#sepRadius');
    const showQuadTreeCheck = $('#quadTree')

    let showQuadTree = false;

    const numBoids = canvasWidth * canvasHeight / 1000;
    const boids = [];

    const parameters = {
        size: {
            x: 7,
            y: 4
        }
        ,maxVelocityMag: 3
        ,perceptionRadius: 40
        ,separationRadius: Math.random() * 10 + 10
    };

    for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid({
            position: new Vector(canvas.size.x * Math.random(), canvas.size.y * Math.random()),
            context: c,
            sSize: {
                x: canvas.size.x,
                y: canvas.size.y
            },
            parameters: parameters
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

        if (showQuadTree) {
          quadTree.render();
        }

        for (let i = 0; i < boids.length; i++) {
            boids[i].draw();
            let nBoids = quadTree.query(new Circle(boids[i].position, boids[i].perceptionRadius));
            boids[i].flockAcceleration(nBoids);
            boids[i].update();
        }
    })();

    $('#maxVel').on('input', function () {
        updateParameters();
    });
    $('#percRadius').on('input', function () {
        updateParameters();
    });
    $('#sepRadius').on('input', function () {
        updateParameters();
    });
    $('#quadTree').on('input', function () {
        updateParameters();
    });

    function updateParameters(){
      showQuadTree = showQuadTreeCheck[0].checked;
        for (let i = 0; i < boids.length; i++) {
            boids[i].maxVelocityMag = Number(maxVelSlider[0].value);
            boids[i].perceptionRadius = Number(percRadiusSlider[0].value);
            boids[i].separationRadius = Math.random() * Number(sepRadiusSlider[0].value) + Number(sepRadiusSlider[0].value);
        }
    }

});