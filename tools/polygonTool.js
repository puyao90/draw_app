function polygonTool() {
  this.icon = 'assets/polygon.png';
  this.name = 'polygon';
  var startMouseX = -1;
  var startMouseY = -1;
  var drawing = false;

  this.draw = function () {
    if (!this.initialized) {
      return;
    }

    this.npoints = select('#npoints').value();
    if (mouseIsPressed) {
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        loadPixels(); //save the current pixel Arrey
      } else {
        //update the screen with the saved pixels to hide any previous line between mouse pressed and released
        updatePixels();
        noFill();
        setGlobalStroke()
        radius = pow(pow(mouseX - startMouseX, 2) + pow(mouseY - startMouseY, 2), 0.5);
        polygon(startMouseX, startMouseY, radius, this.npoints);
      }
    } else if (drawing) {
      //save the pixels with the most recent line and reset the drawing bool and start locations
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };

  this.populateOptions = function () {
    select('.options').html(
      '<text>Enter npoints </text>  <input type="number" id="npoints" min="3" max="100" value=5>' +
        '<div id="small"></div>',
    );

    new p5((sketch) => {
      sketch.setup = () => {
        sketch.createCanvas(100, 100);
      };

      sketch.draw = () => {
        sketch.background(255);
        sketch.fill(255);
        polygon(50, 50, 20, this.npoints, sketch);
      };
    }, 'small');
  };

  this.unselectTool = function () {
    select('.options').html('');
  };
  this.initialized = true;
}

function polygon(x, y, radius, npoints, p) {
  if (p == undefined) {
    p = window;
  }
  let angle = TWO_PI / npoints;
  p.beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    p.vertex(sx, sy);
  }
  p.endShape(CLOSE);
}
