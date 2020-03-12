import { css, customElement, html, LitElement, property } from 'lit-element'
import { styleMap } from 'lit-html/directives/style-map'

// @ts-ignore ts error TS7016
import Web3 from 'web3'

import { Network, OpenSeaPort } from 'opensea-js'
import { OpenSeaAsset } from 'opensea-js/lib/types'

import { NO_WEB3_ERROR } from './constants'

/* lit-element classes */
import './pill.ts'
import './loader.ts'
import './nft-card-front.ts'
import './nft-card-back.ts'

export interface CustomWindow extends Window {
    ethereum: Web3.Provider
    web3: Web3
}

declare const window: CustomWindow

export interface ButtonEvent {
    detail: {
        type: string
    }
}

const HORIZONTAL_MIN_CARD_HEIGHT = '200px'
const VERT_MIN_CARD_HEIGHT = '670px'

const VERT_CARD_HEIGHT = '560px'
const VERT_CARD_WIDTH = '380px'

const VERT_CARD_WIDTH_MOBILE = '90vw'

const HORIZONTAL_CARD_HEIGHT = '200px'
const HORIZONTAL_CARD_WIDTH = '670px'

enum OrientationMode {
    Auto = 'auto',
    Manual = 'manual'
}

const MOBILE_BREAK_POINT = 600

/**
 * Nft-card element that manages front & back of card.
 * Facilitates aquisition and distribution data between
 * components.
 * Registers <nft-card> as an HTML tag.
 */
@customElement('nft-card')
export class NftCard extends LitElement {

    static get styles() {
        return css`
      p {
        margin: 0;
        -webkit-font-smoothing: antialiased;
      }
      .card {
        background-color: transparent;
        font-family: Avenir Next, Avenir, Helvetica Neue, sans-serif;
        font-style: normal;
        font-weight: normal;
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
        /* min-height: 260px; */
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

    /* User configurable properties */
    @property({type: Boolean}) public horizontal: boolean = true
    @property({type: Boolean}) public orientationMode: OrientationMode = OrientationMode.Auto
    @property({type: String}) public contractAddress: string = ''
    @property({type: String}) public tokenId: string = ''
    @property({type: String}) public width: string = ''
    @property({type: String}) public height: string = ''
    @property({type: String}) public minHeight: string = ''
    @property({type: String}) public network: Network = Network.Main

    @property({type: Object}) private asset!: OpenSeaAsset
    @property({type: Object}) private traitData: object = {}
    @property({type: String}) private account: string = ''
    @property({type: String}) private flippedCard: boolean = false
    @property({type: Object}) private provider: Web3.Provider
    @property({type: Object}) private seaport!: OpenSeaPort

    // Card state variables
    @property({type: Boolean}) private loading = true
    @property({type: Boolean}) private error = false
    @property({type: Boolean}) private isOwnedByAccount = false
    @property({type: Boolean}) private isUnlocked: boolean = true
    @property({type: Boolean}) private hasWeb3: boolean = false
    @property({type: Boolean}) private isMatchingNetwork: boolean = false

    private static getProvider() {
        if (window.ethereum) {
            return window.ethereum
        } else if (window.web3) {
            return window.web3.currentProvider
        } else {
            return new Web3.providers.HttpProvider('https://mainnet.infura.io')
        }
    }

    // Given the network version this method returns the network name
    // Since only Main & Rinkeby are supported we ignore the other networks
    private static networkFromId(id: string) {
        switch (id) {
            case '1': return Network.Main
            case '4': return Network.Rinkeby
            default: return null
        }
    }

    /**
     * ConnectedCallback - Invoked when a component is added to the document’s DOM.
     * Grabs data from the OpenSea SDK and populates data objects to be passed to
     * child components.
     */
    public async connectedCallback() {
        super.connectedCallback()

        let vertCardWidth
        if (window.innerWidth < MOBILE_BREAK_POINT && this.orientationMode === OrientationMode.Auto) {
            vertCardWidth = VERT_CARD_WIDTH_MOBILE
            this.horizontal = false
        } else {
            vertCardWidth = VERT_CARD_WIDTH
        }

        // Set default dimensions
        if (!this.width) {
            this.width = this.horizontal ? HORIZONTAL_CARD_WIDTH : vertCardWidth
        }
        if (!this.height) {
            this.height = this.horizontal ? HORIZONTAL_CARD_HEIGHT : VERT_CARD_HEIGHT
        }
        this.minHeight = this.horizontal ?  HORIZONTAL_MIN_CARD_HEIGHT : VERT_MIN_CARD_HEIGHT

        this.hasWeb3 = !!window.web3

        // Get the web3 provider
        this.provider = NftCard.getProvider()

        this.seaport = new OpenSeaPort(this.provider, {networkName: this.network})

        try {
            this.asset = await this.seaport.api.getAsset(this.contractAddress, this.tokenId)
            this.traitData = {
                traits: this.asset.traits,
                collectionTraits: this.asset.collection.traitStats
            }

        } catch (e) {
            this.error = true
            // Probably could not find the asset
            console.error(e)
        }

        this.loading = false

        this.isMatchingNetwork = NftCard.networkFromId(this.provider.networkVersion) === this.network

        // Tell the component to update with new state
        await this.requestUpdate()

        // Watch for the account to change then update state of component
        this.provider.on('accountsChanged',  (accounts: string[]) => {
            this.account = accounts.length > 0 ? accounts[0] : ''
            this.isOwnedByAccount = this.asset.owner.address.toLowerCase() === this.account.toLowerCase()
        })
        this.provider.on('networkChanged', (networkId: string) => {
            const network =  NftCard.networkFromId(networkId)
            this.isMatchingNetwork = network === this.network
        })
    }

    public async buyAsset() {
        if (this.isUnlocked && this.asset.sellOrders) {
            const order = this.asset.sellOrders[0]
            await this.seaport.fulfillOrder({order, accountAddress: this.account})
        }
    }

    public renderErrorTemplate() {
        return html`
                <div class="error">
                    <div class="error-moji">¯\\_(ツ)_/¯</div>
                    <div class="error-message">Problem loading asset.</div>
                </div>`
    }

    public renderLoaderTemplate() {
        return html`<loader-element></loader-element>`
    }

    public renderInnerCardTemplate() {
        return html`
            <nft-card-front
              .horizontal=${this.horizontal}
              @button-event="${this.eventHandler}"
              .asset=${this.asset}
              .state=${({
                    isOwnedByAccount: this.isOwnedByAccount,
                    isMatchingNetwork: this.isMatchingNetwork,
                    isUnlocked: this.isUnlocked,
                    hasWeb3: this.hasWeb3,
                    network: this.network
                })}
              .account=${this.account}
            ></nft-card-front>
            <nft-card-back
              .horizontal=${this.horizontal}
              .traitData=${this.traitData}
              .openseaLink="${this.asset.openseaLink}"
              @flip-event="${this.eventHandler}"
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
         style=${styleMap({width: this.width, height: this.height, minHeight: this.minHeight})}
       >

       <div class="card-inner">
          ${this.loading ? this.renderLoaderTemplate() :
            this.error ? this.renderErrorTemplate() :
            this.renderInnerCardTemplate()
        }
       </div>
     `
    }

    private flipCard() {
        this.flippedCard = !this.flippedCard
    }

    private async eventHandler(event: ButtonEvent) {
        const {detail} = event

        switch (detail.type) {
            case 'view':
            case 'manage':
                this.goToOpenSea()
                break
            case 'unlock':
                await this.connectWallet()
                break
            case 'buy':
                await this.buyAsset()
                break
            case 'flip':
                this.flipCard()
                break
        }
    }

    private goToOpenSea() {
        window.open(this.asset.openseaLink, '_blank')
    }

    /**
     * async connectWallet - Initializes connection to the injected web3 account
     * Pre-Conditions: this.provider has been defined - this method should only
     * be called if web3 is available. If web3 is available then this.provider
     * must be defined
     */
    private async connectWallet() {
        if (window.web3) {
            // If it is modern dapp then show prompt requesting access
            if (window.ethereum) {
                const ACCESS_DENIED = 4001
                await window.ethereum.enable().catch((error: {code: number}) => {
                    if (error.code === ACCESS_DENIED) {
                        this.isUnlocked = false
                    }
                })
            }

            if (this.provider.selectedAddress) {
                this.account = this.provider.selectedAddress
                this.isOwnedByAccount = this.asset.owner.address.toLowerCase() === this.account.toLowerCase()
            }
        } else {
            this.isUnlocked = false
            alert(NO_WEB3_ERROR)
            throw new Error(NO_WEB3_ERROR)
        }
    }
}
