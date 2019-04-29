
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0; //բազմացման գործակից

    }

    //շրջապատի հետազոտության մատրիցը
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
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

    //mul() Բազմացում
    mul() {
        this.multiply++;
        if (this.multiply >= 3) {

            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //Ավելացնում է նոր խոտ խոտերի զանգվածում
                var norXot = new Grass(x, y);
                xotArr.push(norXot);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }



}
class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 4;
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

          
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

           
            this.x = x;
            this.y = y;

        }
    }


   
    eat() {
       
        var fundCords = this.getDirections(1);
        var cord = random(fundCords);

       
        if (cord) {
            var x = cord[0];
            var y = cord[1];

         
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            
            this.x = x;
            this.y = y;

            
            this.multiply++;

           
            this.energy++;

           
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

            
            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);

            
            matrix[y][x] = 2;
           
        } 
    }

    
    die() {
       
        matrix[this.y][this.x] = 0;

       
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }

}
class Hunter {
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
class Fire {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 2;
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


