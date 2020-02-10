import { html, css, LitElement } from 'lit-element';
import Axios from 'axios';
import qs from 'qs';

import 'dile-modal';
import './dile-input-type';

export class CrcaAgendaAutorizacion extends LitElement {
  static get styles() {
    return css`
      :host {
        --dile-input-error-border-color: #dc3545;
        --dile-input-label-color: var(--crca-agenda-autorizacion-text-color, #000);
        color: var(--crca-agenda-autorizacion-text-color, #000);
      }
      ul {
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
      error: { type: Array }
    };
  }

  constructor() {
    super();
    this.title = '';
    this.urlAccion = '';
    this.dataId = 0;
    this.error = [];
  }

  render() {
    return html`
    <dile-modal id="modalAutorizacion" @dile-modal-closed="${this.__closed}">
      <h2>Autorización ${this.title}</h2>
      <dile-input-type
        id="input" 
        type="password"
        label="Firma Autorizador" 
        @enter-pressed=${this.__autorizar}
        ?errored=${this.__hasError(this.error)}>
      </dile-input-type>
      ${this.__hasError(this.error) 
        ? html`<ul>${ this.error.error.map( e => html`<li>${e}</li>`) }</ul>` 
        : ''}
      <button @click=${this.__autorizar}>Autorizar</button>
    </dile-modal>
    `;
  }

  open(title, urlAccion, dataId){
    this.title = title;
    this.urlAccion = urlAccion;
    this.dataId = dataId;
    this.error = [];
    this.shadowRoot.getElementById('modalAutorizacion').open();
  }

  __autorizar() {
    const data = { 'autorizacion_form[firma]': this.shadowRoot.getElementById('input').value };

    Axios.post(this.urlAutorizacion, qs.stringify(data))
    .then( response => {
      if(response.data['success']!== undefined){
        const dataAccion = {
          autorizadorId: response.data.success.autorizadorId,
          data: this.dataId
        } 
        Axios.post(this.urlAccion, dataAccion)
        .then(response => {
            if(response.data.success !== undefined) {
              window.location.reload;
            }
            else {
              console.log(response.data.error);
              this.dispatchEvent(new CustomEvent('show-error-toast', { detail: response.data.error }));
            }
         })
      }
      else {
        this.error=response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
      this.dispatchEvent(new CustomEvent('show-error-toast', { detail: error }));
    });
  }

  __closed() {
    this.title = '';
    this.urlAccion = '';
    this.dataId = 0;
    this.error = [];
  }

  __hasError(er) {
    return er.error !== undefined;
  }
}
