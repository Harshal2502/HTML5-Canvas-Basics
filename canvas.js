var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// for(var i = 0; i < 500; i++){

//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }

//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = getRandomColor();
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 35;

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

})

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

var colorarray = [
    // /*1*/'azure',
    // /*2*/ '#95fe78',
    // /*3*/ '#f5ff6d',
    // /*4*/ '#BE8C63',
    // /*5*/'#ff6868',
    // /*6*/'#A85CF9',
    // /*7*/ 'cyan',
    // /*8*/ '#FCF69C',
    // /*9*/ '#55D8C1',
    // /*10*/ '#FF6FB5',
    // /*11*/ '#AB46D2',
    /*12*/ '#247881',
    /*13*/ '#43919B',
    /*14*/ '#30AADD',
    /*15*/ '#00FFC6'

    //COLOR COMBO - [1,5,6], [8.9.10.11]
];

function getRandomColor() {
    var color = colorarray[Math.floor(Math.random() * colorarray.length)]
    return color;
}

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = getRandomColor();

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.strokeStyle = 'black';
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.r > innerWidth || this.x - this.r < 0) this.dx = -this.dx;
        if (this.y + this.r > innerHeight || this.y - this.r < 0) this.dy = -this.dy;

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        if (mouse.x - this.x < 30 && mouse.x - this.x > -50
            && mouse.y - this.y < 30 && mouse.y - this.y > -50) {
            if (this.r < maxRadius) {
                this.r += 1;
            }
        }
        else if (this.r > r) {
            this.r -= 1;
        }

        this.draw();
    }
}

var array = []

function init() {

    array = [];

    for (var i = 0; i < 1000; i++) {

        var r = Math.random() * 4 + 1;
        var x = Math.random() * (innerWidth - r * 2) + r;
        var dx = (Math.random() - 0.5) * 2.5;

        var y = Math.random() * (innerHeight - r * 2) + r;
        var dy = (Math.random() - 0.5) * 2.5;

        array.push(new Circle(x, y, dx, dy, r));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < array.length; i++) {
        array[i].update();
    }
}

animate();
init()