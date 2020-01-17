/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 **/
import {
  LitElement, html, customElement, property, css,
} from 'lit-element';

import { styleMap } from 'lit-html/directives/style-map';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
@customElement('pill-element')
export class pillTemplate extends LitElement {

  /**
   * Create an observed property. Triggers update on change.
   */
  @property({type : String})  imageUrl;
  @property({type : String})  label;
  @property({type : String})  backgroundColor;
  @property({type : String})  textColor;
  @property({type : String})  border = 'none';
  @property({type : Object})  customStyles = {
                                backgroundColor: this.backgroundColor,
                                color: this.textColor,
                                border: this.border
                              };


  // @TODO: Add dynamic styles using styleMap directive
  // @TODO: Add dynamic style text color
  // @TODO: Add dynamic style border & border color
  static get styles() {
    return css`
      .pill {
        display: grid;
        grid-template-columns: 1fr 2fr;
        border: 1px solid #E2E6EF;
        box-sizing: border-box;
        border-radius: 60px;
        width: 100%;
        height: 100%;
      }
      .pill img {
        height: 100%;
        width: auto;
        padding: 3px;
        box-sizing: border-box;
      }
      .pill p {
        text-align: center;
        align-self: center;
        margin: 0;
         /* Centers text since grid-template-columns auto has glitch */
        transform: translateX(-10%);
        backface-visibility: inherit;
      }
      .no-img {
        grid-template-columns: 100%;
      }
      .no-img p {
         /* Reverts transform (see above) */
        transform: none;
      }
    `;
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
    <div class="pill ${this.imageUrl ? '' : 'no-img'}"
      style="${styleMap({backgroundColor: this.backgroundColor,
          color: this.textColor, border: this.border})}">
      ${this.imageUrl ? html`<img src="${this.imageUrl}"></img>` : ''}
      <p>${this.label}</p>
    </div>`;
  }
}
