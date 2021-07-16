import { Controller } from "./src/controller";
import { v4 as uuid } from "uuid";

const imageStore = [
  {
    id: uuid(),
    caption: "Cambridge Central Mosque, Mill Road, Cambridge, UK",
    src: "Images/img1.jpg"
  },
  {
    id: uuid(),
    caption: "Image of a blue butterfly sitting on a cat's nose",
    src: "Images/img2.jpg"
  },
  {
    id: uuid(),
    caption: "Photo of the Taj Mahal taken during sunrise",
    src: "Images/img3.jpg"
  },

  {
    id: uuid(),
    caption: "Waterfall in Iceland",
    src: "Images/img4.jpg"
  },

  {
    id: uuid(),
    caption: "Female belted kingfisher pictured in Ontario, Canada",
    src: "Images/img5.jpg"
  }
];

const selectedImageId = imageStore[2].id;

const controller = new Controller(imageStore, selectedImageId);
