class MathUtils{
    constructor(){}

    static getIntersectionPoint(line1, line2){
        let x1 = line1.x1;
        let x2 = line1.x2;
        let y1 = line1.y1;
        let y2 = line1.y2;
    
        let x3 = line2.x3;
        let x4 = line2.x4;
        let y3 = line2.y3;
        let y4 = line2.y4;
    
        let d = (x1 - x2)*(y3 - y4)-(y1 - y2)*(x3 - x4);
        if(d == 0) return;
        let t = ((x1 - x3)*(y3 - y4)-(y1 - y3)*(x3 - x4)) / d;

        if(t >= 0 && t <= 1){
            return new Vector(x1 + t*(x2 - x1), y1 + t*(y2 - y1));
        }

        return;    
    }
}

class Vector{
    constructor(x, y){
        if(x === undefined && y === undefined){
            this.x = 0;
            this.y = 0;
        }else if(y === undefined){
            this.x = x;
            this.y = x;
        }else{
            this.x = x;
            this.y = y;
        }
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }

    subtract(vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }

    distance(vector){
        return Math.abs(Math.sqrt((this.x - vector.x)*(this.x - vector.x) + (this.y - vector.y)*(this.y - vector.y)));
    }

    multiplyVector(number){
        this.x *= number;
        this.y *= number;
    }

    divideVector(number){
        this.x /= number;
        this.y /= number;
    }

    limitMagnitude(max){
        let currMag = Math.sqrt(this.x * this.x + this.y * this.y);
        if(currMag > max){
            this.divideVector(currMag);
            this.multiplyVector(max);
        }
    }

    direction(){
        let aux = Math.atan2(this.y, this.x);
        if(aux < 0) aux += 2 * Math.PI;
        return aux
    }

    static random(){
        return new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }

    static subtract(vector1, vector2){
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }
}

class Rectangle{
    constructor(pos, size){
        this.position = pos;
        this.size = size;
    }

    containsPoint(point){
        return (point.x >= this.position.x &&
                point.y >= this.position.y &&
                point.x <= this.position.x + this.size.x &&
                point.y <= this.position.y + this.size.y)
    }

    intersects(form){
        // it's a circle!
        if(form.radius){
            return (this.containsPoint(form.position) ||
                    form.containsPoint(new Vector(this.position.x, this.position.y)) ||
                    form.containsPoint(new Vector(this.position.x + this.size.x, this.position.y)) ||
                    form.containsPoint(new Vector(this.position.x, this.position.y + this.size.y)) ||
                    form.containsPoint(new Vector(this.position.x + this.size.x, this.position.y + this.size.y)));
        }
    }
}

class Circle{
    constructor(pos, rad){
        this.position = pos;
        this.radius = rad;
    }

    containsPoint(point){
        let x = point.x - this.position.x;
        let y = point.y - this.position.y;
        return ((x*x) + (y*y)) <= this.radius * this.radius;
    }
}