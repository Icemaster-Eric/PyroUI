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