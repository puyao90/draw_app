//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

var previousState;
var stateIndex = 0;
var states = [];
var CTRL_PRESSED = false;

function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  var c = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  c.parent("content");

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  //create a toolbox for storing the tools
  toolbox = new Toolbox();
  selectShape = new SelectShapebox();
  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  let mT1 = new MultipleToolsContainer("icon", "xxx");
  mT1.addTools([new LineToTool(), new RectangleTool(), new polygonTool()]);
  toolbox.addTool(mT1);

  // toolbox.addTool(new LineToTool());
  // toolbox.addTool(new RectangleTool());
  // toolbox.addTool(new polygonTool());
  // selectShape.addTool(new RectangleTool());
  // selectShape.addTool(new polygonTool());
  toolbox.addTool(new sprayCanTool());
  toolbox.addTool(new floodFillTool());
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new textTool());
  toolbox.addTool(new eraserTool());

  // toolbox.setInitstate(() => {
  //   colourP.set()
  // })
  background(255);
  frameRate(240);
  // save pixels Density for fillColorTool
  pixelDensity(1);
  window.pd = pixelDensity();
  bindFunctionUndoAndRedo();
}

function draw() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}

function keyPressed() {
  if (keyCode == CONTROL) {
    CTRL_PRESSED = true;
  }
  if (keyCode == 90 && CTRL_PRESSED) {
    undo();
  }
  if (keyCode == 89 && CTRL_PRESSED) {
    redo();
  }
}

function keyReleased() {
  if (keyCode == CONTROL) {
    CTRL_PRESSED = false;
  }
}

function saveState() {
  if (stateIndex < states.length) {
    console.log(">>>>>>");
    states = states.slice(0, stateIndex);
  }
  stateIndex++;
  // loadPixels();
  states.push(get());
  console.log("check point saved", stateIndex, states);
}

function undo() {
  console.log(
    "pressed ctrl+z, undo preivous operation",
    stateIndex - 1,
    states
  );
  if (!states || !states.length || stateIndex == 0) {
    console.log("already at init state!");
    return;
  }
  loadPixels();
  background(255);
  image(states[--stateIndex], 0, 0);
  // updatePixels();
}

function redo() {
  console.log("pressed ctrl+y, redo now, index", stateIndex, states);
  stateIndex++;
  if (stateIndex < states.length) {
    background(255);
    image(states[stateIndex], 0, 0);
  } else {
    console.log("no more records to restore");
    stateIndex = states.length - 1;
  }
}

function bindFunctionUndoAndRedo() {
  select("#undo").mouseClicked(function () {
    undo();
  });
  select("#redo").mouseClicked(function () {
    redo();
  });
}

var changed = false;
function mouseReleased() {
  if (changed && !isValidPos()) saveState();
  changed = false;
}

function isValidPos(x, y) {
  return x < width && y < height && x >= 0 && y >= 0;
}
