/*
    Components
*/
customElements.define("pyro-nav", class extends HTMLElement {
    connectedCallback() {
        this.setAttribute("role", "navigation");
    }
});

customElements.define("pyro-navitem", class extends HTMLElement {
    connectedCallback() {
        // setup code if needed in the future
    }
});

customElements.define("pyro-button", class extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM tree to the instance.
        const shadow = this.attachShadow({mode: "open"});

        // Create a button element.
        const button = document.createElement("button");
        button.setAttribute("part", "button");

        // Pass attributes and content to the button element.
        button.innerHTML = this.innerHTML;
        this.innerHTML = "";

        // Pass attributes like "disabled" from the custom element to the button element.
        if (this.hasAttribute("disabled")) {
            button.disabled = true;
        }

        // Handle click events.
        button.addEventListener("click", () => {
            this.dispatchEvent(new Event("click"));

            if (this.hasAttribute("data-submit")) {
                this.addEventListener("click", (event) => {
                    const parentForm = this.closest("pyro-form");
                    if (parentForm) {
                        parentForm.requestSubmit();
                    }
                });
            }
        });

        // Append the button to the shadow DOM.
        shadow.appendChild(button);
    }

    // Observe attributes that should be reflected in the button.
    static get observedAttributes() {
        return ["disabled"];
    }

    // Handle attribute changes.
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "disabled") {
            this.shadowRoot.querySelector("button").disabled = this.hasAttribute("disabled");
        }
    }
});

// this is extremely cursed and probably broken in many ways, need to polish later
customElements.define("pyro-form", class PyroForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();
        this.setupFormSubmission();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <form id="pyro-form">
            <slot></slot>
            </form>
        `;
        // Add event listeners to slotted elements
        this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
            this.addEventListenersToSlottedContent();
        });
    }

    addEventListenersToSlottedContent() {
        const slot = this.shadowRoot.querySelector("slot");
        const slottedNodes = slot.assignedNodes({ flatten: true });

        slottedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BUTTON" && node.type === "submit") {
                node.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.requestSubmit();
                });
            }
        });
    }

    setupFormSubmission() {
        const form = this.shadowRoot.getElementById("pyro-form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
    
            const formData = new FormData(form);
            const action = this.getAttribute("action");
            const method = this.getAttribute("method") || "GET";
    
            if (action) {
                try {
                    const response = await fetch(action, {
                        method: method.toUpperCase(),
                        body: method.toUpperCase() === "GET" ? null : formData,
                    });
                    const data = await response.json();
                } catch (error) {
                    console.error("Form submission error:", error);
                }
            }
        });
    }

    requestSubmit() {
        const form = this.shadowRoot.getElementById("pyro-form");
        form.requestSubmit();
    }

    submit() {
        const form = this.shadowRoot.getElementById("pyro-form");
        form.submit();
    }

    reset() {
        const form = this.shadowRoot.getElementById("pyro-form");
        form.reset();
    }

    reportValidity() {
        const form = this.shadowRoot.getElementById("pyro-form");
        return form.reportValidity();
    }
});

customElements.define("pyro-textinput", class extends HTMLElement {
    constructor() {
        super();
        this.type = "text";
        this.attachShadow({mode: "open"});
        const input = document.createElement("input");
        input.type = "text";
        input.setAttribute("part", "input");
        this.shadowRoot.appendChild(input);
    }

    connectedCallback() {
        const input = this.shadowRoot.querySelector("input");
        // Copy attributes from pyro-input to the internal input
        for (let attr of this.attributes) {
            input.setAttribute(attr.name, attr.value);
        }
        // Reflect attributes
        new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                    input.setAttribute(mutation.attributeName, this.getAttribute(mutation.attributeName));
                }
            }
        }).observe(this, {attributes: true});
    }
});

customElements.define("pyro-checkbox", class extends HTMLElement {
    constructor() {
        super();
        this.type = "checkbox";
        this.attachShadow({mode: "open"});

        this.input = document.createElement("input");
        this.input.type = "checkbox";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);

        if (this.textContent) {
            this.label = document.createElement("label");
            this.label.textContent = this.textContent;
            this.label.setAttribute("part", "label");
            this.shadowRoot.appendChild(this.label);
        }
    }

    connectedCallback() {
        // Handle label click to focus input
        if (this.textContent) {
            this.label.addEventListener("click", () => {
                this.input.checked ^= 1;
            });
        }
        const input = this.shadowRoot.querySelector("input");
        // Copy attributes from pyro-input to the internal input
        for (let attr of this.attributes) {
            input.setAttribute(attr.name, attr.value);
        }
        // Reflect attributes
        new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                    input.setAttribute(mutation.attributeName, this.getAttribute(mutation.attributeName));
                }
            }
        }).observe(this, {attributes: true});
    }
});

customElements.define("pyro-radio", class extends HTMLElement {
    constructor() {
        super();
        this.type = "radio";
        this.attachShadow({mode: "open"});

        this.input = document.createElement("input");
        this.input.type = "radio";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);

        if (this.textContent) {
            this.label = document.createElement("label");
            this.label.textContent = this.textContent;
            this.label.setAttribute("part", "label");
            this.shadowRoot.appendChild(this.label);
        }
    }

    connectedCallback() {
        // Handle label click to focus input
        if (this.textContent) {
            this.label.addEventListener("click", () => {
                this.input.checked = true;
                this.uncheckOthers();
            });
        }
        // Uncheck other radio buttons
        this.input.addEventListener("change", () => {
            if (this.input.checked) {
                this.uncheckOthers();
            }
        });
        const input = this.shadowRoot.querySelector("input");
        // Copy attributes from pyro-input to the internal input
        for (let attr of this.attributes) {
            input.setAttribute(attr.name, attr.value);
        }
        // Reflect attributes
        new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                    input.setAttribute(mutation.attributeName, this.getAttribute(mutation.attributeName));
                }
            }
        }).observe(this, {attributes: true});
    }

    uncheckOthers() {
        const parentForm = this.closest("pyro-form");
        let radios;
        if (parentForm) {
            radios = parentForm.querySelectorAll(`pyro-radio[name="${this.input.name}"]`);
        } else {
            radios = document.querySelectorAll(`pyro-radio[name="${this.input.name}"]:not(pyro-form pyro-radio)`);
        }
        radios.forEach(radio => {
            if (radio !== this) {
                radio.input.checked = false;
            }
        });
    }

    static get observedAttributes() {
        return ["name", "checked"];
    }
});