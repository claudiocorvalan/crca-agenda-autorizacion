import { html, css, LitElement } from 'lit-element';

import 'dile-modal';
import 'dile-input';

export class CrcaAgendaAutorizacion extends LitElement {
  static get styles() {
    return css`
      :host {
        --crca-agenda-autorizacion-text-color: #000;
        color: var(--crca-agenda-autorizacion-text-color);
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      urlAutorizacion: { type: String },
      urlAccion: { type: String },
    };
  }

  constructor() {
    super();
    this.title = '';
    this.urlAccion = '';
    this.valor = '';
  }

  render() {
    return html`
    <dile-modal id="modalAutorizacion" @dile-modal-closed="${this.__closed}">
      <h2>Autorización ${this.title}</h2>
      <dile-input label="Firma Autorizador"></dile-input>
      <button @click=${this.__autorizar}>Autorizar</button>
    </dile-modal>
    `;
  }

  open(title, urlAccion){
    this.title = title;
    this.urlAccion=urlAccion;
    this.shadowRoot.getElementById('modalAutorizacion').open();
  }

  __closed() {
    this.title = '';
    this.urlAccion = '';
    this.valor = '';
  }
}
