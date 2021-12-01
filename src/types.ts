import { Network, OpenSeaTraitStats } from 'opensea-js/lib/types'

// @ts-ignore ts error TS7016
import Web3 from 'web3'

export enum TraitType {
  Property = 'prop',
  Stat = 'stat',
  Ranking = 'ranking',
  Boost = 'boost',
}

export interface Traits {
  [index: string]: Trait[]
  props: Trait[]
  stats: Trait[]
  rankings: Trait[]
  boosts: Trait[]
}

export interface Trait {
  value: string | number
  max?: string | number
  display_type?: string
  trait_type: string
}

export interface TraitData {
  traits: Trait[]
  collectionTraits: CollectionTraits
}

export interface CollectionTraits {
  [index: string]: OpenSeaTraitStats
}

export enum PriceType {
  Current = 'current',
  Previous = 'previous',
}

export interface State {
  network: Network
}

export interface ButtonEvent {
  detail: {
    type: string
  }
}
