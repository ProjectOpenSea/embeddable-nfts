import { LitElement, html, customElement, property, css } from 'lit-element'
import { styleMap } from 'lit-html/directives/style-map'
import { classMap } from 'lit-html/directives/class-map'
import { OpenSeaTraitStats } from 'opensea-js/lib/types'

import './info-button'

enum TraitType {
  Property = 'prop',
  Stat = 'stat',
  Ranking = 'ranking',
  Boost = 'boost',
}

interface Traits {
  [index: string]: Trait[]
  props: Trait[]
  stats: Trait[]
  rankings: Trait[]
  boosts: Trait[]
}

interface Trait {
  value: string | number
  max?: string | number
  display_type?: string
  trait_type: string
}

interface TraitData {
  traits: Trait[]
  collectionTraits: CollectionTraits
}

interface CollectionTraits {
  [index: string]: OpenSeaTraitStats
}

const TRAIT_HEADER_HEIGHT = 42
const TRAIT_HEADER_MARGIN_BOTTOM = 8

const RANK_HEIGHT = 40
const RANK_MARGIN = 8
const rankStyle = {
    height: RANK_HEIGHT + 'px',
    marginBottom: RANK_MARGIN + 'px'
}

const PROP_HEIGHT = 50
const PROP_MARGIN = RANK_MARGIN
const propStyle = {
  height: PROP_HEIGHT + 'px',
  marginBottom: PROP_MARGIN + 'px'
}

const BOOST_HEIGHT = RANK_HEIGHT
const BOOST_MARGIN = RANK_MARGIN
const BOOST_PADDING = RANK_MARGIN
const boostStyle = {
  height: BOOST_HEIGHT + 'px',
  marginBottom: BOOST_MARGIN + 'px',
  paddingBottom: BOOST_MARGIN + 'px'
}

const STAT_HEIGHT = PROP_HEIGHT
const STAT_MARGIN = RANK_MARGIN
const statStyle = {
  height: RANK_HEIGHT + 'px',
  marginBottom: RANK_MARGIN + 'px'
}

@customElement('nft-card-back')
export class NftCardBackTemplate extends LitElement {

  static get styles() {
    return css`
      a {
        text-decoration: none;
        color: inherit;
      }
      .card-back {
        position: absolute;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;
        transform: rotateY(180deg) translateZ(1px);
        top: 0;
        overflow: hidden;
      }
      .card-back p {
        margin: 10px;
      }
      .card-back-inner {
        display: grid;
        grid-template-columns: repeat(3, minmax(auto, 33%));
        column-gap: 10px;
        margin: 16px 24px;
      }
      .is-vertical {
        grid-template-columns: 1fr;
      }
      .attribute-container {
        text-align: left;
        text-transform: capitalize;
      }
      .is-vertical .attribute-container {
        margin: 15px 0;
      }
      .trait-header {
        display: flex;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.87);
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        line-height: 20px;
        margin-bottom: 8px;
      }
      .trait-header p {
        margin: 0 0 10px 8px;
      }
      .trait-icon {
        height: 100%;
      }
      .trait_property {
        background: #edfbff;
        border: 1px solid #2d9cdb;
        border-radius: 5px;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        text-align: center;
        border: 1px solid #2d9cdb;
        background-color: #edfbff;
        border-radius: 6px;
        padding: 8px;
      }
      .trait_property p {
        margin: 7px 0;
        font-weight: 400;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.87);
      }
      .trait_property .trait_property-type {
        margin: 0;
        font-size: 11px;
        text-transform: uppercase;
        font-weight: 500;
        color: #2d9cdb;
        opacity: .8;
      }
      .trait_property .trait_property-value {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        color: rgba(0,0,0,.87);
        font-size: 15px;
      }
      .trait_ranking {
        margin-bottom: 16px;
        cursor: pointer;
      }
      .trait_ranking .trait_ranking-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .trait_ranking .trait_ranking-header .trait_ranking-header-name {
        color: rgba(0, 0, 0, 0.87);
        font-size: 14px;
      }

      .trait_ranking .trait_ranking-header .trait_ranking-header-value {
        color: #9e9e9e;
        font-size: 11px;
      }
      .trait_ranking .trait_ranking-bar {
        width: 100%;
        height: 6px;
        border-radius: 14px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        position: relative;
        background: #f3f3f3;
        margin-top: 4px;
      }

      .trait_ranking .trait_ranking-bar .trait_ranking-bar-fill {
        position: absolute;
        left: 1px;
        top: 1px;
        height: 4px;
        background: #3291e9;
        border-radius: 14px;
        max-width: calc(100% - 2px);
      }

      .stat {
        display: grid;
        grid-template-columns: 1fr 4fr;
        justify-items: left;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
      .stat-name {
        font-size: 20px;
        font-weight: 100;
        text-transform: capitalize;
        margin-left: 5px;
      }
      .stat-value {
        color: #2d9cdb;
        font-size: 28px;
        font-weight: 100;
        margin-left: 5px;
      }
      .trait_boost {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-bottom: 8px;
        padding-bottom: 8px;
      }
      .trait_boost .trait_boost-value {
        width: 30px;
        height: 30px;
        background-color: #2d9cdb;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
      .trait_boost .trait_boost-value p {
        font-size: 12px;
        color: #ffffff;
      }
    `
  }

  @property({type: Object}) public traitData!: TraitData
  @property({type: Object}) public openseaLink?: string
  @property({type: Boolean}) public loading = true
  @property({type: Boolean}) public horizontal!: boolean
  @property({type: Number}) public cardHeight!: number
  @property({type: Number}) public cardWidth!: number

  @property({type: Object}) private traits?: Traits

  private static formatTraitType(traitType: string) {
    return traitType.replace(/_/g, ' ')
  }

  public updated(changedProperties: Map<string, string>) {
    // Assumption: If the traitData gets updated we should rebuild the
    // traits object that populates UI
    // Assumption: This will ONLY get called once per refresh
    changedProperties.forEach(async (_oldValue: string, propName: string) => {
      if (propName === 'traitData') {
        this.buildTraits(this.traitData)

        // We got the data so we are done loading
        this.loading = false

        // Tell the component to update with new state
        await this.requestUpdate()
      }
    })

    if (this.shadowRoot) {
      const el: HTMLElement = this.shadowRoot.firstElementChild as HTMLElement
      this.cardHeight = el.offsetHeight
      this.cardWidth = el.offsetWidth
    }
  }

  public async connectedCallback() {
    super.connectedCallback()
    this.render()
    this.requestUpdate()
  }

  public getBoostsTemplate(boosts: Trait[]) {
    if (boosts.length <= 0) {
      return undefined // Don't render if empty array
    }

    const traitHeightTotal = (TRAIT_HEADER_HEIGHT + TRAIT_HEADER_MARGIN_BOTTOM)
    const boostHeightTotal = BOOST_HEIGHT + BOOST_MARGIN + BOOST_PADDING
    const numBoostsRender = Math.floor((this.cardHeight - traitHeightTotal) / (boostHeightTotal)) - 1
    const numBoostsRemaining = boosts.length - numBoostsRender

    return html`
      <div class="trait-header">
        <div class="trait-icon">
          <svg
            width="10"
            height="100%"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.666656 0.333336V7.66667H2.66666V13.6667L7.33332 5.66667H4.66666L7.33332 0.333336H0.666656Z"
              fill="#1C1F27"
            />
          </svg>
        </div>
        <p class="attribute-title">Boosts</p>
      </div>
      ${boosts.slice(0, numBoostsRender).map(
        ({trait_type, value}) => html`
          <div class="trait_boost" style="${styleMap(boostStyle)}" >
            <div class="trait_boost-value">
              <p>+${value}</p>
            </div>
            <div class="trait_boost-name">
              ${NftCardBackTemplate.formatTraitType(trait_type)}
            </div>
          </div>
        `
      )}
      ${this.viewMoreTemplate(numBoostsRemaining)}
    `
  }

  public getStatsTemplate(stats: Trait[]) {
    if (stats.length <= 0) {
      return undefined // Don't render if empty array
    }
    const traitHeightTotal = (TRAIT_HEADER_HEIGHT + TRAIT_HEADER_MARGIN_BOTTOM)

    const numStatsRender = Math.floor((this.cardHeight - traitHeightTotal) / (STAT_HEIGHT + STAT_MARGIN)) - 1
    const numStatsRemaining = stats.length - numStatsRender

    return html`
        <div class="trait-header">
          <div class="trait-icon">
            <svg
              width="15"
              height="100%"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66666 11.3333H7.33332V0.666672H4.66666V11.3333ZM0.666656 11.3333H3.33332V6H0.666656V11.3333ZM8.66666 4V11.3333H11.3333V4H8.66666Z"
                fill="black"
              />
            </svg>
          </div>
          <p class="attribute-title">Stats</p>
        </div>
        ${stats.slice(0, numStatsRender).map(stat =>
          html`
              <div class="stat" style="${styleMap(statStyle)}">
                <div class="stat-value">${stat.value}</div>
                <div class="stat-name">
                  ${NftCardBackTemplate.formatTraitType(stat.trait_type)}
                </div>
              </div>
            `
        )}
        ${this.viewMoreTemplate(numStatsRemaining)}
      `
  }

  public getRankingsTemplate(rankings: Trait[]) {
    const traitHeightTotal = (TRAIT_HEADER_HEIGHT + TRAIT_HEADER_MARGIN_BOTTOM)

    const numRanksRender = Math.floor((this.cardHeight - traitHeightTotal) / (RANK_HEIGHT + RANK_MARGIN)) - 1
    const numRanksRemaining = rankings.length - numRanksRender

    return html`
      <div class="trait-header">
        <div class="trait-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="100%"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"
            />
          </svg>
        </div>
        <p class="attribute-title">Rankings</p>
      </div>
      ${rankings.slice(0, numRanksRender).map(
        ({trait_type, value, max}) => html`
          <div class="trait_ranking" style="${styleMap(rankStyle)}">
            <div class="trait_ranking-header">
              <div class="trait_ranking-header-name">
                ${NftCardBackTemplate.formatTraitType(trait_type)}
              </div>
              <div class="trait_ranking-header-value">${value} of ${max}</div>
            </div>
            <div class="trait_ranking-bar">
              <div
                class="trait_ranking-bar-fill"
                style=${styleMap({width: `${(+value / +(max || 1 /* If no max then just render full bar */)) * 100}%`})}
              ></div>
            </div>
          </div>
        `
      )}
      ${this.viewMoreTemplate(numRanksRemaining)}
    `
  }

  public getPropsTemplate(props: Trait[]) {
    const traitHeightTotal = (TRAIT_HEADER_HEIGHT + TRAIT_HEADER_MARGIN_BOTTOM)

    const numPropsRender = Math.floor((this.cardHeight - traitHeightTotal) / (PROP_HEIGHT + PROP_MARGIN)) - 1
    const numPropsRemaining = props.length - numPropsRender

    return html`${props.slice(0, numPropsRender).map(
        ({trait_type, value }) =>
            html`
        <div class="trait_property" style="${styleMap(propStyle)}">
          <p class="trait_property-type">${NftCardBackTemplate.formatTraitType(trait_type)}</p>
          <p class="trait_property-value">${value}</p>
        </div>
      `)}
      ${this.viewMoreTemplate(numPropsRemaining)}
      `
  }

  private viewMoreTemplate(numRemaining: number) {
    if(numRemaining <= 0) {
      return null
    } else {
      return html`<a class="remainingTraits" href="${this.openseaLink}" target="_blank">+${numRemaining} more</a>`
    }
  }

  public render() {
    return html`
      <div class="card-back">
      <info-button
            style="position: absolute; top: 5px; right: 5px"
            @flip-event="${(_e: any) => this.dispatchEvent(new CustomEvent('flip-event', { detail: { type: 'flip' } }))}"
        ></info-button>
        
        <div
          class="card-back-inner ${classMap({'is-vertical': !this.horizontal})}"
        >
          <div class="attribute-container attribute-properties">
            <div class="trait-header">
              <div class="trait-icon">
                <svg
                  width="18"
                  height="100%"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 2.00001H9.33333V0.666672H0V2.00001ZM0 4.66667H9.33333V3.33334H0V4.66667ZM0 7.33334H9.33333V6H0V7.33334ZM10.6667 7.33334H12V6H10.6667V7.33334ZM10.6667 0.666672V2.00001H12V0.666672H10.6667ZM10.6667 4.66667H12V3.33334H10.6667V4.66667Z"
                    fill="#1C1F27"
                  />
                </svg>
              </div>
              <p class="attribute-title">Properties</p>
            </div>
            ${this.traits ? this.getPropsTemplate(this.traits.props) : ''}
          </div>

          <div class="attribute-container">
            ${ this.traits ?
                this.traits.rankings.length > 0 ? this.getRankingsTemplate(this.traits.rankings) : this.getStatsTemplate(this.traits.stats)
              : ''
          }
          </div>
          <div class="attribute-container attribute-boosts">
            ${this.traits ? this.getBoostsTemplate(this.traits.boosts) : ''}
          </div>
        </div>
      </div>
    `
  }

  private buildTraits(traitData: TraitData) {
    this.traits = {
      props: [],
      stats: [],
      rankings: [],
      boosts: []
    }
    const {traits: assetTraits, collectionTraits} = traitData

    for (const trait of assetTraits) {
      const type = this.getTraitType(trait, collectionTraits)

      const name = trait.trait_type

      this.traits[type + 's'].push({
        value: trait.value,
        ...(type === TraitType.Ranking ? {max: collectionTraits[name].max as unknown as number} : {}),
        trait_type: trait.trait_type
      })
    }
  }

  private getTraitType(trait: Trait, collectionTraits: CollectionTraits) {
    if (NftCardBackTemplate.isProperty(trait, collectionTraits)) {
      return TraitType.Property
    }
    if (NftCardBackTemplate.isRanking(trait, collectionTraits)) {
      return TraitType.Ranking
    }
    if (NftCardBackTemplate.isStat(trait)) {
      return TraitType.Stat
    }
    if (NftCardBackTemplate.isBoost(trait)) {
      return TraitType.Boost
    }
    return null // Default return statement
  }

  private static isBoost(trait: Trait) {
    return trait.display_type && trait.display_type.includes('boost')
  }

  private static isRanking(trait: Trait, collectionTraits: CollectionTraits) {
    return trait.display_type === null && trait.trait_type in collectionTraits && 'max' in collectionTraits[trait.trait_type]
  }

  /**
   * IsStat - Checks to see if the given trait is a 'Stat'
   * A 'Stat' is defined as any trait that has a `display_type` of 'number'
   *
   * @param trait - The object containing an asset's trait
   * @return true if the trait is a 'Stat' and false otherwise
   */
  private static isStat(trait: Trait) {
    return trait.display_type === 'number'
  }

  /**
   * IsProperty - Checks to see if the given trait is a 'Property'.
   * A 'Property' is defined as any trait that has a `display_type` of null
   * and does not have a min/max value
   *
   * @param trait - The object containing an asset's trait
   * @return true if the trait is a 'Property' and false otherwise
   */
  private static isProperty(trait: Trait, collectionTraits: CollectionTraits) {
    return (
      trait.display_type === null &&
      trait.trait_type in collectionTraits &&
      !('max' in collectionTraits[trait.trait_type]) ||
      !(trait.trait_type in collectionTraits)
    )
  }
}
