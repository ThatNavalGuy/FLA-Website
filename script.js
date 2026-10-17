
// FLA website interactions

// IMPORTANT:
// Replace this placeholder with your real Discord invite URL.
const DISCORD_INVITE_URL =
  "https://discord.gg/REPLACE-WITH-YOUR-INVITE";

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    primaryNav.classList.toggle("is-open", !isOpen);
  });

  // Close the menu when a navigation link is selected.
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    });
  });

  // Close the menu with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    }
  });
}

// Discord integration
const discordLink = document.querySelector("#discord-link");

if (discordLink) {
  if (
    DISCORD_INVITE_URL.includes(
      "REPLACE-WITH-YOUR-INVITE"
    )
  ) {
    discordLink.addEventListener("click", (event) => {
      event.preventDefault();

      alert(
        "The Discord invite has not been configured yet. " +
        "Add your real invite URL in script.js."
      );
    });
  } else {
    discordLink.href = DISCORD_INVITE_URL;
    discordLink.target = "_blank";
    discordLink.rel = "noopener noreferrer";
  }
}

// Automatically update the copyright year.
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Reveal cards as they enter the screen.
const revealTargets = document.querySelectorAll(
  ".value-card, " +
  ".department-card, " +
  ".opportunity-card, " +
  ".staff-points article, " +
  ".steps li, " +
  ".community-panel"
);

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  "IntersectionObserver" in window &&
  !reducedMotion
) {
  revealTargets.forEach((element) => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealTargets.forEach((element) => {
    observer.observe(element);
  });
}
