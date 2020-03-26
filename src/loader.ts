import { css, customElement, html, LitElement } from 'lit-element'

@customElement('loader-element')
export class Loader extends LitElement {
  static get styles() {
    return css`
      @keyframes pulse-opacity {
        0% {
          opacity: 1;
        }
        16.666% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .Loading {
        transform: translate(-50%, -50%) rotate(30deg);
        height: 81px;
        width: 90px;
        position: absolute;
        left: 50%;
        top: 50%;
      }
      .Loading .tri.upwards {
        border-top: 0;
        border-bottom: 27px solid #fff;
      }
      .Loading .tri:first-child {
        left: 15px;
        border-bottom-color: #00c9a4;
      }
      .Loading .tri:nth-child(2) {
        left: 30px;
        animation-delay: 0.1s;
        border-top-color: #00ffd0;
      }
      .Loading .tri:nth-child(3) {
        left: 45px;
        animation-delay: 0.2s;
        border-bottom-color: #00d7d1;
      }
      .Loading .tri:nth-child(4) {
        left: 45px;
        top: 27px;
        animation-delay: 0.3s;
        border-top-color: #0095be;
      }
      .Loading .tri:nth-child(5) {
        top: 27px;
        left: 30px;
        animation-delay: 0.4s;
        border-bottom-color: #007296;
      }
      .Loading .tri:nth-child(6) {
        top: 27px;
        left: 15px;
        animation-delay: 0.5s;
        border-top-color: #1c1f27;
      }
      .Loading .tri,
      .Loading .tri.upwards {
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
      }
      .Loading .tri {
        position: absolute;
        opacity: 0;
        animation: pulse-opacity 0.6s ease-in infinite;
        border-top: 27px solid #fff;
        border-bottom: 0;
      }
    `
  }
  public render() {
    return html`
      <div class="Loading">
        <div class="tri upwards"></div>
        <div class="tri"></div>
        <div class="tri upwards"></div>
        <div class="tri"></div>
        <div class="tri upwards"></div>
        <div class="tri"></div>
      </div>
    `
  }
}
