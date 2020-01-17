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
  @property({type : String})  orientation = 'vertical';

  // @TODO: Add dynamic styles based on orientation prop
  static get styles() {
    return css`
      .card-back {
        position: absolute;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;
        transform: rotateY(180deg);
        top: 0;
        /* background: aliceblue; */
      }
    `;
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
      hello
      </div>
    `;
  }
}
