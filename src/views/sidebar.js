import { binarySearchTruncate, eventDeboune } from "../utils";
import { USERACTION } from "../constants";

class Sidebar {
  render(imageList, selectedImageId) {
    const sidebar = document.querySelector("[data-sidebar]");

    imageList.forEach((imageInfo) => {
      const { src, caption, id } = imageInfo;
      const isSelected = selectedImageId === id;
      const newPreviewPanel = this.createPreviewPanel(
        src,
        caption,
        isSelected,
        id
      );

      sidebar.appendChild(newPreviewPanel);

      const previewCaption = document.querySelector(
        `[data-preview-caption-id="${id}"]`
      );

      this.truncatePreviewCaption(previewCaption, caption);
    });
  }

  update(typeOfAction, actionInfo) {
    switch (typeOfAction) {
      case USERACTION.UPDATE_CAPTION: {
        const { newImageCaption, imageId } = actionInfo;
        this.editPreviewCaption(newImageCaption, imageId);
        break;
      }

      case USERACTION.SELECT_NEW_IMAGE: {
        const { selectedImageId } = actionInfo;
        this.toggleSelectedPanel(selectedImageId);
        break;
      }

      case USERACTION.PREVIEW_PANEL_DRAG.START: {
        const { event } = actionInfo;
        this.startPreviewPanelDrag(event);
        break;
      }

      case USERACTION.PREVIEW_PANEL_DRAG.END: {
        const { event } = actionInfo;
        this.endPreviewPanelDrag(event);
        break;
      }

      case USERACTION.PREVIEW_PANEL_DRAG.DROP: {
        const { event } = actionInfo;
        this._dropPreviewPanel(event);
        break;
      }

      default:
        return;
    }
  }

  createPreviewImage(imageSrc, imageId) {
    const newImage = document.createElement("img");
    newImage.src = imageSrc;
    newImage.classList.add("preview-panel_image");
    newImage.dataset.previewImageId = imageId;
    return newImage;
  }

  truncatePreviewCaption(previewCaptionInDom, imageCaption) {
    previewCaptionInDom.innerText = imageCaption;
    binarySearchTruncate(previewCaptionInDom, imageCaption, 1, "100%");
  }

  createPreviewCaption(imageCaption, imageId) {
    const newCaption = document.createElement("span");
    newCaption.innerText = imageCaption;
    newCaption.classList.add("preview-panel_caption");
    newCaption.dataset.previewCaptionId = imageId;
    return newCaption;
  }

  createPreviewPanel(imageSrc, imageCaption, isSelected, imageId) {
    const newPreviewImage = this.createPreviewImage(imageSrc, imageId);
    const newPreviewCaption = this.createPreviewCaption(imageCaption, imageId);
    const newPreviewPanel = document.createElement("div");

    newPreviewPanel.dataset.previewPanelId = imageId;
    newPreviewPanel.dataset.selected = isSelected ? "selected" : "not-selected";
    newPreviewPanel.tabIndex = "0";
    newPreviewPanel.draggable = "true";

    if (isSelected) {
      newPreviewPanel.classList.add("preview-panel", "preview-panel-selected");
    } else {
      newPreviewPanel.classList.add("preview-panel");
    }

    newPreviewPanel.appendChild(newPreviewImage);
    newPreviewPanel.appendChild(newPreviewCaption);
    return newPreviewPanel;
  }

  toggleSelectedPanel(selectedImageId) {
    const prevSelectedPanel = document.querySelector(
      '[data-selected="selected"]'
    );

    prevSelectedPanel.classList.remove("preview-panel-selected");
    prevSelectedPanel.dataset.selected = "not-selected";

    const newSelectedPanel = document.querySelector(
      `[data-preview-panel-id="${selectedImageId}"]`
    );

    newSelectedPanel.classList.add("preview-panel-selected");
    newSelectedPanel.dataset.selected = "selected";
  }

  editPreviewCaption(newImageCaption, imageId) {
    const previewCaption = document.querySelector(
      `[data-preview-caption-id="${imageId}"]`
    );

    this.truncatePreviewCaption(previewCaption, newImageCaption);
  }

  startPreviewPanelDrag(event) {
    let draggablePanel = event.target;
    while (draggablePanel && !draggablePanel.dataset.previewPanelId) {
      draggablePanel = draggablePanel.parentNode;
    }

    if (!draggablePanel) {
      return;
    }
    draggablePanel.style.opacity = 0.4;
    draggablePanel.dataset.dragging = "true";
  }

  endPreviewPanelDrag(event) {
    let draggablePanel = event.target;
    while (draggablePanel && !draggablePanel.dataset.previewPanelId) {
      draggablePanel = draggablePanel.parentNode;
    }

    if (!draggablePanel) {
      return;
    }

    draggablePanel.style.opacity = 1;
    draggablePanel.dataset.dragging = "false";
  }

  findClosestPreviewPanel(event) {
    const previewPanels = document.querySelectorAll("[data-preview-panel-id]");
    const draggablePreviewPanel = document.querySelector(
      '[data-dragging="true"]'
    );

    const yPos = event.clientY;
    return Array.from(previewPanels).reduce(
      (closest, previewPanel) => {
        const boundingBox = previewPanel.getClientRects()[0];
        const midPoint = boundingBox.top + boundingBox.height / 2;
        const offset = yPos - midPoint;
        return previewPanel !== draggablePreviewPanel &&
          offset < 0 &&
          offset > closest.offset
          ? { closestPanel: previewPanel, offset }
          : closest;
      },
      { closestPanel: null, offset: Number.NEGATIVE_INFINITY }
    );
  }

  _dropPreviewPanel(event) {
    const sidebar = document.querySelector("[data-sidebar]");

    const draggablePreviewPanel = document.querySelector(
      '[data-dragging="true"]'
    );

    if (!draggablePreviewPanel) {
      return;
    }

    const { closestPanel } = this.findClosestPreviewPanel(event);

    if (!closestPanel) {
      sidebar.append(draggablePreviewPanel);
    } else {
      sidebar.insertBefore(draggablePreviewPanel, closestPanel);
    }
  }
}

export { Sidebar };
