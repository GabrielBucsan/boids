class Boid{
    constructor({
        position: position,
        context: context,
        sSize: sSize
    }){
        this.size = {
            x: 7,
            y: 4
        };
        this.maxVelocityMag = 3;
        this.perceptionRadius = 40;
        this.separationRadius = Math.random() * 10 + 10;

        this.c = context;
        this.position = position;
        this.velocity = Vector.random();
        this.velocity.multiplyVector(this.maxVelocityMag);
        this.acceleration = new Vector();

        this.sSize = sSize;
        this.cycleOffset = Math.random();
    }

    update(){

        let randomVelocity = Vector.random();
        randomVelocity.multiplyVector(0.1);
        this.acceleration.add(randomVelocity);

        this.avoidBorders();

        this.velocity.add(this.acceleration);
        this.velocity.limitMagnitude(this.maxVelocityMag);
        this.position.add(this.velocity);

        // this.wrapPosition();

        this.acceleration = new Vector();
    }

    avoidBorders(){
        if(this.position.x > this.sSize.x - 20){
            this.acceleration.x -= 0.1;
        }
        if(this.position.x < 20){
            this.acceleration.x += 0.1;
        }
        if(this.position.y > this.sSize.y - 20){
            this.acceleration.y -= 0.1;
        }
        if(this.position.y < 20){
            this.acceleration.y += 0.1;
        }
    }

    wrapPosition(){
        if(this.position.x > this.sSize.x){
            this.position.x = 0;
        }
        if(this.position.x < 0){
            this.position.x = this.sSize.x;
        }
        if(this.position.y > this.sSize.y){
            this.position.y = 0;
        }
        if(this.position.y < 0){
            this.position.y = this.sSize.y;
        }
    }

    flockAcceleration(boids){
        let separation = new Vector();
        let alignment = new Vector();
        let cohesion = new Vector();

        let avgPosition = new Vector();
        let avgVelocity = new Vector();

        let count = 0;

        for (let i = 0; i < boids.length; i++) {
            if(this === boids[i]) continue;
            let distance = this.position.distance(boids[i].position);
            
            if(distance < this.perceptionRadius){
                // COHESION
                avgPosition.add(boids[i].position);

                // SEPARATION
                if(distance < this.separationRadius){
                    let aux = Vector.subtract(boids[i].position, this.position);
                    aux.divideVector(distance);
                    separation.subtract(aux);
                }

                // ALIGNMENT
                avgVelocity.add(boids[i].velocity);

                count++;
            }
        }

        if(count > 0){
            avgPosition.divideVector(count);
            cohesion = Vector.subtract(avgPosition, this.position);
            cohesion.divideVector(500);

            separation.divideVector(20);

            avgVelocity.divideVector(count);
            alignment = Vector.subtract(avgVelocity, this.velocity);
            alignment.divideVector(50);

            this.acceleration.add(separation);
            this.acceleration.add(alignment);
            this.acceleration.add(cohesion);
        }
    }

    draw(){
        this.c.save();
        this.c.translate(this.position.x, this.position.y);
        this.c.rotate(this.velocity.direction());

        this.c.beginPath();
        this.c.moveTo(0, 0);
        this.c.lineTo(-this.size.x, this.size.y / 2);
        this.c.lineTo(-0.75 * this.size.x, 0);
        this.c.lineTo(-this.size.x, -this.size.y / 2);
        this.c.closePath();

        // this.c.beginPath();
        // this.c.arc(0, 0, this.size / 4, 0, Math.PI * 2);
        
        this.c.fillStyle = 'cyan';
        this.c.fill();

        this.c.translate(-this.position.x, -this.position.y);
        this.c.restore();
    }
}