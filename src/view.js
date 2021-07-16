import { Sidebar } from "./views/sidebar.js";
import { DisplayContainer } from "./views/displayContainer.js";
import { USERACTION } from "./constants.sj";

class View {
  constructor(previewSelectionCallback, captionChangeCallback) {
    this.previewSelectionCallback = previewSelectionCallback;
    this.captionChangeCallback = captionChangeCallback;
    this.sidebar = new Sidebar();
    this.displayContainer = new DisplayContainer();
  }

  render(imageList, selectedImage) {
    this.sidebar.render(imageList, selectedImage.id);
    this.displayContainer.render(selectedImage.src, selectedImage.caption);
    this.initEventHandlers();
  }

  update(typeOfAction, actionInfo) {
    switch (typeOfAction) {
      case USERACTION.UPDATE_CAPTION: {
        const { caption: newImageCaption, id: imageId } = actionInfo;
        this.sidebar.update(typeOfAction, { newImageCaption, imageId });
        break;
      }

      case USERACTION.SELECT_NEW_IMAGE: {
        const {
          id: selectedImageId,
          src: selectedImageSrc,
          caption: selectedImageCaption
        } = actionInfo;
        this.sidebar.update(typeOfAction, { selectedImageId });
        this.displayContainer.update(typeOfAction, {
          selectedImageSrc,
          selectedImageCaption
        });
        break;
      }

      default:
        return;
    }
  }

  initEventHandlers() {
    const sidebarElement = document.querySelector("[data-sidebar]");

    const previewPanels = document.querySelectorAll("[data-preview-panel-id]");

    const displayCaption = document.querySelector("[data-display-caption]");

    console.log(sidebarElement, previewPanels, displayCaption);

    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.handlePreviewFocus();
      }
    });

    sidebarElement.addEventListener(
      "click",
      this.handlePreviewSelection.bind(this)
    );

    sidebarElement.addEventListener("dragover", (event) => {
      this.sidebar.update(USERACTION.PREVIEW_PANEL_DRAG.DROP, { event });
    });

    previewPanels.forEach((previewPanel) => {
      previewPanel.addEventListener("dragstart", (event) => {
        this.sidebar.update(USERACTION.PREVIEW_PANEL_DRAG.START, { event });
      });

      previewPanel.addEventListener("dragend", (event) => {
        this.sidebar.update(USERACTION.PREVIEW_PANEL_DRAG.END, { event });
      });
    });

    displayCaption.addEventListener("input", (event) => {
      const newCaption = event.target.innerText;
      const selectedImage = document.querySelector(
        '[data-selected="selected"]'
      );
      const selectedImageId = selectedImage.dataset.previewPanelId;
      this.captionChangeCallback(selectedImageId, newCaption);
    });
  }

  handlePreviewFocus() {
    const previewPanels = Array.from(
      document.querySelectorAll("[data-preview-panel-id]")
    );

    if (previewPanels.includes(document.activeElement)) {
      const selectionId = document.activeElement.dataset.previewPanelId;
      this.previewSelectionCallback(selectionId);
    }
  }

  handlePreviewSelection(event) {
    const sidebarElementCopy = document.querySelector("[data-sidebar]");
    let currElement = event.target;
    while (
      currElement !== sidebarElementCopy &&
      !currElement.dataset.previewPanelId
    ) {
      if (currElement) currElement = currElement.parentNode;
    }

    if (currElement === sidebarElementCopy) {
      return;
    }

    const selectionId = currElement.dataset.previewPanelId;
    this.previewSelectionCallback(selectionId);
  }
}

export { View };
