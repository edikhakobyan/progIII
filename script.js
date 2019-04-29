var side = 35;
var xotArr = [];
var eatArr = [];
var huntArr = [];
var fireArr = []
var watArr = []
// var matrix = [
//     [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
//     [0, 1, 1, 1, 0, 2, 0, 0, 1, 0, 0, 1, 1, 1, 1, 3, 1],
//     [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
//     [0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 2, 1, 1, 3, 1, 1, 1],
//     [0, 1, 0, 0, 5, 1, 0, 0, 1, 0, 5, 1, 1, 1, 2, 1, 1],
//     [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
//     [4, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
//     [0, 0, 3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 2, 1, 1, 1, 1],
//     [0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 2, 1, 1, 1, 1, 1, 1],
//     [0, 2, 0, 0, 0, 1, 2, 0, 1, 2, 1, 1, 1, 2, 1, 1, 1],
//     [1, 0, 0, 0, 0, 1, 0, 1, 1, 2, 2, 1, 1, 1, 3, 1, 1],
//     [1, 0, 0, 1, 0, 1, 5, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1],
// ];


let matrix = []; // Մատրիցի ստեղծում
let rows = 20; // Տողերի քանակ
let columns = 30; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
for (let x = 0; x < columns; x++) {
let a = Math.floor(Math.random()*100);
if (a >= 0 && a < 20) {
matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
} 
if (a >= 20 && a < 40) {
matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
} 
else if (a >= 40 && a < 50) {
matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
} 
else if (a >= 50 && a < 70) {
matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
} 
else if(a >= 70 && a < 90) {
matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
} 
else if(a >= 90 && a < 100) {
matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
} 
}
}

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var hunter = new Hunter(x, y);
                huntArr.push(hunter);
            }
            else if (matrix[y][x] == 4) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
            }
            else if (matrix[y][x] == 5) {
                var water = new Water(x, y);
                watArr.push(water);
            }

        }
    }
}


function draw() {
  
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
                fill("violet");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("red");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill("blue");
                rect(j * side, i * side, side, side);
            }
        }




    }
    for (var i in xotArr) {
        xotArr[i].mul();
    }
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (var i in huntArr) {
        huntArr[i].eat();
    }
    for (var i in fireArr) {
        fireArr[i].eat();
    }
    for (var i in watArr) {
        watArr[i].eat();
    }
}
