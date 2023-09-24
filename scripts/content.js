let actionsInProgress = false;

function waitForElement(selector) {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const element =
        typeof selector === "function"
          ? selector()
          : document.querySelector(selector);
      if (element) {
        clearInterval(checkInterval);
        resolve(element);
      }
    }, 100);
  });
}

async function performActions() {
  if (actionsInProgress) return;

  try {
    actionsInProgress = true;

    console.log("[RapidReport: initialized...]");

    let next_button = await waitForElement(
      '[data-testid="ChoiceSelectionNextButton"]'
    );
    console.log("[RapidReport: reporting...]");

    let spam = await waitForElement('[aria-posinset="6"]');
    spam.click();

    next_button.click();

    let block = await waitForElement(
      '[data-viewportview="true"] [role="button"]:last-of-type'
    );
    block.click();

    console.log("[RapidReport: Report submitted!]");
  } catch (error) {
    console.error(error);
  } finally {
    actionsInProgress = false;
  }
}

(function () {
  "use strict";

  if (
    document.readyState == "complete" ||
    document.readyState == "loaded" ||
    document.readyState == "interactive"
  ) {
    // already loaded
    setInterval(performActions, 1000);
  } else {
    document.addEventListener("DOMContentLoaded", function (event) {
      // just loaded
      setInterval(performActions, 1000);
    });
  }
})();
