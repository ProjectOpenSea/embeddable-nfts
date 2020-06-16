import { css, customElement, html, LitElement, property } from 'lit-element'

import { classMap } from 'lit-html/directives/class-map'
import { styleMap } from 'lit-html/directives/style-map'

import {
  Network,
  OpenSeaAsset,
  OpenSeaCollection,
  OpenSeaFungibleToken
} from 'opensea-js/lib/types'
/* lit-element classes */
import './info-button'
import { toBaseDenomination } from './utils'
import { ButtonType, PriceType, State } from './types'
import { BTN_TEXT } from './constants'

@customElement('nft-card-front')
export class NftCardFrontTemplate extends LitElement {
  @property({ type: Object }) public asset?: OpenSeaAsset
  @property({ type: Boolean }) public isOwnedByAccount!: boolean
  @property({ type: String }) public account!: string
  @property({ type: Boolean }) public horizontal!: boolean
  @property({ type: Object }) public state!: State

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
        overflow: hidden;
      }
      .is-vertical {
        grid-template-columns: 100%;
        grid-template-rows: 60% 40%;
      }
      .card-front p {
        margin: 0;
      }

      .asset-image-container {
        border-right: 1px solid #e2e6ef;
        background-size: cover;
        box-sizing: border-box;
      }

      .asset-image {
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
        height: 100%;
        box-sizing: border-box;
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
        font-weight: 400;
        text-align: left;
      }
      .asset-detail-price {
        align-items: flex-end;
        font-size: 18px;
        font-weight: 400;
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        line-height: 15px;
        text-align: right;
        padding: 6px 0;
      }
      .asset-detail-price img {
        margin: 0 4px;
      }
      .asset-detail-price-current img {
        width: 15px;
      }
      .asset-detail-price-previous {
        font-size: 14px;
        color: rgb(130, 130, 130);
        line-height: 10px;
      }
      .asset-detail-price-previous img {
        width: 1ex;
      }
      .asset-detail-price .value {
        margin-left: 5px;
      }
      .asset-detail-price .previous-value {
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

  private static getAssetImageStyles(collection: OpenSeaCollection) {
    // @ts-ignore - since card_display_style is not serialized by opensea sdk yet
    const cardDisplayStyle = collection.displayData.card_display_style
    return {
      padding: cardDisplayStyle === 'padded' ? '10px' : '',
      'background-size': `${cardDisplayStyle}`
    }
  }

  public getAssetPriceTemplate() {
    const sellOrder =
      this.asset?.sellOrders && this.asset?.sellOrders.length > 0
        ? this.asset.sellOrders[0]
        : null
    const currentPriceTemplate =
      sellOrder && sellOrder?.paymentTokenContract
        ? this.getPriceTemplate(
            PriceType.Current,
            sellOrder?.paymentTokenContract,
            sellOrder?.currentPrice?.toNumber() || 0
          )
        : null

    const prevPriceTemplate = this.asset?.lastSale?.paymentToken
      ? this.getPriceTemplate(
          PriceType.Previous,
          this.asset?.lastSale?.paymentToken,
          +this.asset?.lastSale?.totalPrice
        )
      : null

    return html`
      <a class="asset-link" href="${this.asset?.openseaLink}" target="_blank">
        ${currentPriceTemplate} ${prevPriceTemplate}
      </a>
    `
  }

  /**
   * Implement `render` to define a template for your element.
   */
  public render() {
    if (!this.asset) {
      return undefined // If there is no asset then we can't render
    }

    const { openseaLink, collection, name } = this.asset
    const { network } = this.state

    return html`
      <div class="card-front ${classMap({ 'is-vertical': !this.horizontal })}">
        ${this.asset.traits.length > 0
          ? html`
              <info-button
                style="position: absolute; top: 5px; right: 5px"
                @flip-event="${(e: any) => this.eventHandler(e, 'flip')}"
              ></info-button>
            `
          : ''}
        ${this.getAssetImageTemplate()}

        <div class="asset-details-container">
          <div class="asset-detail">
            <div class="asset-detail-type">
              <a
                class="asset-link"
                href="http://${network === Network.Rinkeby
                  ? 'rinkeby.'
                  : ''}opensea.io/assets/${collection.slug}"
                target="_blank"
              >
                <pill-element
                  .imageUrl=${collection.imageUrl}
                  .label=${collection.name}
                  textColor="#828282"
                  border="1px solid #E2E6EF"
                ></pill-element>
              </a>
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
            <a class="asset-link" href="${openseaLink}" target="_blank"
              >${name}</a
            >
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

  private getPriceTemplate(
    priceType: PriceType,
    paymentToken: OpenSeaFungibleToken,
    price: number
  ) {
    return html`
      <div class="asset-detail-price asset-detail-price-${priceType}">
        ${priceType === PriceType.Previous
          ? html`
              <div class="previous-value">Prev.&nbsp;</div>
            `
          : null}
        ${paymentToken.imageUrl
          ? html`<img src="${paymentToken.imageUrl}" alt="" ></img>`
          : html`
              <div class="previous-value">
                ${paymentToken.symbol === 'ETH' ? 'Ξ' : paymentToken.symbol}
              </div>
            `}
        <div class="asset-detail-price-value">
          ${toBaseDenomination(price, paymentToken.decimals)}
        </div>
      </div>
    `
  }

  private getAssetImageTemplate() {
    if (!this.asset) {
      return undefined
    }

    const { openseaLink, imageUrl, collection } = this.asset
    return html`
      <div class="asset-image-container">
        <a href="${openseaLink}" target="_blank">
          <div
            class="asset-image"
            style=${styleMap({
              'background-image': `url(${imageUrl})`,
              ...NftCardFrontTemplate.getAssetImageStyles(collection)
            })}
          ></div>
        </a>
      </div>
    `
  }

  private getButtonTemplate() {
    return html`
      <button @click="${(e: any) => this.eventHandler(e, 'view')}">
        ${BTN_TEXT[ButtonType.Buy]}
      </button>
    `
  }

  // @ts-ignore
  private _getButtonTemplate() {
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
    const btnText: string =
      btnType === ButtonType.SwitchNetwork
        ? BTN_TEXT[btnType] + this.state.network
        : BTN_TEXT[btnType]
    const btnStyle =
      btnType === ButtonType.SwitchNetwork
        ? {
            'background-color': 'rgb(183, 183, 183)',
            cursor: 'not-allowed'
          }
        : null

    return html`
      <button
        style=${btnStyle ? styleMap(btnStyle) : ''}
        @click="${(e: any) => this.eventHandler(e, btnType)}"
      >
        ${btnText}
      </button>
    `
  }
}
