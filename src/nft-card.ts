import { css, customElement, html, LitElement, property } from 'lit-element'
import { styleMap } from 'lit-html/directives/style-map'
import { provider as Web3Provider } from 'web3-core'

import { Network, OpenSeaPort } from 'opensea-js'
import { OpenSeaAsset } from 'opensea-js/lib/types'

/* lit-element classes */
import './pill.ts'
import './loader.ts'
import './nft-card-front.ts'
import './nft-card-back.ts'
import { ButtonEvent } from './types'
import { getProvider, networkFromString } from './utils'

const HORIZONTAL_MIN_CARD_HEIGHT = '200px'
const VERT_MIN_CARD_HEIGHT = '670px'

const VERT_CARD_HEIGHT = '560px'
const VERT_CARD_WIDTH = '380px'

const VERT_CARD_WIDTH_MOBILE = '80vw'

const HORIZONTAL_CARD_HEIGHT = '210px'
const HORIZONTAL_CARD_WIDTH = '80vw'
const HORIZONTAL_CARD_MAX_WIDTH = '670px'

enum OrientationMode {
  Auto = 'auto',
  Manual = 'manual',
}

const MOBILE_BREAK_POINT = 600

/**
 * Nft-card element that manages front & back of card.
 * Facilitates acquisition and distribution data between
 * components.
 * Registers <nft-card> as an HTML tag.
 */
@customElement('nft-card')
export class NftCard extends LitElement {
  /* User configurable properties */
  @property({ type: Boolean }) public horizontal?: boolean
  @property({ type: Boolean }) public vertical?: boolean
  @property({ type: String }) public orientationMode?: OrientationMode
  @property({ type: String }) public tokenAddress: string = ''
  @property({ type: String }) public contractAddress: string = ''
  @property({ type: String }) public tokenId: string = ''
  @property({ type: String }) public width: string = ''
  @property({ type: String }) public height: string = ''
  @property({ type: String }) public minHeight: string = ''
  @property({ type: String }) public maxWidth: string = ''
  @property({ type: String }) public network: Network = Network.Main
  @property({ type: String }) public referrerAddress: string = ''

  @property({ type: Object }) private asset!: OpenSeaAsset
  @property({ type: Object }) private traitData: object = {}
  @property({ type: String }) public flippedCard: boolean = false
  @property({ type: Object }) private provider: Web3Provider = null
  @property({ type: Object }) private seaport!: OpenSeaPort

  // Card state variables
  @property({ type: Boolean }) private loading = true
  @property({ type: Boolean }) private error = false

  static get styles() {
    return css`
      :host {
        all: initial;
      }
      p {
        margin: 0;
        -webkit-font-smoothing: antialiased;
      }
      .card {
        background-color: white;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        font-style: normal;
        font-weight: normal;
        line-height: normal;
        border-radius: 5px;
        perspective: 1000px;
        margin: auto;
      }
      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
      }
      .flipped-card .card-inner {
        transform: rotateY(180deg);
      }
      .card .error {
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
      }
      .card .error-moji {
        font-size: 50px;
      }
      .card .error-message {
        font-size: 16px;
      }
    `
  }

  /**
   * ConnectedCallback - Invoked when a component is added to the document’s DOM.
   * Grabs data from the OpenSea SDK and populates data objects to be passed to
   * child components.
   */
  public async connectedCallback() {
    super.connectedCallback()
    this.tokenAddress = this.contractAddress
      ? this.contractAddress
      : this.tokenAddress

    /* If user sets any style overrides assume manual mode unless user has defined the mode */
    if (!this.orientationMode) {
      this.orientationMode =
        this.width || this.height || this.horizontal || this.vertical
          ? OrientationMode.Manual
          : OrientationMode.Auto
    }

    this.horizontal = this.horizontal || !this.vertical

    let vertCardWidth = VERT_CARD_WIDTH
    if (
      this.orientationMode === OrientationMode.Auto &&
      window.innerWidth < MOBILE_BREAK_POINT
    ) {
      vertCardWidth = VERT_CARD_WIDTH_MOBILE
      this.horizontal = false
    }

    // Set default dimensions
    this.width = this.width
      ? this.width
      : this.horizontal
      ? HORIZONTAL_CARD_WIDTH
      : vertCardWidth
    this.height = this.height
      ? this.height
      : this.horizontal
      ? HORIZONTAL_CARD_HEIGHT
      : VERT_CARD_HEIGHT
    this.minHeight = this.horizontal
      ? HORIZONTAL_MIN_CARD_HEIGHT
      : VERT_MIN_CARD_HEIGHT
    this.maxWidth = this.horizontal ? HORIZONTAL_CARD_MAX_WIDTH : ''

    this.provider = getProvider()
    const networkName = networkFromString(this.network)
    this.seaport = new OpenSeaPort(this.provider, { networkName })

    try {
      this.asset = await this.seaport.api.getAsset({
        tokenAddress: this.tokenAddress,
        tokenId: this.tokenId,
      })

      this.traitData = {
        traits: this.asset.traits,
        collectionTraits: this.asset.collection.traitStats,
      }
    } catch (e) {
      this.error = true
      // Probably could not find the asset
      console.error(e)
    }

    this.loading = false

    // Tell the component to update with new state
    await this.requestUpdate()

  }

  public renderErrorTemplate() {
    return html`
      <div class="error">
        <div class="error-moji">¯\\_(ツ)_/¯</div>
        <div class="error-message">Problem loading asset.</div>
      </div>
    `
  }

  public renderLoaderTemplate() {
    return html` <loader-element></loader-element> `
  }

  public renderInnerCardTemplate() {
    return html`
      <nft-card-front
        .horizontal=${this.horizontal}
        @button-event="${this.eventHandler}"
        .asset=${this.asset}
        .state=${{
          network: this.network,
        }}
        .flippedCard="${this.flippedCard}"
      ></nft-card-front>
      <nft-card-back
        .horizontal=${this.horizontal}
        .traitData=${this.traitData}
        .openseaLink="${this.asset.openseaLink}"
        @flip-event="${this.eventHandler}"
        .flippedCard="${this.flippedCard}"
      ></nft-card-back>
    `
  }

  public render() {
    return html`
      <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500&display=swap');
      </style>
      <div
        class="card ${this.flippedCard ? 'flipped-card' : ''}"
        style=${styleMap({
          width: this.width,
          height: this.height,
          minHeight: this.minHeight,
          maxWidth: this.maxWidth,
        })}
      >
        <div class="card-inner">
          ${this.loading
            ? this.renderLoaderTemplate()
            : this.error
            ? this.renderErrorTemplate()
            : this.renderInnerCardTemplate()}
        </div>
      </div>
    `
  }

  private flipCard() {
    this.flippedCard = !this.flippedCard
  }

  private async eventHandler(event: ButtonEvent) {
    const { detail } = event

    switch (detail.type) {
      case 'view':
        this.goToOpenSea()
        break
      case 'flip':
        this.flipCard()
        break
    }
  }

  private goToOpenSea() {
    const url = this.referrerAddress
      ? `${this.asset.openseaLink}?ref=${this.referrerAddress}`
      : this.asset.openseaLink
    window.open(url, '_blank')
  }
}
