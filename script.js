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

/* need to rework the code below */
customElements.define("pyro-input", class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        const input = document.createElement("input");
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