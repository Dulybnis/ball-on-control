// var keyNames = {
//     32: 'space',
//     37: 'left',
//     38: 'up',
//     39: 'right',
//     40: 'down',
//     13: 'enter',
//     16: 'shift',
//     18: 'alt',
//     48: '0',
//     49: '1',
//     50: '2',
//     51: '3',
//     52: '4',
//     53: '5',
//     54: '6',
//     55: '7',
//     56: '8',
//     57: '9',
//     90: 'z',
//     88: 'x',
//     67: 'c',
//     86: 'v'
// };

$('body').keydown(function(event) {
    // console.log(keyNames[event.keyCode]);
    console.log(event.keyCode);
});

// ball on control
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var speed = 5;
var rad = 10;

var circle = function(x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

var Ball = function() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = speed;
    this.ySpeed = 0;
};

Ball.prototype.move = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
        this.xSpeed = -this.xSpeed;
    }
    if (this.y < 0 || this.y > height) {
        this.ySpeed = -this.ySpeed;
    }
};

Ball.prototype.draw = function() {
    circle(this.x, this.y, rad, true);
};

Ball.prototype.setDirection = function(direction) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        speed = direction;
        console.log('speed = ' + speed)
        if (this.xSpeed >= 0) {
            this.xSpeed = speed;
        } else if (this.xSpeed < 0) {
            this.xSpeed = -speed;
        }
        if (this.ySpeed >= 0) {
            this.ySpeed = speed;
        } else if (this.ySpeed < 0) {
            this.ySpeed = -speed;
        }
    }
    if (direction === 'speedUp'){
        speed += 1;
        if (this.xSpeed > 0) {
            this.xSpeed = speed;
        } else if (this.xSpeed < 0) {
            this.xSpeed = -speed;
        }
        if (this.ySpeed > 0) {
            this.ySpeed = speed;
        } else if (this.ySpeed < 0) {
            this.ySpeed = -speed;
        }
    }
    if (direction === 'speedDown'){
        speed -= 1;
        if (this.xSpeed > 0) {
            this.xSpeed = speed;
        } else if (this.xSpeed < 0) {
            this.xSpeed = -speed;
        }
        if (this.ySpeed > 0) {
            this.ySpeed = speed;
        } else if (this.ySpeed < 0) {
            this.ySpeed = -speed;
        }
    }
    if (direction === 'sizeUp') {
        rad += 1;
    }
    if (direction === 'sizeDown') {
        if (rad <= 1) {
            rad = 1;
        } else {
        rad -= 1;
        }
    }
    if (direction === 'up') {
        this.xSpeed = 0;
        this.ySpeed = -speed;
    } else if (direction === 'down') {
        this.xSpeed = 0;
        this.ySpeed = speed;
    } else if (direction === 'left') {
        this.xSpeed = -speed;
        this.ySpeed = 0;
    } else if (direction === 'right') {
        this.xSpeed = speed;
        this.ySpeed = 0;
    } else if (direction === 'stop') {
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
};

var ball = new Ball;
var keyActions = {
    32: 'stop',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    90: 'speedDown',
    88: 'speedUp',
    67: 'sizeDown',
    86: 'sizeUp'
};

$('body').keydown(function(event) {
    var direction = keyActions[event.keyCode];
    ball.setDirection(direction);
    
});

setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    ball.draw();
    ball.move();
    ctx.strokeRect(0, 0, width,height);
}, 30);