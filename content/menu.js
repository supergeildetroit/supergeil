document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("content/menu.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not load restaurant menus.");
    }

    const menus = await response.json();

    const categories = [
      { id: "brunch", label: "brunch" },
      { id: "lunch", label: "lunch" },
      { id: "dinner", label: "dinner" },
      { id: "desserts", label: "dessert" },
      { id: "drinks", label: "drink" }
    ];

    categories.forEach((category) => {
      const section = document.getElementById(category.id);
      const navigationLink = document.querySelector(
        `.category-nav a[href="#${category.id}"]`
      );

      if (!section) {
        return;
      }

      let pages = menus[category.id] || [];

      if (!Array.isArray(pages)) {
        pages = pages ? [pages] : [];
      }

      if (pages.length === 0) {
        section.hidden = true;

        if (navigationLink) {
          navigationLink.hidden = true;
        }

        return;
      }

      section.hidden = false;

      if (navigationLink) {
        navigationLink.hidden = false;
      }

      const container = section.querySelector(".menu-pages");

      if (!container) {
        return;
      }

      container.innerHTML = "";
      container.classList.toggle("single", pages.length === 1);

      pages.forEach((imagePath, index) => {
        const frame = document.createElement("div");
        frame.className = "menu-page-frame";

        const image = document.createElement("img");
        image.src = imagePath;
        image.loading = "lazy";

        image.alt =
          pages.length > 1
            ? `Supergeil ${category.label} menu, page ${index + 1}`
            : `Supergeil ${category.label} menu`;

        frame.appendChild(image);
        container.appendChild(frame);
      });
    });
  } catch (error) {
    console.error(error);
  }
});
