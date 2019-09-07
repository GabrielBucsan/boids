class QuadTree{
    constructor(r, n, c){
        this.boundary = r;
        this.capacity = n;
        this.points = [];
        this.divided = false;
        this.c = c;
    }

    insert(point){
        if(!this.boundary.containsPoint(point.position)) return false;
        if(this.points.length < this.capacity){
            this.points.push(point);
            return true;
        }else{
            if(!this.divided){
                this.subdivide();
            }

            if(this.nw.insert(point));
            else if(this.ne.insert(point));
            else if(this.sw.insert(point));
            else if(this.se.insert(point));
            return true;
        }
    }

    subdivide(){
        let childSize = new Vector(this.boundary.size.x / 2, this.boundary.size.y / 2);
        let nwPos = new Vector(this.boundary.position.x, this.boundary.position.y);
        this.nw = new QuadTree(new Rectangle(nwPos, childSize), this.capacity, this.c);
        let nePos = new Vector(this.boundary.position.x + this.boundary.size.x / 2, this.boundary.position.y);
        this.ne = new QuadTree(new Rectangle(nePos, childSize), this.capacity, this.c);
        let swPos = new Vector(this.boundary.position.x, this.boundary.position.y + this.boundary.size.y / 2);
        this.sw = new QuadTree(new Rectangle(swPos, childSize), this.capacity, this.c);
        let sePos = new Vector(this.boundary.position.x + this.boundary.size.x / 2, this.boundary.position.y + this.boundary.size.y / 2);
        this.se = new QuadTree(new Rectangle(sePos, childSize), this.capacity, this.c);
        this.divided = true;
    }

    query(range){
        let points = [];

        if(!this.boundary.intersects(range)) return points;

        for (let i = 0; i < this.points.length; i++) {
            if(range.containsPoint(this.points[i].position)) points.push(this.points[i]);
        }

        if(this.divided){
            points = points.concat(this.nw.query(range));
            points = points.concat(this.ne.query(range));
            points = points.concat(this.sw.query(range));
            points = points.concat(this.se.query(range));
        }
        return points;
    }

    render(){
        this.c.strokeStyle = 'red';
        this.c.beginPath();
        this.c.rect(this.boundary.position.x, this.boundary.position.y, this.boundary.size.x, this.boundary.size.y);
        this.c.stroke();

        if(this.divided){
            this.nw.render();
            this.ne.render();
            this.sw.render();
            this.se.render();
        }
    }

}