import { useMemo } from 'react';
import { Contract } from 'ethers';
import { useWeb3 } from './useWeb3';
import type { ContractConfig } from '../types/contracts';

export const useContract = (config: ContractConfig | null) => {
  const { provider } = useWeb3();

  return useMemo(() => {
    if (!provider || !config) return null;

    try {
      return new Contract(
        config.address,
        config.abi,
        provider.getSigner()
      );
    } catch (error) {
      console.error('Failed to create contract instance:', error);
      return null;
    }
  }, [provider, config]);
}; 