var boids;

function setup() {
  var width = window.innerWidth,
    height = window.innerHeight;
  createCanvas(width, height);
  background(51);
  boids = Array(100)
    .fill(null)
    .map(_ =>
      Boid.new({
        x: random(0, width),
        y: random(0, height)
      })
    );
}

function draw() {
  background(51);
  boids.forEach(b => {
    Boid.update(b, boids);
    Boid.draw(b);
  });
}

var INITIAL_FORCE = 20;
var ATTRACTION_DISTANCE = 120;
var REPULSION_DISTANCE = 20;
var MAX_SPEED = 3;
var SIZE = 5;

var Boid = {
  new: ({ x, y, vel, acc }) => ({
    pos: createVector(x, y),
    vel: vel || createVector(),
    acc: acc || p5.Vector.random2D().mult(INITIAL_FORCE),
    maxVel: MAX_SPEED + random(-(MAX_SPEED * 0.25), MAX_SPEED * 0.25),
    size: SIZE
  }),

  update(boid, boids) {
    var neighboursPosition = createVector();
    var neighbours = 0;

    var repulsion = createVector();
    boids.forEach(neighbour => {
      var dist = boid.pos.dist(neighbour.pos);
      if (neighbour !== boid) {
        if (dist < REPULSION_DISTANCE) {
          repulsion.add(
            neighbour.pos
              .copy()
              .sub(boid.pos)
              .mult(-0.01)
          );
        } else if (dist < ATTRACTION_DISTANCE) {
          neighboursPosition.add(neighbour.pos);
          neighbours++;
        }
      }
    });

    boid.acc.add(repulsion);
    if (neighbours > 0) {
      neighboursPosition.div(neighbours);
      boid.acc.add(
        neighboursPosition
          .copy()
          .sub(boid.pos)
          .div(100)
      );
    }

    boid.acc.limit(MAX_SPEED);
    boid.pos.add(boid.vel);
    boid.pos.x = (width + boid.pos.x) % width;
    boid.pos.y = (height + boid.pos.y) % height;
    boid.vel.add(boid.acc).limit(boid.maxVel * 2);
    boid.acc.mult(0);
    return boid;
  },

  draw(boid) {
    noStroke();
    // fill(232, 232, 0, 20)
    // ellipse(boid.pos.x, boid.pos.y, ATTRACTION_DISTANCE, ATTRACTION_DISTANCE)
    fill(232);
    ellipse(boid.pos.x, boid.pos.y, boid.size, boid.size);
  }
};
