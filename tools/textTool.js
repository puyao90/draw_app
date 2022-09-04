function textTool() {
  this.icon = 'assets/textTool.png';
  this.name = 'TextTool';
  var startMouseX = -1;
  var startMouseY = -1;
  var drawing = false;

  this.draw = function () {
    if (mouseIsPressed && mouseY <= canvasContainer.size().height) {
      startMouseX = mouseX;
      startMouseY = mouseY;
      drawing = true;
      updatePixels();
      textSize(select('#textSize').value());
      
      setGlobalFill()
      strokeWeight(2);
      text(select('#textBody').value(), startMouseX, startMouseY, 70, 80);
      mouseIsPressed = false;
    }
  };

  this.populateOptions = function () {
    select('.options').html(
      '<text>Enter your text: </text><input id=\'textBody\' value=\'text\'></input><br><text>Enter font size</text>  <input type="number" id="textSize" min="10" max="50" value=24>' +
        "<br><button id='save'>Save</button>" +
        "<br><button id='clear'>Clear</button>",
    );

    select('#save').mouseClicked(function () {
      loadPixels();
    });

    select('#clear').mouseClicked(function () {
      updatePixels();
    });
  };

  this.unselectTool = function () {
    updatePixels();
    //clear options
    select('.options').html('');
  };
}
