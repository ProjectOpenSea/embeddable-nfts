import { LitElement, html, customElement, property, css } from 'lit-element'

import { styleMap } from 'lit-html/directives/style-map'

@customElement('pill-element')
export class PillTemplate extends LitElement {
  /**
   * Create an observed property. Triggers update on change.
   */
  @property({ type: String }) public imageUrl = ''
  @property({ type: String }) public label = ''
  @property({ type: String }) public backgroundColor = ''
  @property({ type: String }) public textColor = ''
  @property({ type: String }) public border = 'none'
  @property({ type: Object }) public customStyles = {
    backgroundColor: this.backgroundColor,
    color: this.textColor,
    border: this.border
  }

  static get styles() {
    return css`
      .pill {
        display: flex;
        /* grid-template-columns: 1fr 2fr; */
        border: 1px solid #e2e6ef;
        box-sizing: border-box;
        border-radius: 60px;
        width: 100%;
        height: 100%;
        padding: 6px 12px 6px 6px;
      }
      .pill img {
        height: 100%;
        border-radius: 50px;
        margin-right: 6px;
        /* width: 100%; */
        /* padding: 3px; */
        /* box-sizing: border-box; */
      }
      .pill p {
        text-align: center;
        align-self: center;
        margin: auto;
        white-space: nowrap;
        /* Centers text since grid-template-columns auto has glitch */
        /* transform: translateX(-10%); */
        backface-visibility: inherit;
      }
      .no-img {
        grid-template-columns: 100%;
      }
      .no-img p {
        /* Reverts transform (see above) */
        /* transform: none; */
      }
    `
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
      <div
        class="pill ${this.imageUrl ? '' : 'no-img'}"
        style=${styleMap({
          backgroundColor: this.backgroundColor,
          color: this.textColor,
          border: this.border
        })}
      >
        ${this.imageUrl
          ? html`
              <img src="${this.imageUrl}" alt="" />
            `
          : ''}
        <p>${this.label}</p>
      </div>
    `
  }
}
