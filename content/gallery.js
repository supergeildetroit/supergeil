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
    section.innerHTML = `
      <div class="gallery-inner">
        <div class="gallery-heading">
          <h1>Gallery</h1>
          <p>Seasonal dishes, cocktails, events, and moments from Supergeil.</p>
        </div>

        <div class="gallery-grid"></div>
      </div>
    `;

    const grid = section.querySelector(".gallery-grid");

    photos.forEach((photo) => {
      const figure = document.createElement("figure");
      figure.className = "gallery-item";

      const image = document.createElement("img");
      image.src = photo.image;
      image.alt = photo.alt || "";
      image.loading = "lazy";

      figure.appendChild(image);

      if (photo.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = photo.caption;
        figure.appendChild(caption);
      }

      grid.appendChild(figure);
    });

    const style = document.createElement("style");

    style.textContent = `
      .gallery-section {
        padding: 75px 20px 95px;
        background: #f8f6f0;
      }

      .gallery-inner {
        width: min(1240px, 100%);
        margin: 0 auto;
      }

      .gallery-heading {
        max-width: 760px;
        margin: 0 auto 52px;
        text-align: center;
      }

      .gallery-heading h1 {
        margin: 0 0 18px;
        font-family: "Rye", Georgia, serif;
        font-size: clamp(44px, 6vw, 76px);
        font-weight: 400;
        line-height: 1;
        text-transform: uppercase;
      }

      .gallery-heading p {
        margin: 0;
        font-size: clamp(16px, 1.3vw, 18px);
        line-height: 1.7;
      }

      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
        align-items: start;
      }

      .gallery-item {
        margin: 0;
      }

      .gallery-item img {
        width: 100%;
        aspect-ratio: 4 / 3;
        display: block;
        object-fit: cover;
        background: #e8ddc9;
      }

      .gallery-item figcaption {
        padding-top: 10px;
        font-size: 14px;
        line-height: 1.5;
        color: #555;
      }

      @media (max-width: 900px) {
        .gallery-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 600px) {
        .gallery-section {
          padding: 55px 16px 70px;
        }

        .gallery-heading {
          margin-bottom: 34px;
        }

        .gallery-grid {
          grid-template-columns: 1fr;
          gap: 18px;
        }
      }
    `;

    document.head.appendChild(style);
  } catch (error) {
    console.error(error);
  }
});
