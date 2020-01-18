/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 **/
import {
  LitElement, html, customElement, property, css,
} from 'lit-element';

// import '@polymer/iron-icon/iron-icon.js';
// import '@polymer/iron-icons/iron-icons.js';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <nft-card-front> as an HTML tag.
 */
@customElement('nft-card-front')
export class NftCardFrontTemplate extends LitElement {

  /**
   * Create an observed property. Triggers update on change.
   */

  static get styles() {
    return css`
      .card-front {
        position: absolute;
        backface-visibility: hidden;
        background: #FFFFFF;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        position: relative;
        width: 100%;
        height: 100%;
        /* Remove when done with back face */
        transform: rotateY(180deg);

      }
      .asset-image-container {
        border-right: 1px solid #E2E6EF;
      }
      .asset-details-container {
        display: grid;
        grid-template-rows: auto auto auto;
        grid-template-columns: 2fr 1fr;
        margin: 25px;
        align-items: center;
      }
      .asset-detail {
        display: flex;
      }
      .asset-detail .asset-detail-type {
        width: 115px;
        height: 30px;
        font-size: 12px;
        margin-right: 10px;
      }
      .asset-detail .asset-detail-badge {
        width: 54px;
        height: 30px;
        font-size: 12px;
      }
      .asset-detail-name {
        font-weight: 300;
      }
      .asset-detail-price {
        text-align: right;
      }
      .asset-detail-price-current {
        font-size: 18px;
        font-weight: 400;
      }
      .asset-detail-price-previous {
        font-size: 14px;
        color: #828282;
      }
      .asset-action-buy {
        grid-column-start: 1;
        grid-column-end: 3;
      }
      .asset-action-buy button {
        width: 100%;
        background: #3291E9;
        border-radius: 5px;
        height: 35px;
        color: white;
        font-weight: bold;
        letter-spacing: .5px;
        cursor: pointer;
        transition: 200ms;
        outline: none;
        border-style: none;
      }
      .asset-action-buy button:hover {
        background: rgb(21, 61, 98);
      }
      .asset-action-info {
        position: absolute;
        right: 10px;
        top: 10px;

      }
      .asset-action-info #info-icon {
        cursor: pointer;
        transition: 200ms;
        opacity: .4;
        backface-visibility: hidden;
      }
      .asset-action-info #info-icon:hover {
        opacity: 1;
      }
    `;
  }

  /**
   * eventHandler - Dispatch event allowing parent to handle click event
   *
   * @param  {Object} e the event context
   * @param  {string} type the event context
   * @param  {Object} data the event context
   */
  eventHandler(e, type, data = {}) {
    const event = new CustomEvent('new-event', {
      detail: {
        type,
        data
      }
    });
    this.dispatchEvent(event);
  }

  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    return html`
      <div class="card-front">
        <div class="asset-action-info">
        <svg @click="${(e) => this.eventHandler(e, 'flip')}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="white"/><path id="info-icon"fill="rgb(82, 87, 89)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></div>
        <div class="asset-image-container">
          <img src="https://lh3.googleusercontent.com/kALS3ONoHIo_gbtXDiTiq365fzs6rQt7LnIz1unhqZxeHtqVv8zBu1dmh9mtmOx2Xl55B6bYocjTUBLqYUY99_o9=s250" />
        </div>
        <div class="asset-details-container">
          <div class="asset-detail">
            <div class="pill-container asset-detail-type">
              <pill-element
                imageUrl="https://storage.opensea.io/0x06012c8cf97bead5deae237070f9587f8e7a266d-featured-1556588705.png"
                label="CryptoKitties"
                textColor="#828282"
                border="1px solid #E2E6EF"
              ></pill-element>
            </div>
            <!-- TODO: This badge is optional and must be rendered programmatically -->
            <div class="pill-container asset-detail-badge">
              <pill-element
                label="New"
                backgroundColor="#23DC7D"
                textColor="#FFFFFF"
              ></pill-element>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="asset-detail-name">
            <p>G7 Tigerpunk Persian with a very long name</p>
          </div>
          <div class="asset-detail-price">
            <div class="asset-detail-price-current">Ξ 0.04</div>
            <div class="asset-detail-price-previous">Prev. Ξ 0.04</div>
          </div>
          <div class="asset-action-buy">
            <button @click="${(e) => this.eventHandler(e, 'buy', {buy: 'buyit'})}" >BUY THIS ITEM ❯</button>
          </div>

        </div>
      </div>
    `;
  }
}
