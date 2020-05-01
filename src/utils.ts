import { CollectionTraits, Trait, TraitType, CustomWindow } from './types'
// @ts-ignore ts error TS7016
import Web3 from 'web3'
import { Network } from 'opensea-js/lib'

declare const window: CustomWindow

export const formatTraitType = (traitType: string) =>
  traitType.replace(/_/g, ' ')

const isBoost = (trait: Trait) =>
  trait.display_type && trait.display_type.includes('boost')

const isRanking = (trait: Trait, collectionTraits: CollectionTraits) =>
  trait.display_type === null &&
  trait.trait_type in collectionTraits &&
  'max' in collectionTraits[trait.trait_type]

/**
 * IsStat - Checks to see if the given trait is a 'Stat'
 * A 'Stat' is defined as any trait that has a `display_type` of 'number'
 *
 * @param trait - The object containing an asset's trait
 * @return true if the trait is a 'Stat' and false otherwise
 */
const isStat = (trait: Trait) => trait.display_type === 'number'

/**
 * IsProperty - Checks to see if the given trait is a 'Property'.
 * A 'Property' is defined as any trait that has a `display_type` of null
 * and does not have a min/max value
 *
 * @param trait - The object containing an asset's trait
 * @param collectionTraits - List of collection traits
 * @return true if the trait is a 'Property' and false otherwise
 */
const isProperty = (trait: Trait, collectionTraits: CollectionTraits) =>
  (trait.display_type === null &&
    trait.trait_type in collectionTraits &&
    !('max' in collectionTraits[trait.trait_type])) ||
  !(trait.trait_type in collectionTraits)

export const toBaseDenomination = (value: number, decimals: number) =>
  +value.toFixed() / Math.pow(10, decimals)

export const getTraitType = (
  trait: Trait,
  collectionTraits: CollectionTraits
) => {
  if (isProperty(trait, collectionTraits)) {
    return TraitType.Property
  }
  if (isRanking(trait, collectionTraits)) {
    return TraitType.Ranking
  }
  if (isStat(trait)) {
    return TraitType.Stat
  }
  if (isBoost(trait)) {
    return TraitType.Boost
  }
  return null // Default return statement
}

export const getProvider = () =>
  window.ethereum
    ? window.ethereum
    : window.web3
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider('https://mainnet.infura.io')

// Given the network version this method returns the network name
// Since only Main & Rinkeby are supported we ignore the other networks
export const networkFromId = (id: string) => {
  switch (id) {
    case '1':
      return Network.Main
    case '4':
      return Network.Rinkeby
    default:
      return null
  }
}

export const networkFromString = (name: string) => {
  switch (name) {
    case 'rinkeby':
      return Network.Rinkeby
    case 'mainnet':
    case 'main':
    default:
      return Network.Main
  }
}
