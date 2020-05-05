$(document).ready(()=>{

    const canvas = new Canvas(1000, 600);
    const c = canvas.context;

    const maxVelSlider = $('#maxVel');
    const percRadiusSlider = $('#percRadius');
    const sepRadiusSlider = $('#sepRadius');

    const numBoids = 100;
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

        for (let i = 0; i < boids.length; i++) {
            boids[i].draw();
            boids[i].flockAcceleration(boids);
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

    function updateParameters(){
        for (let i = 0; i < boids.length; i++) {
            boids[i].maxVelocityMag = Number(maxVelSlider[0].value);
            boids[i].perceptionRadius = Number(percRadiusSlider[0].value);
            boids[i].separationRadius = Math.random() * Number(sepRadiusSlider[0].value) + Number(sepRadiusSlider[0].value);
        }
    }

});