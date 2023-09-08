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

    // "Start report"
    let element = await waitForElement(
      '[data-testid="OCF_CallToAction_Button"]'
    );
    element.click();

    /* Who is this report for? */

    // "Everyone on X"
    element = await waitForElement('[aria-posinset="3"]');
    element.click();

    // "Next"
    element = await waitForElement('[data-testid="ChoiceSelectionNextButton"]');
    element.click();

    /* What is happening to everyone on X? */

    // "Spam"
    element = await waitForElement('[aria-posinset="3"]');
    element.click();

    // "Next"
    element = await waitForElement('[data-testid="ChoiceSelectionNextButton"]');
    element.click();

    /* How is @scammer doing this? */

    // "Posting misleading or deceptive links, leading to scams, phishing, or other malicious links"
    element = await waitForElement('[aria-posinset="1"]');
    element.click();

    // Next
    element = await waitForElement('[data-testid="ChoiceSelectionNextButton"]');
    element.click();

    /* It sounds like you want to make a report for platform manipulation and spam */

    // "Yes, continue"
    element = await waitForElement('[data-testid="ocfSettingsListNextButton"]');
    element.click();

    /* Let's make sure we have this right */

    // "Submit"
    element = await waitForElement('[data-testid="ocfSettingsListNextButton"]');
    element.click();

    /* Thanks for helping make X better for everyone */

    // "Block @scammer"
    const blockButton = await waitForElement(() => {
      let buttons = document.querySelectorAll(
        'div[role="button"] > div > span'
      );
      for (const btn of buttons) {
        if (btn.innerHTML.includes("Block ")) {
          return btn;
        }
      }
      return null;
    });
    blockButton.click();

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
