/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 **/
import {LitElement, html, customElement, property, css} from 'lit-element'

import {classMap} from 'lit-html/directives/class-map'
import {styleMap} from 'lit-html/directives/style-map'

const BTN_TEXT = {
  'manage': 'manage this item ❯',
  'buy': 'buy this item ❯',
  'view': 'view on opensea 🚢 ❯'
}

@customElement('nft-card-front')
export class NftCardFrontTemplate extends LitElement {
  @property({type: Object}) asset = {}
  @property({type: String}) acount;
	@property({type: Object}) loading = true
	@property({type: Boolean}) vertical

	constructor() {
		super()
	}

	static get styles() {
		return css`
      .card-front {
        position: absolute;
        backface-visibility: hidden;
        background: #ffffff;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        position: relative;
        width: 100%;
        height: 100%;
        /* Remove when done with back face */
        /* display: none; */
      }
      .is-vertical {
        grid-template-columns: 1fr;
        grid-template-rows: 60% 40%;
      }
      .card-front p {
        margin: 0;
      }

      .asset-image-container {
        border-right: 1px solid #e2e6ef;
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
        height: 100%;
      }

      .is-vertical .asset-image-container {
        border-bottom: 1px solid #e2e6ef;
        border-right: none;
        height: min-content;
        margin-top: 0;
        height: 100%;
        width: 100%;
      }
      .asset-image-container img {
        width: 100%;
      }
      .is-vertical .asset-image-container img {
        width: 100%;
        height: 100%;
        /* width: auto; */
      }
      .asset-details-container {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr;
        padding: 25px;
        align-items: center;
      }
      .asset-detail {
        display: flex;
      }
      .asset-detail .asset-detail-type {
        width: 100%;
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
        text-align: left;
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
        background: #3291e9;
        border-radius: 5px;
        height: 35px;
        color: white;
        font-weight: bold;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: 200ms;
        outline: none;
        border-style: none;
        text-transform: uppercase;
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
        opacity: 0.4;
        backface-visibility: hidden;
      }
      .asset-action-info #info-icon:hover {
        opacity: 1;
      }
    `
	}

	/**
   * EventHandler - Dispatch event allowing parent to handle click event
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
    })
    this.dispatchEvent(event)
	}

	connectedCallback() {
		super.connectedCallback();
		// setTimeout(() => this.eventHandler('','flip'), 10);
		// console.warn('I flip card for testing remove me later')
	}

	updated(changedProperties: array) {
		// Assumption: If the traitData gets updated we should rebuild the
		// traits object that populates UI
		// Assumption: This will ONLY get called once per refresh
		changedProperties.forEach((oldValue, propName) => {
			if (propName === 'asset') {
				// We got the data so we are done loading
				this.loading = false

        // Check for a sell order to populate the UI with the sell information
        if(this.asset.sellOrders.length > 0) {
          this.canBuy = true
          const order = this.asset.sellOrders[0]
          const token = order.paymentTokenContract
          const currentPrice = order.currentPrice.toFixed() / Math.pow(10, token.decimals)
          const expires = order.expirationTime.toFixed()

          this.sellOrder = {
            token,
            currentPrice,
            ...this.prevPrice,
            expires
          }
        }

				// Tell the component to update with new state
				this.requestUpdate()
			}
		})
	}



  getAssetImageTemplate(imageUrl) {
		return (html`
      <div class="asset-image-container">
        <img src="${imageUrl}" />
      </div>
    `)
  }

  getAssetPriceTemplate() {
    // TODO: Needs to account for tokens with images not symbols
    // Maybe change ethereum to an image instead of symbol?
    let prevPriceTemplate = ''
    let currentPriceTemplate = ''

    if(this.sellOrder) {
      const currentPriceSymbol = this.sellOrder.token.symbol === 'ETH' ? 'Ξ ' : ''
      currentPriceTemplate = html`<div class="asset-detail-price-current">${currentPriceSymbol} ${this.sellOrder.currentPrice}</div>`
    }

    if(this.asset.lastSale) {
      const formattedPrevPrice = this.asset.lastSale.total_price / Math.pow(10, this.asset.lastSale.payment_token.decimals)
      const prevPriceSymbol = this.asset.lastSale.payment_token.symbol === 'ETH' ? 'Ξ ' : ''
      prevPriceTemplate = html`<div class="asset-detail-price-previous">Prev. ${prevPriceSymbol} ${formattedPrevPrice}</div>`
    }

    return (html`
    <div class="asset-detail-price">
      ${currentPriceTemplate}
      ${prevPriceTemplate}
    </div>
    `)
  }

  getButtonTemplate() {
    let btnType;
    if(this.asset.isOwnedByAccount) {
      btnType = 'manage'
    } else if (this.canBuy) {
      btnType = 'buy'
    } else if (!this.canBuy) {
      btnType = 'view'
    }

    return html`
      <button
        @click="${e => this.eventHandler(e, btnType)}"
      >
        ${BTN_TEXT[btnType]}
      </button>
    `
  }

	/**
   * Implement `render` to define a template for your element.
   */
	render() {
		if (this.isLoading) return html``;
		return html`
      <div class="card-front ${classMap({'is-vertical': this.vertical})}">
        <div class="asset-action-info">
          <svg
            id="info-btn"
            @click="${e => this.eventHandler(e, 'flip')}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="white" />
            <path
              id="info-icon"
              fill="rgb(82, 87, 89)"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            />
          </svg>
        </div>

        <div
          class="asset-image-container"
          style=${styleMap({'background-image': `url(${this.asset.imageUrl})`})}
        ></div>
        <div class="asset-details-container">
          <div class="asset-detail">
            <div class="pill-container asset-detail-type">
              <pill-element
                .imageUrl=${this.asset.assetContract.imageUrl}
                .label=${this.asset.assetContract.name}
                textColor="#828282"
                border="1px solid #E2E6EF"
              ></pill-element>
            </div>
            <!-- TODO: This badge is optional and must be rendered programmatically -->
            <!-- <div class="pill-container asset-detail-badge">
              <pill-element
                label="New"
                backgroundColor="#23DC7D"
                textColor="#FFFFFF"
              ></pill-element>
            </div> -->
          </div>
          <div class="spacer"></div>
          <div class="asset-detail-name">
            <p>${this.asset.name}</p>
          </div>
          ${this.getAssetPriceTemplate()}
          <div class="asset-action-buy">
            ${this.getButtonTemplate()}
          </div>
        </div>
      </div>
    `
	}
}
