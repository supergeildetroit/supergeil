document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("content/site.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not load restaurant hours.");
    }

    const hours = await response.json();

    const footerHours = `
      <p><strong>Monday</strong> – ${hours.monday}</p>

      <p>
        <strong>Tuesday – Thursday</strong><br>
        <em>Lunch: ${hours.tuesday_thursday_lunch}</em> |
        Dinner: ${hours.tuesday_thursday_dinner}
      </p>

      <p>
        <strong>Friday &amp; Saturday</strong><br>
        <em>Lunch: ${hours.friday_saturday_lunch}</em> |
        Dinner: ${hours.friday_saturday_dinner}
      </p>

      <p>
        <strong>Sunday</strong><br>
        <em>Brunch: ${hours.sunday_brunch}</em> |
        Dinner: ${hours.sunday_dinner}
      </p>
    `;

    document.querySelectorAll(".hours-list").forEach((section) => {
      section.innerHTML = footerHours;
    });

    document.querySelectorAll(".hours-card").forEach((section) => {
      section.innerHTML = `
        <h2>Hours</h2>

        <p><strong>Monday</strong> – ${hours.monday}</p>

        <p>
          <strong>Tuesday – Thursday</strong><br>
          <em>Lunch: ${hours.tuesday_thursday_lunch}</em><br>
          Dinner: ${hours.tuesday_thursday_dinner}
        </p>

        <p>
          <strong>Friday &amp; Saturday</strong><br>
          <em>Lunch: ${hours.friday_saturday_lunch}</em><br>
          Dinner: ${hours.friday_saturday_dinner}
        </p>

        <p>
          <strong>Sunday</strong><br>
          <em>Brunch: ${hours.sunday_brunch}</em><br>
          Dinner: ${hours.sunday_dinner}
        </p>
      `;
    });
  } catch (error) {
    console.error(error);
  }
});
