var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Fire extends LiveForm {
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
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

          
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

           
            this.x = x;
            this.y = y;

        }
    }


    
    eat() {
       

        var fundCords2 = this.getDirections(1); 
        var fundCords3 = this.getDirections(2);
        fundCords3 = fundCords3.concat(fundCords2,fundCords3)
        var cord = random(fundCords3);

        
        if (cord) {
            var x = cord[0];
            var y = cord[1];


            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;

 
            this.energy++;
            this.multiply++

          
            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }
            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }
            if (this.multiply >= 10) {
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


        var norkrak = new Fire(x, y);
        fireArr.push(norkrak);

  
        matrix[y][x] = 4;

    } 
}
die() {
   
    matrix[this.y][this.x] = 0;

    
    for (var i in fireArr) {
        if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
            fireArr.splice(i, 1);
        }
    }
}
}