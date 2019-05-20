function setup() {
    var socket = io();
    var side = 30;
    var matrix = [];
 
    let grassCount = document.getElementById('grassCount');
    let grassEaterCount = document.getElementById('grassEaterCount');
    
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        
        matrix = data.matrix;
        
        createCanvas(matrix[0].length * side, matrix.length * side)
        
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
                    fill('violet');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}