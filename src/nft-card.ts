import {LitElement, html, customElement, property, css} from 'lit-element'
import {styleMap} from 'lit-html/directives/style-map'
import {classMap} from 'lit-html/directives/class-map'

import Web3 from 'web3';
import {OpenSeaPort, Network, OpenSeaAsset} from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types'

/* lit-element clases */
import './pill.ts'
import './nft-card-front.ts'
import './nft-card-back.ts'


/**
 * Nft-card element that manages front & back of card.
 * Facilitates aquisition and distribution data between
 * components.
 * Registers <nft-card> as an HTML tag.
 */
@customElement('nft-card')
export class NftCard extends LitElement {

  /* User configurable propties */
	@property({type: Boolean}) vertical
	@property({type: String})  contractAddress
	@property({type: String})  tokenId
	@property({type: String})  width = '388px'
	@property({type: String})  height = '560px'
	@property({type: String})  network = 'mainnet'

	@property({type: String})  flippedCard = false
	@property({type: Boolean}) loading = true


	@property({type: Object})  asset;
	@property({type: Object})  traitData = {}
  @property({type: String})  account;


	getNetwork() {
		switch (this.network) {
			case 'mainnet': return Network.Main;
			case 'rinkeby': return Network.Rinkeby;
		}
	}

	constructor() {
		super();
	}

	/**
   * ConnectedCallback - Invoked when a component is added to the document’s DOM.
   * Grabs data from the OpenSea SDK and populates data objects to be passed to
   * child components.
   */
	async connectedCallback() {
		super.connectedCallback();
    this.provider =
      typeof web3 !== 'undefined'
        ? window.web3.currentProvider
        : Web3.providers.HttpProvider('https://mainnet.infura.io');

    this.web3 = new Web3(this.provider)
		this.seaport = new OpenSeaPort(this.provider, {networkName: this.getNetwork()})
		await this.connectWallet();
		this.asset = await this.seaport.api.getAsset(this.contractAddress, this.tokenId);

    [this.account] = await this.web3.eth.getAccounts()

    // TODO: Check if account exists
    this.asset.isOwnedByAccount = this.asset.owner.address.toLowerCase() === this.account.toLowerCase()

		this.traitData = {
			traits: this.asset.traits,
			collectionTraits: this.asset.collection.traitStats
		};

		// We got the data so we are done loading
		this.loading = false

		// Tell the component to update with new state
		await this.requestUpdate();

    // Watch for the account to change then update state of component
    window.ethereum.on('accountsChanged', function (accounts) {
      [this.account] = accounts
    })
	}



	/**
	 * async connectWallet - Initializes connection to the injected web3 account
	 */
	private async connectWallet() {
		if (!window.web3) {
			//
		} else if (window.ethereum) {
			window.ethereum.enable();
		} else {
			const errorMessage =
        'You need an Ethereum wallet to interact with this marketplace. Unlock your wallet, get MetaMask.io or Portis on desktop, or get Trust Wallet or Coinbase Wallet on mobile.';
			alert(errorMessage);
			throw new Error(errorMessage);
		}
	}

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

	async buyEvent(data) {

    const order = await this.seaport.api.getOrder({
      side: OrderSide.Sell,
      asset_contract_address: this.asset.contractAddress,
      token_id: this.asset.tokenId
     })

     // The buyer's wallet address, also the taker
     const accountAddress = this.account
     await this.seaport.fulfillOrder({ order, accountAddress })
	}

	flipCard(data) {
		this.flippedCard = !this.flippedCard
	}

	eventHandler(event) {
		const {detail} = event;
		switch (detail.type) {
      case 'view':
      case 'manage':
        this.goToOpenSea()
        break
			case 'buy':
        this.buyEvent(detail.data)
        break
			case 'flip':
        this.flipCard()
        break
		}
	}

  goToOpenSea() {
    window.open(this.asset.openseaLink, '_blank');
  }

	/**
   * Implement `render` to define a template for your element.
   */
	render() {
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
            html`loader`
            :
            html`
            <nft-card-front
              .vertical=${this.vertical}
              @new-event="${this.eventHandler}"
              .asset=${this.asset}
              .account=${this.account}
            ></nft-card-front>
            <nft-card-back
              .vertical=${this.vertical}
              .traitData=${this.traitData}
            ></nft-card-back>
            `
          }
       </div>
     `
   }
}
