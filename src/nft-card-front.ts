import {
  LitElement,
  html,
  customElement,
  property,
  css,
  TemplateResult
} from 'lit-element'

import { classMap } from 'lit-html/directives/class-map'
import { styleMap } from 'lit-html/directives/style-map'

import { OpenSeaAsset, OpenSeaFungibleToken, Order, Network } from 'opensea-js/lib/types'

/* lit-element classes */
import './info-button'

enum ButtonType {
  Manage = 'manage',
  Buy = 'buy',
  View = 'view',
  SwitchNetwork = 'switchNetwork',
  Unlock = 'unlock'
}

const BTN_TEXT: { [index: string]: string } = {
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

const TOKEN_DECIMALS = 18

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
        transform: translateY(0);
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
        padding: 20px;
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
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        align-items: center;
      }
      .asset-detail-price-current img {
         width: 15px;
      }
      .asset-detail-price-current-value {
        margin-left: 5px;
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
      .asset-link {
        text-decoration: none;
        color: #222222;
      }
    `
  }
  @property({type: Object}) public asset?: OpenSeaAsset
  @property({type: Boolean}) public isOwnedByAccount!: boolean
  @property({type: String}) public account!: string
  @property({type: Boolean}) public horizontal!: boolean
  @property({type: Object}) public state!: State

  @property({type: Object}) private lastSaleData?: LastSaleData

  public updated(changedProperties: Map<string, string>) {
    // Assumption: If the traitData gets updated we should rebuild the
    // traits object that populates UI
    // Assumption: This will ONLY get called once per refresh
    changedProperties.forEach(async (_oldValue: string, propName: string) => {
      if (propName === 'asset') {

        // Check for a sell order to populate the UI with the sell information
        // TODO: We will be using lastSale here once added to SDK
        if (this.asset?.sellOrders && this.asset.sellOrders.length > 0) {
          const order: Order = this.asset.sellOrders[0]
          console.log(order)
          const paymentToken = order.paymentTokenContract
          const decimals = paymentToken ? paymentToken.decimals : TOKEN_DECIMALS // Default decimals to 18
          const currentPrice = order.currentPrice ? +order.currentPrice.toFixed() / Math.pow(10, decimals) : 0
          const expires = new Date(order.expirationTime.toFixed())

          this.lastSaleData = {
            paymentToken,
            currentPrice,
            expires
          }
        }

        // Tell the component to update with new state
        await this.requestUpdate()
      }
    })
  }

  private getCurrentPriceTemplate(paymentToken: OpenSeaFungibleToken, currentPrice: number) {
    return html`
      <div class="asset-detail-price-current">
            ${ paymentToken.imageUrl ?  
                html`<img src="${paymentToken.imageUrl}" alt="" ></img>` 
                : paymentToken.symbol 
              }
            <div class="asset-detail-price-current-value">${currentPrice}</div>
      </div>
    `
  }

  public getAssetPriceTemplate() {
    // TODO: Needs to account for tokens with images not symbols
    // If payment_token.image_url then use token image instead of symbol
    let prevPriceTemplate: TemplateResult = html``
    let currentPriceTemplate: TemplateResult = html``

    if (this.lastSaleData?.paymentToken) {
      // const currentPriceSymbol = this.lastSaleData.paymentToken.symbol === 'ETH' ? 'Ξ ' : ''
      currentPriceTemplate = this.getCurrentPriceTemplate(this.lastSaleData.paymentToken, this.lastSaleData.currentPrice)

    }

    if (this.asset?.lastSale) {
      // @ts-ignore ignore until LastSale type gets added to SDK
      const formattedPrevPrice = this.asset.lastSale.total_price / Math.pow(10, this.asset.lastSale.payment_token.decimals)
      // @ts-ignore ignore until LastSale type gets added to SDK
      const prevPriceSymbol = this.asset.lastSale.payment_token.symbol === 'ETH' ? 'Ξ ' : ''
      prevPriceTemplate = html`<div class="asset-detail-price-previous">Prev. ${prevPriceSymbol} ${formattedPrevPrice}</div>`
    }

    return (html`
    <div class="asset-detail-price">
      <a class="asset-link" href="${this.asset?.openseaLink}" target="_blank">
        ${currentPriceTemplate}
        ${prevPriceTemplate}
       </a>
    </div>
    `)
  }

  /**
   * Implement `render` to define a template for your element.
   */
  public render() {
    if (!this.asset) {
      return undefined // If there is no asset then we can't render
    }
    return html`
      <div class="card-front ${classMap({'is-vertical': !this.horizontal})}">
        <info-button
            style="position: absolute; top: 5px; left: 5px"
            @flip-event="${(e: any) => this.eventHandler(e, 'flip')}"
        ></info-button>

        ${this.getAssetImageTemplate()}

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
            <!-- This badge is optional and must be rendered programmatically -->
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
            <a class="asset-link" href="${this.asset.openseaLink}" target="_blank">${this.asset.name}</a>
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
  public eventHandler(_event: any, type: string) {
    const buttonEvent = new CustomEvent('button-event', {
      detail: {
        type
      }
    })
    this.dispatchEvent(buttonEvent)
  }

  private getAssetImageTemplate() {
    return (html`
      <div class="asset-image-container">
            <a href="${this.asset?.openseaLink}" target="_blank">
                  <div
                      class="asset-image"
                      style=${styleMap({'background-image': `url(${this.asset?.imageUrl})`})}
                  ></div>
            </a>
        </div>
    `)
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
    // If we are informing the user to switch networks we need to append the
    // network on which the asset resides
    const btnText: string = btnType === ButtonType.SwitchNetwork ? BTN_TEXT[btnType] + this.state.network : BTN_TEXT[btnType]
    const btnStyle = btnType === ButtonType.SwitchNetwork ? styleMap({'background': 'rgb(183, 183, 183)', 'cursor': 'not-allowed'}) : ''

    return html`
      <button
        style=${btnStyle}
        @click="${(e: any) => this.eventHandler(e, btnType)}"
      >
        ${btnText}
      </button>
    `
  }
}
