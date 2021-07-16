class Model {
  constructor(imageStore, selectedImageId) {
    this.imageStore = imageStore.reduce(
      (imageStoreObj, imageInfo) => ({
        ...imageStoreObj,
        [imageInfo.id]: { ...imageInfo }
      }),
      {}
    );

    this.selectedImageId = selectedImageId;
  }

  getAllImages() {
    return Object.keys(this.imageStore).map(
      (imageId) => this.imageStore[imageId]
    );
  }

  getSingleImage(imageId) {
    return this.imageStore[imageId];
  }

  getSelectedImage() {
    return this.imageStore[this.selectedImageId];
  }

  editSelectedImage(newSelectedImageId) {
    this.selectedImageId = newSelectedImageId;
    return this.imageStore[this.selectedImageId];
  }

  editImageCaption(id, newImageCaption) {
    this.imageStore[id] = { ...this.imageStore[id], caption: newImageCaption };
    return this.imageStore[id];
  }
}

export { Model };
