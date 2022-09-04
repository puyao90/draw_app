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
  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  let mT1 = new MultipleToolsContainer("icon", "xxx");
  mT1
    .setup()
    .addTools([new LineToTool(), new RectangleTool(), new polygonTool()]);
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
  // bindFunctionUndoAndRedo();

  select("#saveHistoryButton").mouseClicked(saveCurrentToHistory);
  select("#clearHistoryButton").mouseClicked(clearHistory);
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
  // if (keyCode == 90 && CTRL_PRESSED) {
  //   undo();
  // }
  // if (keyCode == 89 && CTRL_PRESSED) {
  //   redo();
  // }
  // CRTL + S =>>> SAVE
  if (keyCode == 83 && CTRL_PRESSED) {
    saveCurrentToHistory();
  }
  if (keyCode == 82 && CTRL_PRESSED) {
    saveCurrentToHistory();
  }
}

function keyReleased() {
  if (keyCode == CONTROL) {
    CTRL_PRESSED = false;
  }
}

var stateMap = {};

function clearHistory() {
  options = document.querySelector("#historyList");
  let selected = options[options.selectedIndex];
  options.selectedIndex = -1;
  for (var i = options.length - 1; i >= 0; i--) {
    console.log(i, options[i]);
    if (options[i] != selected) {
      options.remove(i);
    }
  }
  options.selectedIndex = 0;
}

function saveCurrentToHistory() {
  if (stateIndex < states.length) {
    console.log(">>>>>>");
    states = states.slice(0, stateIndex);
  }
  let state = get();

  let time = getCurrentTime();
  stateMap[time] = state;
  option = createElement("option").id(time).html(time);
  // options = document.querySelector("#historyList");
  // console.log(options.options);
  select("#historyList").child(option);
  // options.insertBefore(options.options[0], option.elt);
  options = document.querySelector("#historyList");

  options.insertBefore(option.elt, options[0]);

  stateIndex++;
  loadPixels();

  states.push(get());
  console.log("check point saved", stateIndex, states);
}

function isValidPos(x, y) {
  return x < width && y < height && x >= 0 && y >= 0;
}

function getCurrentTime() {
  let today = new Date();
  return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

function selectHistory(select) {
  var value = select.options[select.selectedIndex].value;
  if (value == "first") {
    background(255);

    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();
  } else {
    value = stateMap[value];
    console.log("load history > ", value);
    background(255);
    image(value, 0, 0);
  }
}
