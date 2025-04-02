import type { BrowserProvider, JsonRpcProvider } from 'ethers';

export type Web3Provider = BrowserProvider | JsonRpcProvider;

export type Chain = {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers: {
    name: string;
    url: string;
  }[];
  testnet: boolean;
};

export interface Web3ContextType {
  account: string | null;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  provider: Web3Provider | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchNetwork: (chainId: number) => Promise<void>;
  error: Web3Error | null;
}

export interface Web3Config {
  supportedChains: Chain[];
  defaultChain: Chain;
  autoConnect?: boolean;
  walletConnectProjectId?: string;
}

export interface Web3Error {
  message: string;
  code?: number;
  data?: unknown;
} 