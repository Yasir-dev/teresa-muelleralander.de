// main.js

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const SELECTORS = {
  year: "#year",
  navigationToggle: ".nav-toggle",
  navigationList: ".nav-list",
  navigationLinks: ".nav-list a",
  scrollToTopButton: "#scroll-top",
};

const CLASSES = {
  navigationOpen: "nav-list--open",
  visible: "show",
};

const ATTRIBUTES = {
  ariaExpanded: "aria-expanded",
  ariaExpandedOpen: "true",
  ariaExpandedClosed: "false",
};

const SCROLL = {
  showButtonThreshold: 200,
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Update the footer year to the current year.
 */
function setCurrentYear() {
  const yearElement = document.querySelector(SELECTORS.year);

  if (!yearElement) {
    return;
  }

  yearElement.textContent = new Date().getFullYear();
}

/**
 * Initialize the mobile navigation toggle + close behavior.
 */
function initMobileNavigation() {
  const navigationToggle = document.querySelector(SELECTORS.navigationToggle);
  const navigationList = document.querySelector(SELECTORS.navigationList);

  if (!navigationToggle || !navigationList) {
    return;
  }

  const closeNavigation = () => {
    navigationToggle.setAttribute(
      ATTRIBUTES.ariaExpanded,
      ATTRIBUTES.ariaExpandedClosed,
    );
    navigationList.classList.remove(CLASSES.navigationOpen);
  };

  navigationToggle.addEventListener("click", () => {
    const isOpen =
      navigationToggle.getAttribute(ATTRIBUTES.ariaExpanded) ===
      ATTRIBUTES.ariaExpandedOpen;

    navigationToggle.setAttribute(
      ATTRIBUTES.ariaExpanded,
      isOpen ? ATTRIBUTES.ariaExpandedClosed : ATTRIBUTES.ariaExpandedOpen,
    );

    navigationList.classList.toggle(CLASSES.navigationOpen);
  });

  document.querySelectorAll(SELECTORS.navigationLinks).forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });
}

/**
 * Initialize the "scroll to top" button visibility and click behavior.
 */
function initScrollToTopButton() {
  const scrollToTopButton = document.querySelector(SELECTORS.scrollToTopButton);

  if (!scrollToTopButton) {
    return;
  }

  const updateButtonVisibility = () => {
    const isVisible = window.scrollY > SCROLL.showButtonThreshold;
    scrollToTopButton.classList.toggle(CLASSES.visible, isVisible);
  };

  window.addEventListener("scroll", updateButtonVisibility);

  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateButtonVisibility();
}

/**
 * Main entry point for page initialization.
 */
function init() {
  setCurrentYear();
  initMobileNavigation();
  initScrollToTopButton();
}

document.addEventListener("DOMContentLoaded", init);
