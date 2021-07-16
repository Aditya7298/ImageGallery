import { USERACTION } from "../constants.js";

class DisplayContainer {
  render(imageSrc, imageCaption) {
    const displayContainer = document.querySelector("[data-display-container]");

    displayContainer.innerHTML = "";

    const displayImage = document.createElement("img");
    displayImage.src = imageSrc;
    displayImage.classList.add("display-container_image");
    displayImage.setAttribute("data-display-image", "");

    const displayCaption = document.createElement("div");
    displayCaption.innerText = imageCaption;
    displayCaption.contentEditable = "true";
    displayCaption.classList.add("display-container_caption");
    displayCaption.setAttribute("data-display-caption", "");

    displayContainer.appendChild(displayImage);
    displayContainer.appendChild(displayCaption);
  }

  update(typeOfAction, actionInfo) {
    switch (typeOfAction) {
      case USERACTION.SELECT_NEW_IMAGE: {
        const { selectedImageCaption, selectedImageSrc } = actionInfo;
        this.updateImageDisplayed(selectedImageSrc, selectedImageCaption);
        break;
      }

      default:
        return;
    }
  }

  updateImageDisplayed(newImageSrc, newImageCaption) {
    const displayCaption = document.querySelector("[data-display-caption]");
    displayCaption.innerText = newImageCaption;

    const displayImage = document.querySelector("[data-display-image]");
    displayImage.src = newImageSrc;
  }
}

export { DisplayContainer };
