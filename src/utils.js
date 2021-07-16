const binarySearchTruncate = (
  previewCaptionInDom,
  imageCaption,
  maxNumberOfLines,
  maxWidth
) => {
  const maxHeight =
    Number(
      window.getComputedStyle(previewCaptionInDom).lineHeight.slice(0, -2)
    ) * maxNumberOfLines;

  if (maxWidth) {
    previewCaptionInDom.style.width = maxWidth;
  }

  const letters = imageCaption.split("");
  if (previewCaptionInDom.clientHeight <= maxHeight) {
    return;
  }

  let left = 0,
    right = letters.length / 2,
    mid = Math.floor(left + (right - left) / 2);

  while (left <= right) {
    const leftletters = letters.filter((_, ind) => ind < mid);
    const rightletters = letters.filter(
      (_, ind) => ind >= letters.length - mid
    );

    const previousInnerText = previewCaptionInDom.innerText;

    previewCaptionInDom.innerText =
      leftletters.join("") + "..." + rightletters.join("");

    if (previewCaptionInDom.clientHeight <= maxHeight) {
      left = mid + 1;
    } else {
      previewCaptionInDom.innerText = previousInnerText;
      right = mid - 1;
    }

    mid = Math.floor(left + (right - left) / 2);
  }
};

const eventDeboune = (eventHandler) => {
  let timer;
  return function (...args) {
    let self = this;
    if (timer) {
      cancelAnimationFrame(timer);
    }
    timer = requestAnimationFrame(() => {
      eventHandler.apply(self, [...args]);
      timer = undefined;
    });
  };
};

export { binarySearchTruncate, eventDeboune };
