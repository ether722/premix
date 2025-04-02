import '../utils/polyfills';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserProvider, JsonRpcProvider } from 'ethers';
import type { Chain, Web3Config, Web3ContextType, Web3Error, Web3Provider } from '../types';
import type { ContractConfigs } from '../types/contracts';
import { getChainById, DEFAULT_SUPPORTED_CHAINS } from '../constants/chains';

export const Web3Context = createContext<Web3ContextType>({
  account: null,
  chainId: null,
  isConnecting: false,
  isConnected: false,
  provider: null,
  connect: async () => {},
  disconnect: async () => {},
  switchNetwork: async () => {},
  error: null,
});

interface Web3ProviderProps {
  children: React.ReactNode;
  config?: Web3Config;
  contracts?: {
    presale?: ContractConfigs;
    busd?: ContractConfigs;
  };
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ 
  children,
  config = {
    supportedChains: DEFAULT_SUPPORTED_CHAINS,
    defaultChain: DEFAULT_SUPPORTED_CHAINS[0],
    autoConnect: false,
  },
  contracts,
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [error, setError] = useState<Web3Error | null>(null);

  const defaultConfig: Web3Config = {
    ...config,
    supportedChains: config.supportedChains,
    defaultChain: config.defaultChain,
    autoConnect: config.autoConnect,
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsConnected(true);
    } else {
      setAccount(null);
      setIsConnected(false);
    }
  };

  const handleChainChanged = (chainId: string) => {
    const newChainId = parseInt(chainId);
    setChainId(newChainId);
    window.location.reload();
  };

  const initializeProvider = async () => {
    try {
      // 检查是否存在注入的提供者（如 MetaMask）
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);
        return provider;
      }

      // 如果没有注入的提供者，使用默认的 JSON-RPC 提供者
      const chain = defaultConfig.defaultChain;
      const provider = new JsonRpcProvider(chain.rpcUrls[0]);
      setProvider(provider);
      return provider;
    } catch (error: any) {
      setError(error);
      return null;
    }
  };

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      const provider = await initializeProvider();
      if (!provider) {
        throw new Error('Failed to initialize provider');
      }

      const accounts = await provider.send('eth_requestAccounts', []);
      handleAccountsChanged(accounts);

      const network = await provider.getNetwork();
      setChainId(Number(network.chainId));

      setIsConnecting(false);
    } catch (error: any) {
      setError(error);
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (provider) {
      // 在 ethers v6 中，断开连接的逻辑由钱包处理
      setAccount(null);
      setIsConnected(false);
      setChainId(null);
    }
  };

  const switchNetwork = async (targetChainId: number) => {
    try {
      const chain = getChainById(targetChainId);
      if (!chain) {
        throw new Error('Unsupported chain');
      }

      if (!provider) {
        throw new Error('No provider available');
      }

      await provider.send('wallet_switchEthereumChain', [
        { chainId: `0x${targetChainId.toString(16)}` },
      ]);
    } catch (error: any) {
      // 如果链未添加到钱包中，添加它
      if (error.code === 4902) {
        try {
          const chain = getChainById(targetChainId);
          if (!chain) {
            throw new Error('Unsupported chain');
          }

          await provider?.send('wallet_addEthereumChain', [
            {
              chainId: `0x${targetChainId.toString(16)}`,
              chainName: chain.name,
              nativeCurrency: chain.nativeCurrency,
              rpcUrls: chain.rpcUrls,
              blockExplorerUrls: chain.blockExplorers.map(explorer => explorer.url),
            },
          ]);
        } catch (addError: any) {
          setError(addError);
        }
      } else {
        setError(error);
      }
    }
  };

  useEffect(() => {
    if (defaultConfig.autoConnect) {
      connect();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  const value = {
    account,
    chainId,
    isConnecting,
    isConnected,
    provider,
    connect,
    disconnect,
    switchNetwork,
    error,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}; 