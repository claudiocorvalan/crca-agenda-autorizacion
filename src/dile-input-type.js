import { html } from 'lit-element';
import { DileInput } from 'dile-input';

class DileInputType extends DileInput {

  static get properties() {
    return {
      type: { type: String }
    };
  }

  constructor() {
    super();
    this.type="text";
  }

  render() {
    return html`
    <div>
      ${this.label
        ? html`<label for="textField">${this.label}</label>`
        : ''
      }
      <input
        type="${this.type}"
        id="textField"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        @keypress="${this._lookForEnter}"
        @input="${this._input}"
        .value="${this.value}"
        class="${ this.errored ? 'errored' : '' }">
    </div>
    `;
  }
}

customElements.define('dile-input-type', DileInputType);