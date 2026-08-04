document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("content/events.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not load upcoming events.");
    }

    const events = await response.json();
    const publishedEvents = Array.isArray(events)
      ? events.filter((event) => event.published !== false)
      : [];

    const grid = document.querySelector(".events-grid");
    const emptyMessage = document.querySelector(".events-empty");

    if (!grid || !emptyMessage) {
      return;
    }

    grid.innerHTML = "";

    if (publishedEvents.length === 0) {
      grid.style.display = "none";
      emptyMessage.style.display = "block";
      return;
    }

    grid.style.display = "";
    emptyMessage.style.display = "none";

    publishedEvents.forEach((event) => {
      const card = document.createElement("article");
      card.className = "event-card";

      const imageContainer = document.createElement("div");
      imageContainer.className = "event-image";

      const image = document.createElement("img");
      image.src = event.image;
      image.alt = event.alt || "";
      image.loading = "lazy";

      imageContainer.appendChild(image);

      const content = document.createElement("div");
      content.className = "event-content";

      const date = document.createElement("p");
      date.className = "event-date";
      date.textContent = event.date_label || "";

      const title = document.createElement("h2");
      title.textContent = event.title || "";

      const description = document.createElement("p");
      description.textContent = event.description || "";

      const details = document.createElement("div");
      details.className = "event-details";

      const dateDetails = document.createElement("span");
      dateDetails.innerHTML =
        '<i class="fa-regular fa-calendar" aria-hidden="true"></i>';

      dateDetails.appendChild(
        document.createTextNode(` ${event.date_time || ""}`)
      );

      const location = document.createElement("span");
      location.innerHTML =
        '<i class="fa-solid fa-location-dot" aria-hidden="true"></i>';

      location.appendChild(
        document.createTextNode(` ${event.location || "Supergeil Detroit"}`)
      );

      details.appendChild(dateDetails);
      details.appendChild(location);

      content.appendChild(date);
      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(details);

      if (event.button_url) {
        const button = document.createElement("a");
        button.className = "event-button";
        button.href = event.button_url;
        button.textContent = event.button_text || "Learn More";

        if (
          event.button_url.startsWith("http://") ||
          event.button_url.startsWith("https://")
        ) {
          button.target = "_blank";
          button.rel = "noopener noreferrer";
        }

        content.appendChild(button);
      }

      card.appendChild(imageContainer);
      card.appendChild(content);
      grid.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
});
