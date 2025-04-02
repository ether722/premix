import type { Chain } from '../types';

export const BSC: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.defibit.io',
  ],
  blockExplorers: [
    {
      name: 'BscScan',
      url: 'https://bscscan.com',
    },
  ],
  testnet: false,
};

export const BSC_TESTNET: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: [
    'https://data-seed-prebsc-1-s1.binance.org:8545',
    'https://data-seed-prebsc-2-s1.binance.org:8545',
  ],
  blockExplorers: [
    {
      name: 'BscScan',
      url: 'https://testnet.bscscan.com',
    },
  ],
  testnet: true,
};

export const AVALANCHE: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: [
    'https://api.avax.network/ext/bc/C/rpc',
  ],
  blockExplorers: [
    {
      name: 'SnowTrace',
      url: 'https://snowtrace.io',
    },
  ],
  testnet: false,
};

export const DEFAULT_SUPPORTED_CHAINS = [BSC, BSC_TESTNET, AVALANCHE];

export const getChainById = (chainId: number): Chain | undefined => {
  return DEFAULT_SUPPORTED_CHAINS.find(chain => chain.id === chainId);
}; 