grassArr = [];
grasseaterArr = [];
HunterArr = [];
waterArr = [];
fireArr = [];
matrix = []

let random = require('./modules/random');
function matrixGenerator(matrixSize, grass, grasseater, Hunter , water, fire) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); 
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grasseater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < Hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fire; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(10, 5, 1);





var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Hunter = require("./modules/Hunter.js");
var fire = require("./modules/fire.js");
var water = require("./modules/water.js");




var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);




function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grasseater = new GrassEater(x, y);
                grasseaterArr.push(grasseater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
        }
    }
}
creatingObjects();



function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grasseaterArr[0] !== undefined) {
        for (var i in grasseaterArr) {
            grasseaterArr[i].eat();
        }
    }
    if (Hunter[0] !== undefined) {
        for (var i in Hunter) {
            HunterArr[i].eat();
        }
    }
    if (water[0] !== undefined) {
        for (var i in water) {
            waterrArr[i].eat();
        }
    }
    if (fire[0] !== undefined) {
        for (var i in fire) {
            fireArr[i].eat();
        }
    }

    
    let sendData = {
        matrix: matrix
    }

    
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)