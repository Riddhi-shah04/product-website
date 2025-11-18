(function (window, document) {
  class AutoCapture {
    constructor(config = {}) {
      this.config = config;
      this.trackedElements = new WeakSet();

      // Make sure dataLayer exists
      window.dataLayer = window.dataLayer || [];

      // Start auto-capturing
      this.observeDOM();
      this.trackPageView();
    }

    // Track page views
    trackPageView() {
      this.pushToDataLayer("page_view", {
        url: window.location.href,
        title: document.title,
      });
    }

    // Attach listener for clicks
    attachClickTracking(element) {
      if (this.trackedElements.has(element)) return;

      this.trackedElements.add(element);

      element.addEventListener("click", () => {
        const params = {
          element_text: this.safeValue(element.innerText || element.value),
          element_type: this.safeValue(element.tagName),
          element_id: this.safeValue(element.id),
          element_class: this.safeValue(element.className),
          element_desc: this.safeValue(element.getAttribute("aria-label")),
          page_url: window.location.href,
        };

        this.pushToDataLayer("element_click", params);
      });
    }

    // Traverse DOM to attach tracking
    traverseDOM(root = document.body) {
      const clickableTags = ["BUTTON", "A", "INPUT"];

      const elements = root.querySelectorAll(clickableTags.join(","));
      elements.forEach((el) => this.attachClickTracking(el));
    }

    // Observe for dynamic elements
    observeDOM() {
      this.traverseDOM(); // initial load

      const observer = new MutationObserver(() => {
        this.traverseDOM();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // Push event into dataLayer
    pushToDataLayer(eventName, params) {
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
      if (this.config.debug) {
        console.log(`[AutoCapture] pushed to dataLayer: ${eventName}`, params);
      }
    }

    safeValue(value) {
      return value && value.toString().trim() !== "" ? value.toString().trim() : "NA";
    }
  }

  // Expose globally
  window.AutoCapture = AutoCapture;
})(window, document);
