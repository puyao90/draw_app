function sprayCanTool() {
  this.icon = 'assets/sprayCan.jpg';
  this.name = 'sprayCanTool';

  var points = 13;
  var spread = 10;
  this.draw = function () {
    //if the mouse is pressed paint on the canvas
    //spread describes how far to spread the paint from the mouse pointer
    //points holds how many pixels of paint for each mouse press.
    if (mouseIsPressed) {
      for (var i = 0; i < points; i++) {
        point(random(mouseX - spread, mouseX + spread), random(mouseY - spread, mouseY + spread));
      }
    }
  };
}
