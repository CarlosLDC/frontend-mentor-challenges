const cardFooter = document.getElementById("card-footer");
const shareButton = document.getElementById("share-button");
const userTemplate = document.getElementById("user-template");
const shareTemplate = document.getElementById("share-template");

let divElement;
let currentScreenWidth;
let screenWidthOnUpdate;

let buttonPressed = false;
let breakpointReachedFromBelow = false;
let breakpointReachedFromAbove = false;
let templateClone = userTemplate.content.cloneNode(true);

function toggleShareButton() {
  shareButton.classList.toggle("share-button");
  shareButton.classList.toggle("share-button--dark");
}

function toggleFooter() {
  cardFooter.classList.toggle("card-footer");
  cardFooter.classList.toggle("card-footer--dark");
}

function insertDivInButton() {
  divElement = document.createElement("div");
  divElement.classList.add("tooltip");
  templateClone = shareTemplate.content.cloneNode(true);
  divElement.appendChild(templateClone);
  shareButton.appendChild(divElement);
}

cardFooter.insertBefore(templateClone, shareButton);

shareButton.addEventListener("click", (e) => {
  toggleShareButton();

  currentScreenWidth = window.screen.width;
  screenWidthOnUpdate = currentScreenWidth;

  if (currentScreenWidth < 1024) {
    toggleFooter();

    if (buttonPressed) {
      templateClone = userTemplate.content.cloneNode(true);
      buttonPressed = false;
    } else {
      templateClone = shareTemplate.content.cloneNode(true);
      buttonPressed = true;
    }

    while (cardFooter.children.length > 1) {
      cardFooter.removeChild(cardFooter.firstChild);
    }

    cardFooter.insertBefore(templateClone, shareButton);
  } else {
    if (buttonPressed) {
      shareButton.removeChild(shareButton.lastChild);
      buttonPressed = false;
    } else {
      insertDivInButton();
      buttonPressed = true;
    }
  }
});

window.addEventListener("resize", (e) => {
  currentScreenWidth = window.screen.width;

  if (buttonPressed) {
    if (screenWidthOnUpdate < 1024 && 1024 <= currentScreenWidth) {
      breakpointReachedFromBelow = true;
    } else if (currentScreenWidth < 1024 && 1024 <= screenWidthOnUpdate) {
      breakpointReachedFromAbove = true;
    }
  }

  if (breakpointReachedFromBelow) {
    insertDivInButton();
    toggleFooter();

    while (cardFooter.children.length > 1) {
      cardFooter.removeChild(cardFooter.firstChild);
    }

    templateClone = userTemplate.content.cloneNode(true);
    cardFooter.insertBefore(templateClone, shareButton);

    screenWidthOnUpdate = currentScreenWidth;
    breakpointReachedFromBelow = false;
  } else if (breakpointReachedFromAbove) {
    shareButton.removeChild(shareButton.lastChild);
    toggleFooter();

    while (cardFooter.children.length > 1) {
      cardFooter.removeChild(cardFooter.firstChild);
    }

    templateClone = shareTemplate.content.cloneNode(true);
    cardFooter.insertBefore(templateClone, shareButton);

    screenWidthOnUpdate = currentScreenWidth;
    breakpointReachedFromAbove = false;
  }
});
