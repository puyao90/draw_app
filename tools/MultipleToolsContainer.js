// Can only detect black edges
function MultipleToolsContainer(icon, name = "Tools A") {
  this.icon = icon;
  this.name = name;
  this.tools = [];
  this.draw = function () {};

  this.populateOptions = function () {};

  this.unselectTool = function () {};

  this.selectedTool = null;

  var toolbarItemClick = function () {
    //remove any existing borders
    var items = selectAll(".sideBarItem");
    for (var i = 0; i < items.length; i++) {
      items[i].style("border", "0");
    }

    var toolName = this.id().split("sideBarItem")[0];
    self.selectTool(toolName);

    //call loadPixels to make sure most recent changes are saved to pixel array
    loadPixels();
  };
  this.addTools = function (tools) {
    for (const item of tools) {
      this.addTool(item);
    }
  };
  //add a tool to the tools array
  this.addTool = function (tool) {
    //check that the object tool has an icon and a name
    if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
      alert("make sure your tool has both a name and an icon");
    }
    this.tools.push(tool);
    this.addToolIcon(tool.icon, tool.name);
    //if no tool is selected (ie. none have been added so far)
    //make this tool the selected one.
    if (this.selectedTool == null) {
      this.selectTool(tool.name);
    }
  };
  //add a new tool icon to the html page
  this.addToolIcon = function (icon, name) {
    var sideBarItem = createDiv(
      "<img style='background-color:white' src='" + icon + "'>"
    );
    sideBarItem.class("sideBarItem");
    sideBarItem.id(name + "sideBarItem");
    sideBarItem.parent("sidebar");
    sideBarItem.mouseClicked(toolbarItemClick);
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
      }
    }
  };
}
