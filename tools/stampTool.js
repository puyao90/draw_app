var stampSize = 50;
function stampTool() {
  this.icon = "assets/stamp.jpg";
  this.name = "stamp";

  this.draw = function () {
    if (isValidPos(mouseX, mouseY)) {
      cursor(this.selectedIcon);
      if (
        Date.now() - mouseIsClickedAt > 0 &&
        Date.now() - mouseIsClickedAt < 30
      ) {
        loadImage(this.selectedIcon, (img) => {
          image(
            img,
            mouseX - stampSize / 2,
            mouseY - stampSize / 2,
            stampSize,
            stampSize
          );
        });

        mouseIsClickedAt = 0;
      }
    } else {
    }
  };

  this.selectedIcon = null;

  this.populateOptions = function () {
    select(".options").html(
      '<text>update size  </text><input onchange="updateStampSize()" type="number"  height="20" size="20" id="stampSize" min="10" max="400" value=50>'
    );

    let div = createDiv().class("stampDiv");

    let imegs = this.loadImages();
    for (const icon of imegs) {
      iconDiv = createDiv(
        "<img style='background-color:white;' width='40' height='40' src='" +
          icon +
          "'>"
      );
      iconDiv.class("stamp");
      iconDiv.mouseClicked(() => {
        console.log("clicked", icon);
        this.selectedIcon = icon;
      });
      div.child(iconDiv);
    }
    select(".options").child(div);
  };

  this.unselectTool = function () {
    select(".options").html("");
  };
  this.initialized = true;

  this.loadImages = function () {
    var folder = "/assets/stamps/";
    var images = [];
    var iconNumber = 18;
    while (iconNumber > 0) {
      iconNumber--;
      images.push(folder + iconNumber + "-icon.png");
    }
    this.selectedIcon = images[0];
    return images;
  };
}

function updateStampSize() {
  console.log(parseInt(select("#stampSize").value()));
  stampSize = parseInt(select("#stampSize").value());
}
