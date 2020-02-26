/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 */
import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult
} from 'lit-element'

import {classMap} from 'lit-html/directives/class-map'
import {styleMap} from 'lit-html/directives/style-map'

import {OpenSeaAsset, OpenSeaFungibleToken, Order, Network} from 'opensea-js/lib/types'

enum ButtonType {
  Manage = 'manage',
  Buy = 'buy',
  View = 'view',
  SwitchNetwork = 'switchNetwork',
  Unlock = 'unlock'
}

const BTN_TEXT: {[index: string]: string} = {
  [ButtonType.Manage]: 'manage this item ❯',
  [ButtonType.Buy]: 'buy this item ❯',
  [ButtonType.View]: 'view on openSea ❯',
  [ButtonType.SwitchNetwork]: 'switch to ',
  [ButtonType.Unlock]: 'buy this item ❯'
}

interface LastSaleData {
  paymentToken?: OpenSeaFungibleToken
  currentPrice: number
  expires: Date
}

interface State {
  isOwnedByAccount: boolean
  isMatchingNetwork: boolean
  isUnlocked: boolean
  hasWeb3: boolean
  network: Network
}

@customElement('nft-card-front')
export class NftCardFrontTemplate extends LitElement {

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
        padding: 26px;
        background-size: cover;
        box-sizing: border-box;
      }

      .asset-image {
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
        height: 100%;
      }

      .is-vertical .asset-image-container {
        border-bottom: 1px solid #e2e6ef;
        border-right: none;
        width: 100%;
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
        height: 35px;
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
  @property({type: Object}) public asset!: OpenSeaAsset
  @property({type: Boolean}) public isOwnedByAccount!: boolean
  @property({type: String}) public account!: string
  @property({type: Boolean}) public horizontal!: boolean
  @property({type: Object}) public state!: State

  @property({type: Boolean}) private isLoading: boolean = true
  @property({type: Object}) private lastSaleData?: LastSaleData

  public updated(changedProperties: Map<string, string>) {
    // Assumption: If the traitData gets updated we should rebuild the
    // traits object that populates UI
    // Assumption: This will ONLY get called once per refresh
    changedProperties.forEach((_oldValue: string, propName: string) => {
      if (propName === 'asset') {
        // We got the data so we are done loading
        this.isLoading = false

        // Check for a sell order to populate the UI with the sell information
        // TODO: We will be using lastSale here once added to SDK
        if (this.asset.sellOrders!.length > 0) {
          const order: Order = this.asset.sellOrders![0]
          const paymentToken = order.paymentTokenContract
          const currentPrice = +order.currentPrice!.toFixed() / Math.pow(10, paymentToken!.decimals)
          const expires = new Date(order.expirationTime.toFixed())

          this.lastSaleData = {
            paymentToken,
            currentPrice,
            expires
          }
        }

        // Tell the component to update with new state
        this.requestUpdate()
      }
    })
  }

  public getAssetImageTemplate(imageUrl: string) {
    return (html`
      <div class="asset-image-container">
        <img src="${imageUrl}"  alt=""/>
      </div>
    `)
  }

  public getAssetPriceTemplate() {
    // TODO: Needs to account for tokens with images not symbols
    // If payment_token.image_url then use token image instead of symbol
    let prevPriceTemplate: TemplateResult = html``
    let currentPriceTemplate: TemplateResult = html``

    if (this.lastSaleData) {
      const currentPriceSymbol = this.lastSaleData.paymentToken!.symbol === 'ETH' ? 'Ξ ' : ''
      currentPriceTemplate = html`<div class="asset-detail-price-current">${currentPriceSymbol} ${this.lastSaleData.currentPrice}</div>`
    }

    if (this.asset.lastSale) {
      // @ts-ignore ignore until LastSale type gets added to SDK
      const formattedPrevPrice = this.asset.lastSale.total_price / Math.pow(10, this.asset.lastSale.payment_token.decimals)
      // @ts-ignore ignore until LastSale type gets added to SDK
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

  /**
   * Implement `render` to define a template for your element.
   */
  public render() {
    if (this.isLoading) { return html`front loading` }
    return html`
      <div class="card-front ${classMap({'is-vertical': !this.horizontal})}">
        <div class="asset-action-info">
          <svg
            id="info-btn"
            @click="${(e: any) => this.eventHandler(e, 'flip')}"
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

        <div class="asset-image-container">
          <div
            class="asset-image"
            style=${styleMap({'background-image': `url(${this.asset.imageUrl})`})}
          ></div>
        </div>

        <div class="asset-details-container">
          <div class="asset-detail">
            <div class="asset-detail-type">
              <pill-element
                .imageUrl=${this.asset.assetContract.imageUrl}
                .label=${this.asset.assetContract.name}
                textColor="#828282"
                border="1px solid #E2E6EF"
              ></pill-element>
            </div>
            <!-- TODO: This badge is optional and must be rendered programmatically -->
            <!-- <div class="asset-detail-badge">
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

  /*
   * EventHandler - Dispatch event allowing parent to handle click event
   * '_event' isn't used here but it's needed to call the handler
   */
  private eventHandler(_event: any, type: string) {
    const buttonEvent = new CustomEvent('button-event', {
      detail: {
        type
      }
    })
    this.dispatchEvent(buttonEvent)
  }

  private getButtonTemplate() {

    let btnType: ButtonType

    if (this.state.hasWeb3) {
      if (this.state.isUnlocked) {
        if (this.state.isMatchingNetwork) {
          if (this.state.isOwnedByAccount) {
            // The account owns asset
            btnType = ButtonType.Manage
          } else {
            // Asset is for sale and not owned by currently selected account
            btnType = ButtonType.Buy
          }
        } else {
          // Network does not match or connected to unsupported network
          btnType = ButtonType.SwitchNetwork // "switchNetwork" + this.state.network
        }
      } else {
        // Wallet is locked or access not granted
        btnType = ButtonType.Unlock
      }
    } else {
      // No injected web3 found
      btnType = ButtonType.View
    }
    const btnText: string = btnType === ButtonType.SwitchNetwork ? BTN_TEXT[btnType] + this.state.network : BTN_TEXT[btnType]
    return html`
      <button
        @click="${(e: any) => this.eventHandler(e, btnType)}"
      >
        ${btnText}
      </button>
    `
  }
}
