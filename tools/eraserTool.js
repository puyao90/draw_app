function eraserTool() {
  this.icon = "assets/eraser.png";
  this.name = "EraserTool";
  var startMouseX = -1;
  var startMouseY = -1;

  this.drawOutline = function (p, x, y, size) {
    if (p == undefined) {
      p = window;
    }
    let arr =color(selectedColor).levels;
    p.fill(arr[0],arr[1],arr[2], opacity);
    p.updatePixels();
    p.stroke(1, 1, 1);
    // p.fill(1, 1, 1);
    p.rect(x, y, size, size);
  };

  this.draw = function () {
    size = select("#eraserSize").value();
    startMouseX = mouseX - size / 2;
    startMouseY = mouseY - size / 2;
    this.drawOutline(window, startMouseX, startMouseY, size);
    if (mouseIsPressed && mouseY <= canvasContainer.size().height) {
      // begin erase
      updatePixels();
      selectedColor.levels
      setGlobalFill()
      noStroke();
      rect(startMouseX, startMouseY, size, size);
      loadPixels();
      // end erase and then show the erase outline

      this.drawOutline(window, startMouseX, startMouseY, size);
    }
  };

  this.populateOptions = function () {
    select(".options").html(
      '<text>Enter earser size</text>  <input type="number" id="eraserSize" min="10" max="80" value=24> <div id="small"></div>'
    );

    new p5((sketch) => {
      sketch.setup = () => {
        sketch.createCanvas(100, 100);
        sketch.background(255);
      };

      sketch.draw = () => {
        if (select("#eraserSize")) {
          size = select("#eraserSize").value();
          sketch.fill(255);
          this.drawOutline(sketch, 50 - size / 2, 50 - size / 2, size);
        }
      };
    }, "small");
  };

  this.unselectTool = function () {
    select(".options").html("");
  };
}
