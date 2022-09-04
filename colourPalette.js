var colours = [
  "black",
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "orange",
  "pink",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
  "DarkGray",
  "BlueViolet"


];

//Displays and handles the colour palette.
function ColourPalette() {
  //a list of web colour strings

  //make the start colour be black
  this.selectedColour = "black";
  window.selectedColor = this.selectedColour;

  var self = this;

  // this.set = function () {
  //   c = self.selectedColour;
  //   fill(c);
  //   stroke(c);
  // };

  var colourClick = function () {
    //remove the old border
    console.log("remove", self.selectedColour)
    var current = select("#" + self.selectedColour + "Swatch");
    current.style("border", "0");

    //get the new colour from the id of the clicked element
    var c = this.id().split("Swatch")[0];

    //set the selected colour and fill and stroke
    self.selectedColour = c;
    window.selectedColor = c;
    fill(c);
    stroke(c);

    //add a new border to the selected colour
    this.style("border", "2px solid blue");
  };

  //load in the colours
  this.loadColours = function () {
    //set the fill and stroke properties to be black at the start of the programme
    //running
    fill(colours[0]);
    stroke(colours[0]);

    //for each colour create a new div in the html for the colourSwatches
    for (var i = 0; i < colours.length; i++) {
      var colourID = colours[i] + "Swatch";

      //using p5.dom add the swatch to the palette and set its background colour
      //to be the colour value.
      var colourSwatch = createDiv();
      colourSwatch.class("colourSwatches");
      colourSwatch.id(colourID);

      select(".colourPalette").child(colourSwatch);
      select("#" + colourID).style("background-color", colours[i]);
      colourSwatch.mouseClicked(colourClick);
    }

    select(".colourSwatches").style("border", "2px solid blue");
  };
  addGlobalOptions();
  //call the loadColours function now it is declared
  this.loadColours();
}

function textPaleete() {}
