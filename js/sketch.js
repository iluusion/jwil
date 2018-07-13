var canvas;
var maxParticles, particleBreakDistance, repelDist;
var particles = [];
var randColor = randColorGen();
var randSize = randSizeGen();

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);
    maxParticles = 100;
    repelDist = max(width, height) / 8;
    particleBreakDistance = max(width, height) / 50;

    while (particles.length < maxParticles) {

        obj = [createVector(random(width), random(height)), createVector(random(4) - 2, random(4) - 2)];
        particles.push(obj);
    }
}

function drawParticles() {

    colorMode(RGB, 255);
    noStroke();

    var mousePos = createVector(mouseX, mouseY);

    for (var i = 0; i < particles.length/2; i++) {

        var pos = particles[i][0];
        var speed = particles[i][1];
        fill(randColor);
        ellipse(pos.x, pos.y, randSize, randSize);
        pos.add(speed);

        var distToMouse = mousePos.dist(pos);

        if (distToMouse < repelDist) {
            var repel = createVector(pos.x - mousePos.x, pos.y - mousePos.y);
            var distFrac = (repelDist - distToMouse) / repelDist
            repel.setMag(50 * distFrac * distFrac);
            pos.add(repel);
        }

        if (pos.x > width) {

            pos.x -= width;
            pos.y += random(height / 10) - height / 20;
        }

        else if (pos.x < 0) {

            pos.x += width;
            pos.y += random(height / 10) - height / 20;
        }

        if (pos.y > height) {
            pos.y -= height;
            pos.x += random(width / 10) - width / 20;
        }
        else if (pos.y < 0) {
            pos.y += height;
            pos.x += random(width / 10) - width / 20;
        }
    }
}

function draw() {

    background(204, 244, 255);
    drawParticles();
    particleBreakDistance = min(particleBreakDistance + 1, width / 12);

}﻿

function mousePressed() {

  randColorGen();
  randColor = randColorGen();
  randSizeGen();
  randSize = randSizeGen();

}
function randSizeGen() {

  var randSize = Math.floor(Math.random() * 26) + 35;
  return randSize;
}

function randColorGen() {

    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + .2 + ')';
}

window.onresize = function() {

    canvas = createCanvas(window.innerWidth, window.innerHeight);
}
