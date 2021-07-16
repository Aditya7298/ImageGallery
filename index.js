import { Controller } from "./src/controller.js";

const imageStore = [
  {
    id: "1",
    caption: "Cambridge Central Mosque, Mill Road, Cambridge, UK",
    src: "Images/img1.jpg"
  },
  {
    id: "2",
    caption: "Image of a blue butterfly sitting on a cat's nose",
    src: "Images/img2.jpg"
  },
  {
    id: "3",
    caption: "Photo of the Taj Mahal taken during sunrise",
    src: "Images/img3.jpg"
  },

  {
    id: "4",
    caption: "Waterfall in Iceland",
    src: "Images/img4.jpg"
  },

  {
    id: "5",
    caption: "Female belted kingfisher pictured in Ontario, Canada",
    src: "Images/img5.jpg"
  }
];

const selectedImageId = imageStore[2].id;

const controller = new Controller(imageStore, selectedImageId);
