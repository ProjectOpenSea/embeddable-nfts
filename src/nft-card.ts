/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 **/
import {
  LitElement, html, customElement, property, css
} from 'lit-element';

import './pill.ts';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
@customElement('nft-card')
export class NftCard extends LitElement {

  /**
   * Create an observed property. Triggers update on change.
   */
  @property({type : String})  orientation = 'vertical';

  // @TODO: Add dynamic styles based on orientation prop
  static get styles() {
    return css`
        p {
          margin: 0;
        }
        .card {
          background: #FFFFFF;
          box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
          border-radius: 5px;
          display: grid;
          grid-template-columns: 1fr 2fr;
          position: relative;
          font-family: 'Roboto', sans-serif;
          font-style: normal;
          font-weight: normal;
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
       .asset-action-goto-back {

       }
    `;
  }

  /**
   * Implement `render` to define a template for your element.
   */
  render(){
    /**
     * Use JavaScript expressions to include property values in
     * the element template.
     */
    return html`
    <style>
      @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    </style>
    <div class="card">
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
          <button>BUY THIS ITEM ❯</button>
        </div>

      </div>
    </div>`;
  }
}
