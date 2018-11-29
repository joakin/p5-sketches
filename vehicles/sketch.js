var width,
  height,
  vs,
  off = 0;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
  background(51);
  vs = Array(500)
    .fill(null)
    .map(() => Vehicle.new());
  noStroke();
}

function draw() {
  off += 0.01;

  background(51);

  for (var i = 0; i < vs.length; i++) {
    Vehicle.update(vs[i], off);
    Vehicle.draw(vs[i]);
  }

  fill(255, 255, 255, 70);
  text(Math.round(frameRate()), 10, 30);
}

var Vehicle = {
  size: 5,
  new() {
    return {
      pos: createVector(
        random(width / 3, (width / 3) * 2),
        random(height / 3, (height / 3) * 2)
      ),
      vel: createVector(0, 1),
      off: random(0, 2000)
    };
  },
  update(v, t) {
    v.pos.add(v.vel);
    v.vel.rotate(noise(v.off + t) - 0.5);
  },
  draw(v) {
    push();
    fill(255);
    translate(v.pos.x, v.pos.y);
    line(0, 0, v.vel.x * 20, v.vel.y * 20);
    rotate(v.vel.heading() + 3 * HALF_PI);
    triangle(0, Vehicle.size * 3, Vehicle.size, 0, -Vehicle.size, 0);
    pop();
  }
};
