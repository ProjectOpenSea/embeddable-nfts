import { css, customElement, html, LitElement } from 'lit-element'

@customElement('info-button')
export class InfoButtonTemplate extends LitElement {
  static get styles() {
    return css`
      .asset-action-info {
        cursor: pointer;
        transition: 200ms;
        opacity: 0.4;
        backface-visibility: hidden;
      }
      .asset-action-info #info-icon:hover {
        opacity: 1;
      }
    `
  }

  public render() {
    return html`
      <div class="asset-action-info">
        <svg
          id="info-btn"
          @click="${(_e: any) =>
            this.dispatchEvent(new CustomEvent('flip-event'))}"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="transparent" />
          <path
            id="info-icon"
            fill="rgb(82, 87, 89)"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
          />
        </svg>
      </div>
    `
  }
}
