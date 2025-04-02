import type { ContractConfig, ContractConfigs, ContractAddresses } from '../types/contracts';

export type { ContractConfigs };

export function createContractConfig(addresses: ContractAddresses, abi: any[]): ContractConfigs {
  return Object.fromEntries(
    Object.entries(addresses).map(([chainId, address]) => [
      chainId,
      {
        address,
        abi,
      },
    ])
  );
} 