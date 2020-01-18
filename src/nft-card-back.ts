/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 **/
import {
  LitElement, html, customElement, property, css
} from 'lit-element';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <nft-card-back> as an HTML tag.
 */
@customElement('nft-card-back')
export class NftCardBackTemplate extends LitElement {

  /**
   * Create an observed property. Triggers update on change.
   */
  @property({type : Boolean})  isStat = true;
  @property({type : Object})  stats = [
    {
      display_type: 'number',
      trait_type: 'generation',
      value: 2
    },
    {
      display_type: 'number',
      trait_type: 'cooldown_index',
      value: 2
    }
  ]

  // @TODO: Add dynamic styles based on orientation prop
  static get styles() {
    return css`
      .card-back {
        position: absolute;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;
        /* transform: rotateY(180deg); */
        top: 0;

      }
      .card-back p {
        margin: 0;
      }
      .attribute-header p {
        margin: 0 0 10px 8px;
      }
      .card-back-inner {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 10px;
        margin: 16px 24px;
      }
      .attribute-container {
        text-align: left;
      }
      .attribute-header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        display: flex;
        font-weight: 400;
      }
      .attribute-icon {
        height: 100%;
      }
      .property {
        background: #EDFBFF;
        border: 1px solid #2D9CDB;
        border-radius: 5px;
        text-align: center;
        margin: 8px 0;
      }
      .property p {
        margin: 7px 0;
        font-weight: 400;
        font-size: 15px;
      }
      .stat {
        display: grid;
        grid-template-columns: 1fr 4fr;
        justify-items: center;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
      .stat-name {
        font-size: 20px;
        font-weight: 100;
        text-transform: capitalize;
        justify-self: left;
        margin-left: 5px;
      }
      .stat-value {
        color: #2D9CDB;
        font-size: 34px;
        font-weight: 100;
      }
    `;
  }

  getStatsTemplate(stats) {

    // TODO: Add more checks here for robustness

    return html`
      ${stats.map(
        stat => stat.display_type !== 'number' ? '' : html`<div class="stat"><div class="stat-value">${stat.value}</div><div class="stat-name">${stat.trait_type.replace(/_/g, ' ')}</div></div>`)}
    `
  }

  transformTrait(trait) {
    return trait.replace(/_/g, ' ')
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
      <div class="card-back">
        <div class="card-back-inner">
          <div class="attribute-container attribute-properties">
            <div class="attribute-header">
              <div class="attribute-icon">
                <svg width="18" height="100%" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.00001H9.33333V0.666672H0V2.00001ZM0 4.66667H9.33333V3.33334H0V4.66667ZM0 7.33334H9.33333V6H0V7.33334ZM10.6667 7.33334H12V6H10.6667V7.33334ZM10.6667 0.666672V2.00001H12V0.666672H10.6667ZM10.6667 4.66667H12V3.33334H10.6667V4.66667Z" fill="#1C1F27"/></svg>
              </div>
              <p class="attribute-title">Properties</p>
            </div>
            <div class="property">
              <p>Gold</p>
            </div>
            <div class="property">
              <p>Polkadots</p>
            </div>
          </div>
          <!-- TODO: Add conditional class based on if it's a rank or stat -->
          <div class="attribute-container attribute-${this.isStat ? "stats" : "ranks"}">
            <div class="attribute-header">
              <div class="attribute-icon">
                <svg width="15" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66666 11.3333H7.33332V0.666672H4.66666V11.3333ZM0.666656 11.3333H3.33332V6H0.666656V11.3333ZM8.66666 4V11.3333H11.3333V4H8.66666Z" fill="black"/></svg>
              </div>
              <p class="attribute-title">Stats</p>
            </div>
            ${this.getStatsTemplate(this.stats)}
          </div>
          <div class="attribute-container attribute-boosts">
            <div class="attribute-header">
              <div class="attribute-icon">
                <svg width="10" height="100%" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.666656 0.333336V7.66667H2.66666V13.6667L7.33332 5.66667H4.66666L7.33332 0.333336H0.666656Z" fill="#1C1F27"/></svg>
              </div>
              <p class="attribute-title">Boosts</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
