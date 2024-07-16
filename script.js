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
                const parentForm = this.closest("pyro-form");
                if (parentForm) {
                    parentForm.requestSubmit();
                }
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

customElements.define("pyro-textbox", class extends HTMLElement {
    constructor() {
        super();
        this.type = "text";
        this.name = this.getAttribute("name");

        this.attachShadow({mode: "open"});
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);
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

// basically the same as pyro-textbox lol
customElements.define("pyro-password", class extends HTMLElement {
    constructor() {
        super();
        this.type = "password";
        this.name = this.getAttribute("name");

        this.attachShadow({mode: "open"});
        this.input = document.createElement("input");
        this.input.type = "password";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);
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

// basically the same as pyro-textbox lol
customElements.define("pyro-search", class extends HTMLElement {
    constructor() {
        super();
        this.type = "search";
        this.name = this.getAttribute("name");

        this.attachShadow({mode: "open"});
        this.input = document.createElement("input");
        this.input.type = "search";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);
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

// basically the same as pyro-textbox lol
customElements.define("pyro-email", class extends HTMLElement {
    constructor() {
        super();
        this.type = "email";
        this.name = this.getAttribute("name");

        this.attachShadow({mode: "open"});
        this.input = document.createElement("input");
        this.input.type = "email";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);
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

// basically the same as pyro-textbox lol
customElements.define("pyro-url", class extends HTMLElement {
    constructor() {
        super();
        this.type = "url";
        this.name = this.getAttribute("name");

        this.attachShadow({mode: "open"});
        this.input = document.createElement("input");
        this.input.type = "url";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);
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
        this.name = this.getAttribute("name");
        if (this.name) {
            this.value = this.getAttribute("value");
        }

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
        this.name = this.getAttribute("name");
        this.value = this.getAttribute("value");
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

// needs to be reworked so that this actually acts like a file input
customElements.define("pyro-file", class extends HTMLElement {
    constructor() {
        super();
        this.type = "file";
        this.name = this.getAttribute("name");

        this.attachShadow({mode: "open"});
        this.input = document.createElement("input");
        this.input.type = "file";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);
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

// needs to be reworked so that this actually acts like a range input
customElements.define("pyro-range", class extends HTMLElement {
    constructor() {
        super();
        this.type = "range";
        this.name = this.getAttribute("name");

        this.attachShadow({mode: "open"});
        this.input = document.createElement("input");
        this.input.type = "range";
        this.input.setAttribute("part", "input");
        this.shadowRoot.appendChild(this.input);
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
    }

    setupFormSubmission() {
        const form = this.shadowRoot.getElementById("pyro-form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
    
            const formData = new FormData();

            const slot = this.shadowRoot.querySelector("slot");
            const slottedNodes = slot.assignedNodes({ flatten: true });

            slottedNodes.forEach(node => {
                if (node.nodeName.startsWith("PYRO-")) {
                    if (["text", "password", "search", "email", "url"].includes(node.type)) {
                        if (node.name && node.input.value) {
                            formData.append(node.name, node.input.value);
                        }
                    } else if (node.type === "checkbox") {
                        if (node.name && node.input.checked) {
                            console.log(node.name);
                            if (node.input.value) {
                                formData.append(node.name, node.input.value);
                            } else {
                                formData.append(node.name, "on");
                            }
                        }
                    } else if (node.type === "radio") {
                        
                    }
                }
            });

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

    // if the user needs to hook into these events
    beforeSubmitting() {}
    afterSubmitting() {}

    requestSubmit() {
        const form = this.shadowRoot.getElementById("pyro-form");
        this.beforeSubmitting();
        form.requestSubmit();
        this.afterSubmitting();
    }

    submit() {
        const form = this.shadowRoot.getElementById("pyro-form");
        this.beforeSubmitting();
        form.submit();
        this.afterSubmitting();
    }

    reportValidity() {
        const form = this.shadowRoot.getElementById("pyro-form");
        return form.reportValidity();
    }
});
