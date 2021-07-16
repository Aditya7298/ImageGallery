import { Model } from "./model.js";
import { View } from "./view.js";
import { USERACTION } from "./constants";

class Controller {
  constructor(imageStore, selectedImageId) {
    this.model = new Model(imageStore, selectedImageId);
    this.view = new View(
      this.handlePreviewSelection.bind(this),
      this.handleCaptionChange.bind(this)
    );
    this.init();
  }

  init() {
    const imageList = this.model.getAllImages();
    const selectedImage = this.model.getSelectedImage();
    this.view.render(imageList, selectedImage);
  }

  handlePreviewSelection(selectedImageId) {
    const selectedImage = this.model.editSelectedImage(selectedImageId);
    this.view.update(USERACTION.SELECT_NEW_IMAGE, selectedImage);
  }

  handleCaptionChange(id, newCaption) {
    const editedImageInfo = this.model.editImageCaption(id, newCaption);
    this.view.update(USERACTION.UPDATE_CAPTION, editedImageInfo);
  }
}

export { Controller };
