import { html, css, LitElement } from 'lit-element';
import { axios} from 'axios';
import qs from 'qs';

import 'dile-modal';
import 'dile-input';

export class CrcaAgendaAutorizacion extends LitElement {
  static get styles() {
    return css`
      :host {
        --dile-input-error-border-color: #dc3545;
        --dile-input-label-color: var(--crca-agenda-autorizacion-text-color, #000);
        color: var(--crca-agenda-autorizacion-text-color, #000);
      }
      div {
        color: var(--dile-input-error-border-color);
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      urlAutorizacion: { type: String },
      urlAccion: { type: String },
      dataId: { type: Number },
      error: { type: String }
    };
  }

  constructor() {
    super();
    this.title = '';
    this.urlAccion = '';
    this.dataId = 0;
    this.error = '';
  }

  render() {
    return html`
    <dile-modal id="modalAutorizacion" @dile-modal-closed="${this.__closed}">
      <h2>Autorización ${this.title}</h2>
      <dile-input 
      id="input" 
      label="Firma Autorizador" 
      @enter-pressed=${this.__autorizar}
      ?errored=${this.__hasError(this.error)}></dile-input>
      ${this.__hasError(this.error) 
        ? html`<div>${this.error}</div>` 
        : ''}
      <button @click=${this.__autorizar}>Autorizar</button>
    </dile-modal>
    `;
  }

  open(title, urlAccion, dataId){
    this.title = title;
    this.urlAccion = urlAccion;
    this.dataId = dataId;
    this.shadowRoot.getElementById('modalAutorizacion').open();
  }

  __autorizar() {
    const data = { 'id': this.shadowRoot.getElementById('input').value };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: this.urlAutorizacion,
    };
    
    axios(options)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  __closed() {
    this.title = '';
    this.urlAccion = '';
    this.dataId = 0;
    this.error = '';
  }

  __hasError(er) {
    return er.lenght>0;
  }
}
