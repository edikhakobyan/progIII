var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Hunter extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
    }
    getNewCoordinates() {
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    move() {
        

        var fundCords = this.getDirections(0);
        var fundCords1 = this.getDirections(1);
        fundCords1 = fundCords1.concat(fundCords)
        var cord = random(fundCords1);
        


        if (cord) {
            var x = cord[0];
            var y = cord[1];
            
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

          
            this.x = x;
            this.y = y;

        }
       
    }
    eat() {

        var fundCords = this.getDirections(2);
        var cord = random(fundCords);

        
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            
            this.x = x;
            this.y = y;

            
            this.multiply++;

            
            this.energy++;

           

            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }
           
            if (this.multiply <= 2) {
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
    
           
            var huNnter = new Hunter(x, y);
            huntArr.push(huNnter);
    
            
            matrix[y][x] = 3;
            this.multiply = 0; 
        } 
    }
    die() {
       
        matrix[this.y][this.x] = 0;

        
        for (var i in huntArr) {
            if (this.x == huntArr[i].x && this.y == huntArr[i].y) {
                huntArr.splice(i, 1);
            }
        }
    }

}