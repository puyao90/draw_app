function lineToTool() {
  this.icon = "assets/lineTo.jpg";
  this.name = "LineTo";
  //They are -1 to start with because we haven't started drawing yet.
  var startMouseX = -1;
  var startMouseY = -1;
  var drawing = false;

  this.draw = function () {
    //if it's the start of drawing a new line
    if (mouseIsPressed) {
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        loadPixels(); //save the current pixel Arrey
      } else {
        //update the screen with the saved pixels to hide any previous line between mouse pressed and released
        updatePixels();
        setGlobalStyle();
        line(startMouseX, startMouseY, mouseX, mouseY);
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
    addGlobalOptions();
  };
  this.unselectTool = function () {
    select(".options").html("");
  };
}
