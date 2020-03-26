import { ButtonType } from './types'

export const NO_WEB3_ERROR: string =
  'You need an Ethereum wallet to interact ' +
  'with this marketplace. Unlock your wallet, get MetaMask.io or ' +
  'Portis on desktop, or get Trust Wallet or Coinbase Wallet on mobile.'

export const BTN_TEXT: { [index: string]: string } = {
  [ButtonType.Manage]: 'manage this item ❯',
  [ButtonType.Buy]: 'buy this item ❯',
  [ButtonType.View]: 'view on openSea ❯',
  [ButtonType.SwitchNetwork]: 'switch to ',
  [ButtonType.Unlock]: 'buy this item ❯'
}
