import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
                <a class="gallery__link" href=${original}
                    target="_blank" rel="noreferrer noopener">
                  <img
                    class="gallery__image"
                    src=${preview}
                    data-source=${original}
                    alt=${description}
                  />
                </a>
              </div>`;
    })
    .join("");
}

galleryRef.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));

function showModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);

  instance.show();

  function onEscKeydown(event) {
    if (event.code !== "Escape") {
      return;
    }
    instance.close();
    document.removeEventListener("keydown", onEscKeydown);
  }
  document.addEventListener("keydown", onEscKeydown);
}

galleryRef.addEventListener("click", showModal);
