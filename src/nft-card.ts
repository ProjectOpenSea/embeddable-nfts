import { css, customElement, html, LitElement, property } from 'lit-element'
import { styleMap } from 'lit-html/directives/style-map'

// @ts-ignore ts error TS7016
import Web3 from 'web3'

import { Network, OpenSeaPort } from 'opensea-js'
import { OpenSeaAsset, OrderSide } from 'opensea-js/lib/types'

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
    `
    }

    /* User configurable properties */
    @property({type: Boolean}) public horizontal: boolean = false
    @property({type: String}) public contractAddress: string = ''
    @property({type: String}) public tokenId: string = ''
    @property({type: String}) public width: string = this.horizontal ? '670px' : '388px'
    @property({type: String}) public height: string = this.horizontal ? '250px' : '560px'
    @property({type: String}) public network: Network = Network.Main

    @property({type: Object}) private asset!: OpenSeaAsset
    @property({type: Object}) private traitData: object = {}
    @property({type: String}) private account: string = ''
    @property({type: String}) private flippedCard: boolean = false
    @property({type: Object}) private provider: Web3.Provider
    @property({type: Object}) private seaport!: OpenSeaPort

    // Card state variables
    @property({type: Boolean}) private loading = true
    @property({type: Boolean}) private isOwnedByAccount = false
    @property({type: Boolean}) private isUnlocked: boolean = false
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

    /**
     * ConnectedCallback - Invoked when a component is added to the document’s DOM.
     * Grabs data from the OpenSea SDK and populates data objects to be passed to
     * child components.
     */
    public async connectedCallback() {
        super.connectedCallback()
        this.hasWeb3 = !!window.web3

        // Get the web3 provider
        this.provider = NftCard.getProvider()

        this.seaport = new OpenSeaPort(this.provider, {networkName: this.getNetwork()})

        this.asset = await this.seaport.api.getAsset(this.contractAddress, this.tokenId)

        this.traitData = {
            traits: this.asset.traits,
            collectionTraits: this.asset.collection.traitStats
        }

        // We got the data so we are done loading
        this.loading = false

        // Tell the component to update with new state
        await this.requestUpdate()

        // Watch for the account to change then update state of component
        // window.ethereum.on('accountsChanged',  (accounts: Array<string>) => {
        //     this.account = accounts.length > 0 ? accounts[0] : ''
        //     console.log('accountsChanged', accounts)
        // })
    }

    public async buyAsset() {
        if (this.isUnlocked) {
            const order = await this.seaport.api.getOrder({
                side: OrderSide.Sell,
                asset_contract_address: this.asset.assetContract.address,
                token_id: this.tokenId
            })
            await this.seaport.fulfillOrder({order, accountAddress: this.account})
        }
    }

    /**
     * Implement `render` to define a template for your element.
     */
    public render() {
        /**
         * Use JavaScript expressions to include property values in
         * the element template.
         */

        return html`
       <style>
         @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500&display=swap');
       </style>
       <div
         class="card ${this.flippedCard ? 'flipped-card' : ''}"
         style=${styleMap({width: this.width, height: this.height})}
       >
       <div class="card-inner">
          ${this.loading ?
            html`<loader-element></loader-element>`
            :
            html`
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
            ></nft-card-back>
            `
        }
       </div>
     `
    }

    private flipCard() {
        this.flippedCard = !this.flippedCard
    }

    private eventHandler(event: ButtonEvent) {
        const {detail} = event
        switch (detail.type) {
            case 'view':
            case 'manage':
                this.goToOpenSea()
                break
            case 'unlock':
                this.connectWallet()
                break
            case 'buy':
                this.buyAsset()
                break
            case 'flip':
                this.flipCard()
                break
        }
    }

    private goToOpenSea() {
        window.open(this.asset.openseaLink, '_blank')
    }

    private getNetwork() {
        switch (this.network) {
            case 'main':
                return Network.Main
            case 'rinkeby':
                return Network.Rinkeby
            default: return Network.Main
        }
    }

    /**
     * async connectWallet - Initializes connection to the injected web3 account
     * Pre-Conditions: this.provider has been defined - this method should only
     * be called if web3 is available. If web3 is available then this.provider
     * must be defined
     */
    private async connectWallet() {
        if (window.web3) {
            this.isUnlocked = true

            // If it is modern dapp then show prompt requesting access
            if (window.ethereum) {
                const ACCESS_DENIED = 4001
                await window.ethereum.enable().catch((error: {code: number}) => {
                    if (error.code === ACCESS_DENIED) {
                        this.isUnlocked = false
                    }
                })
            }
            this.isMatchingNetwork = this.networkFromId(this.provider.networkVersion) === this.network
            if (this.provider.selectedAddress) {
                this.account = this.provider.selectedAddress
                this.isOwnedByAccount = this.asset.owner.address.toLowerCase() === this.account.toLowerCase()
            }
        } else {
            alert(NO_WEB3_ERROR)
            throw new Error(NO_WEB3_ERROR)
        }
    }

    // Given the network version this method returns the network name
    // Since only Main & Rinkeby are supported we ignore the other networks
    private networkFromId(id: string) {
        switch (id) {
            case '1': return Network.Main
            case '4': return Network.Rinkeby
            default: return null
        }
    }
}
