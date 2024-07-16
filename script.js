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

customElements.define("pyro-button", class extends HTMLButtonElement {
    connectedCallback() {
        this.style.display = "block";
    }
}, {extends: "button"});

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
        const parentForm = this.closest("form");
        let radios;
        if (parentForm) {
            radios = parentForm.querySelectorAll(`pyro-radio[name="${this.input.name}"]`);
        } else {
            radios = document.querySelectorAll(`pyro-radio[name="${this.input.name}"]:not(form pyro-radio)`);
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