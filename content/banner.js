document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("content/banner.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not load the homepage banner.");
    }

    const bannerData = await response.json();
    const banner = document.querySelector(".announcement-banner");

    if (!banner) {
      return;
    }

    if (bannerData.enabled === false) {
      banner.style.display = "none";
      return;
    }

    banner.style.display = "flex";
    banner.textContent = bannerData.text || "";
    banner.href = bannerData.link || "upcoming-events.html";
    banner.setAttribute(
      "aria-label",
      bannerData.text || "View Supergeil announcement"
    );

    if (
      bannerData.link &&
      (bannerData.link.startsWith("http://") ||
        bannerData.link.startsWith("https://"))
    ) {
      banner.target = "_blank";
      banner.rel = "noopener noreferrer";
    } else {
      banner.removeAttribute("target");
      banner.removeAttribute("rel");
    }
  } catch (error) {
    console.error(error);
  }
});
