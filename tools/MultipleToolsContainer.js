// Can only detect black edges
function multipleToolsContainer(icon, name) {
  this.icon = icon;
  this.name = name; // tool box will create div for it
  this.divID = name;
  this.tools = [];
  this.selectedTool = null;
  this.toolBox = null;
  this.divClassName = "#" + name + "sideBarItem";
  this.draw = function () {
    if (this.selectedTool) {
      this.selectedTool.draw();
    }
  };
  this.subToolsDivClassName = "ToolContainer" + name;
  var self = this;
  this.subToolsDiv = null;

  this.populateOptions = function () {
    this.drawTools();

    // setTimeout(() => {
    //   this.hiddeMenu();
    //   console.log(">>> now operation 5s hide now");
    // }, 5000);
  };

  this.drawTools = function () {
    if (this.subToolsDiv == null) {
      this.subToolsDiv = createDiv().id(this.subToolsDivClassName);
      window.subToolsDiv = this.subToolsDiv.elt;
      this.subToolsDiv.elt.onmouseleave = () => {
        this.hiddeMenu();
      };
      this.getLeftIcon().elt.onmouseover = () => {
        this.showMenu();
      };
      // this.subToolsDiv.elt.onmouseover = () => {
      //   canClose = true;
      // };
    } else {
      this.showMenu();
    }

    this.subToolsDiv.class("subTools");
    window.xxx = this.getLeftIcon().elt;
    let clientRect = this.getLeftIcon().elt.getBoundingClientRect();
    this.subToolsDiv.style("top", clientRect.top + "px");
    this.subToolsDiv.style("height", this.tools.length * 60 + "px");
    for (const tool of this.tools) {
      this.addToolIcon(tool.icon, tool.name);
      //if no tool is selected (ie. none have been added so far)
      //make this tool the selected one.
      if (this.selectedTool == null) {
        this.selectTool(tool.name);
      }
    }
    parentName = "wrapper";

    // console.log(this.subToolsDiv);
    this.getLeftIcon().child(this.subToolsDiv);
    // select("." + parentName).child(this.subToolsDiv);
  };

  this.getLeftIcon = function () {
    return select(this.divClassName);
  };

  this.unselectTool = function () {
    this.hiddeMenu();
    // this.subToolsDiv.style("display", "None");
  };

  this.drawSmallFloatIcon = function () {
    let icon = this.getLeftIcon();

    icon.child(
      createDiv(
        "<img id='smallIcon' style='position: relative; bottom:30px; left:30px;' width=20 src='" +
          "assets/smallIcon.png" +
          "'>"
      )
    );
  };

  var menuClick = function () {
    //remove any existing borders

    var toolName = this.id().split("sideBarItem")[0];
    self.selectSubTool(toolName);

    //call loadPixels to make sure most recent changes are saved to pixel array
    self.hiddeMenu();
    console.log(self);
    loadPixels();
  };
  this.addTools = function (tools) {
    for (const item of tools) {
      this.addTool(item);

      this.icon = item.icon;
    }

    return this;
  };

  this.setup = function () {
    // console.log(this.subToolsDiv);
    return this;
  };

  //add a tool to the tools array
  this.addTool = function (tool) {
    //check that the object tool has an icon and a name
    if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
      alert("make sure your tool has both a name and an icon");
    }
    this.tools.push(tool);
  };

  //add a new tool icon to the html page
  this.addToolIcon = function (icon, name) {
    var sideBarItem = createDiv(
      "<img style='background-color:white' src='" + icon + "'>"
    );
    sideBarItem.class("sideBarItem");
    sideBarItem.id(name + "sideBarItem");
    this.subToolsDiv.child(sideBarItem);
    sideBarItem.mouseClicked(menuClick);
  };

  this.selectTool = function () {};
  this.selectSubTool = function (toolName) {
    for (var i = 0; i < this.tools.length; i++) {
      if (this.tools[i].name == toolName) {
        if (
          this.selectedTool != null &&
          this.selectedTool.hasOwnProperty("unselectTool")
        ) {
          this.selectedTool.unselectTool();
        }
        this.selectedTool = this.tools[i];
        // console.log(select("#" + toolName + "sideBarItem").elt);
        select("#" + toolName + "sideBarItem").style(
          "border",
          "2px solid blue"
        );
        // console.log(select("#" + toolName + "sideBarItem").elt);
        if (this.selectedTool.hasOwnProperty("populateOptions")) {
          this.selectedTool.populateOptions();
        }
      } else {
        // console.log(this.tools[i]);
        // console.log("#" + this.tools[i].name + "sideBarItem");
        select("#" + this.tools[i].name + "sideBarItem").style("border", "0");
      }
    }

    this.toolBox.refreshIcon(this, this.selectedTool);
    // this.drawSmallFloatIcon();
    // this.hiddeMenu();
  };

  this.hiddeMenu = function () {
    this.subToolsDiv.style("display", "none");
  };

  this.showMenu = function () {
    console.log("show");
    this.subToolsDiv.show();
  };
}
