document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("content/gallery.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not load gallery photos.");
    }

    const photos = await response.json();

    if (!Array.isArray(photos) || photos.length === 0) {
      return;
    }

    const section = document.querySelector(".coming-soon");

    if (!section) {
      return;
    }

    section.className = "gallery-section";
    section.innerHTML = `<div class="gallery-grid"></div>`;

    const grid = section.querySelector(".gallery-grid");
    let currentPhoto = 0;

    photos.forEach((photo, index) => {
      const button = document.createElement("button");
      button.className = "gallery-item";
      button.type = "button";
      button.setAttribute("aria-label", `Open photo ${index + 1}`);

      const image = document.createElement("img");
      image.src = photo.image;
      image.alt = photo.alt || "";
      image.loading = "lazy";

      button.appendChild(image);
      button.addEventListener("click", () => openLightbox(index));
      grid.appendChild(button);
    });

    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML = `
      <button
        class="lightbox-close"
        type="button"
        aria-label="Close gallery"
      >
        &times;
      </button>

      <button
        class="lightbox-arrow lightbox-previous"
        type="button"
        aria-label="Previous photo"
      >
        &#10094;
      </button>

      <img class="lightbox-image" src="" alt="">

      <button
        class="lightbox-arrow lightbox-next"
        type="button"
        aria-label="Next photo"
      >
        &#10095;
      </button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-previous");
    const nextButton = lightbox.querySelector(".lightbox-next");

    function showPhoto(index) {
      currentPhoto = (index + photos.length) % photos.length;
      lightboxImage.src = photos[currentPhoto].image;
      lightboxImage.alt = photos[currentPhoto].alt || "";
    }

    function openLightbox(index) {
      showPhoto(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
    }

    function previousPhoto() {
      showPhoto(currentPhoto - 1);
    }

    function nextPhoto() {
      showPhoto(currentPhoto + 1);
    }

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", previousPhoto);
    nextButton.addEventListener("click", nextPhoto);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("is-open")) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        previousPhoto();
      }

      if (event.key === "ArrowRight") {
        nextPhoto();
      }
    });

    if (photos.length === 1) {
      previousButton.hidden = true;
      nextButton.hidden = true;
    }

    const style = document.createElement("style");

    style.textContent = `
      .gallery-section {
        padding: 28px;
        background: #f8f6f0;
      }

      .gallery-grid {
        width: min(1400px, 100%);
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
      }

      .gallery-item {
        appearance: none;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        border: 0;
        background: transparent;
        cursor: zoom-in;
      }

      .gallery-item img {
        width: 100%;
        aspect-ratio: 4 / 3;
        display: block;
        object-fit: cover;
        transition: transform 0.35s ease;
      }

      .gallery-item:hover img,
      .gallery-item:focus-visible img {
        transform: scale(1.025);
      }

      .gallery-item:focus-visible {
        outline: 3px solid #c8a12d;
        outline-offset: 3px;
      }

      body.lightbox-open {
        overflow: hidden;
      }

      .gallery-lightbox {
        position: fixed;
        inset: 0;
        z-index: 10000;
        padding: 70px 90px;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.94);
      }

      .gallery-lightbox.is-open {
        display: flex;
      }

      .lightbox-image {
        max-width: 100%;
        max-height: calc(100vh - 100px);
        display: block;
        object-fit: contain;
      }

      .lightbox-close,
      .lightbox-arrow {
        position: absolute;
        border: 0;
        color: white;
        background: transparent;
        cursor: pointer;
      }

      .lightbox-close {
        top: 18px;
        right: 25px;
        z-index: 2;
        padding: 4px 12px;
        font-size: 48px;
        line-height: 1;
      }

      .lightbox-arrow {
        top: 50%;
        z-index: 2;
        padding: 18px;
        font-size: 45px;
        line-height: 1;
        transform: translateY(-50%);
      }

      .lightbox-previous {
        left: 18px;
      }

      .lightbox-next {
        right: 18px;
      }

      .lightbox-close:hover,
      .lightbox-arrow:hover,
      .lightbox-close:focus-visible,
      .lightbox-arrow:focus-visible {
        color: #c8a12d;
      }

      @media (max-width: 900px) {
        .gallery-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 600px) {
        .gallery-section {
          padding: 12px;
        }

        .gallery-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }

        .gallery-lightbox {
          padding: 65px 45px;
        }

        .lightbox-arrow {
          padding: 10px;
          font-size: 32px;
        }

        .lightbox-previous {
          left: 2px;
        }

        .lightbox-next {
          right: 2px;
        }
      }
    `;

    document.head.appendChild(style);
  } catch (error) {
    console.error(error);
  }
});
