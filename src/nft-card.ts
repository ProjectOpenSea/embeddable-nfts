/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 **/
import {
  LitElement, html, customElement, property, css
} from 'lit-element';

import { classMap } from 'lit-html/directives/class-map';

import './pill.ts';
import './nft-card-front.ts';
import './nft-card-back.ts';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <nft-card> as an HTML tag.
 */
@customElement('nft-card')
export class NftCard extends LitElement {

  /**
   * Create an observed property. Triggers update on change.
   */
  @property({type : String})  orientation = 'vertical';
  @property({type : String})  flippedCard = false;

  // @TODO: Add dynamic styles based on orientation prop
  static get styles() {
    return css`
        p {
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }
        .card {
          background-color: transparent;
          font-family: 'Roboto', sans-serif;
          font-style: normal;
          font-weight: normal;
          border-radius: 5px;
          perspective: 1000px;
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
        /* transform: rotateY(180deg); */
      }
    `;
  }

  buyEvent(data) {
    console.log(data)
  }

  flipCard(data) {
    console.log('flip it')
    this.flippedCard = !this.flippedCard;
  }

  eventHandler(event) {
    const { detail } = event
    switch(detail.type) {
      case 'buy': this.buyEvent(detail.data); break;
      case 'flip': this.flipCard(); break;
    }
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
        @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500&display=swap');
      </style>
      <div class="card ${this.flippedCard ? 'flipped-card' : ''}">
        <div class="card-inner">
          <nft-card-front @new-event="${this.eventHandler}" ></nft-card-front>
          <nft-card-back></nft-card-back>
        </div>
      </div>
    `;
  }
}
