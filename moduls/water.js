class Water {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 10;
        this.directions =[];
    }
    
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



   
    move() {
       
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

          
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

           
            this.x = x;
            this.y = y;

        }
    }


   
    eat() {
       
        var fundCords = this.getDirections(4);
        var cord = random(fundCords);

       
        if (cord) {
            var x = cord[0];
            var y = cord[1];

         
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            
            this.x = x;
            this.y = y;

            
            this.multiply++;

           
            this.energy++;

           
            

            
            if (this.multiply >=5) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            
            this.move();
            this.energy--;
            if (this.energy <= 0) { 
                this.die();
            }
        }
    }

    
    mul() {
        
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;

            
            var norJur = new Water(x, y);
            watArr.push(norJur);

            
            matrix[y][x] = 2;
           
        } 
    }

    
    die() {
       
        matrix[this.y][this.x] = 0;

       
        for (var i in watArr) {
            if (this.x == watArr[i].x && this.y == watArr[i].y) {
                watArr.splice(i, 1);
            }
        }
    }

}