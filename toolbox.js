//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox(parent = "sidebar") {
  var self = this;
  this.parent = parent;
  this.tools = [];
  this.selectedTool = null;

  var toolbarItemClick = function () {
    //remove any existing borders
    // var items = selectAll(".sideBarItem");
    // for (var i = 0; i < items.length; i++) {
    //   items[i].style("border", "0");
    // }

    var toolName = this.id().split("sideBarItem")[0];
    // self.resetInitstate();
    self.selectTool(toolName);

    //call loadPixels to make sure most recent changes are saved to pixel array
    loadPixels();
  };

  //add a new tool icon to the html page
  var addToolIcon = function (icon, name) {
    var sideBarItem = createDiv(
      "<img style='background-color:white' src='" + icon + "'>"
    );
    sideBarItem.class("sideBarItem");
    sideBarItem.id(name + "sideBarItem");
    sideBarItem.parent(self.parent);
    sideBarItem.mouseClicked(toolbarItemClick);
  };

  this.refreshIcon = function (toolContainer, tool) {
    select("#" + toolContainer.name + "sideBarItem").child()[0].src = tool.icon;
  };

  // if won't invoker, tools like eraser will modfiy fill and stroke, make everything invisable
  //   this.resetInitstate = function () {
  //     this.reset();
  //   };

  //   this.setInitstate = function (f) {
  //     this.reset = f;
  //   };

  //add a tool to the tools array
  this.addTool = function (tool) {
    //check that the object tool has an icon and a name
    if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
      alert("make sure your tool has both a name and an icon");
    }
    this.tools.push(tool);
    addToolIcon(tool.icon, tool.name);
    if (tool.drawSmallFloatIcon) {
      // console.log(tool);
      tool.drawSmallFloatIcon();
    }
    //if no tool is selected (ie. none have been added so far)
    //make this tool the selected one.
    if (this.selectedTool == null) {
      this.selectTool(tool.name);
    }
    tool.toolBox = this;
  };

  this.selectTool = function (toolName) {
    //search through the tools for one that's name matches
    //toolName

    for (var i = 0; i < this.tools.length; i++) {
      if (this.tools[i].name == toolName) {
        // saveState()
        //if the tool has an unselectTool method run it.
        if (
          this.selectedTool != null &&
          this.selectedTool.hasOwnProperty("unselectTool")
        ) {
          this.selectedTool.unselectTool();
        }
        //select the tool and highlight it on the toolbar
        this.selectedTool = this.tools[i];
        select("#" + toolName + "sideBarItem").style(
          "border",
          "2px solid blue"
        );
        
        //if the tool has an options area. Populate it now.
        if (this.selectedTool.hasOwnProperty("populateOptions")) {
          this.selectedTool.populateOptions();
        }
      } else {
        // console.log(this.tools[i]);
        select("#" + this.tools[i].name + "sideBarItem").style("border", "0");
      }
    }
  };
}




function addGlobalOptions() {
  select(".colourPalette").child(
    createDiv(
      '<text>update stroke </text><input onchange="updateStroke()" type="number"   id="strokeSize" min="1" max="40" value=' +
        strokeSize +
        ">"
    ).class("globalOptions")
  );
  select(".colourPalette").child(
    createDiv(
      '<text>update opacity </text><input onchange="updateOpacity()" type="number"  id="opacitySize" min="0" max="255" value=' +
        opacity +
        ">"
    ).class("globalOptions")
  );
};

function removeGlobalOptions(){
  // select("#globalTool1").html("");
  // select("#globalTool2").html("");
}

var strokeSize = 3;
var opacity = 255;

function updateStroke() {
  console.log(parseInt(select("#strokeSize").value()));
  strokeSize = parseInt(select("#strokeSize").value());
}

function updateOpacity() {
  console.log(parseInt(select("#opacitySize").value()));
  opacity = parseInt(select("#opacitySize").value());
  let all = selectAll(".colourSwatches")

  for (let index = 0; index < window.colours.length; index++) {
    const colorString = window.colours[index];
    let arr =color(colorString).levels;
    const colorSW = all[index];
    let op = opacity / 255
    // console.log("background-color", "rgba(" + arr[0] + ","+ arr[1] +","+ arr[2] +","+ opacity+ ")")
    colorSW.style("background-color", "rgba(" + arr[0] + ","+ arr[1] +","+ arr[2] +","+ op + ")")
      }
}

function setGlobalStyle() {
 
  
  strokeWeight(strokeSize);
  setGlobalFill()
}

function setGlobalFill(){
  let arr =color(selectedColor).levels;
  fill(arr[0],arr[1],arr[2], opacity);
  stroke(arr[0],arr[1],arr[2], opacity);
}