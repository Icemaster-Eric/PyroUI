import {LitElement, css, html} from "./lit-core.min.js";

class PyroButton extends LitElement {
    static styles = css`
        button {
            font-family: inherit;
            font-size: inherit;
            cursor: pointer;
        }
        button:disabled {
            cursor: not-allowed;
        }
        button[secondary] {
            background-color: gray;
        }
    `;

    static properties = {
        disabled: { type: Boolean, reflect: true },
        secondary: { type: Boolean, reflect: true },
    };

    constructor() {
        super();
        this.disabled = false;
        this.secondary = this.getAttributeNames().includes("secondary");
    }

    render() {
        return html`
        <button ?disabled="${this.disabled}" ?secondary="${this.secondary}">
            <slot></slot>
        </button>
        `;
    }
}

customElements.define("pyro-button", PyroButton);
