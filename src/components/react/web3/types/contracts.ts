export type ContractConfig = {
  address: string;
  abi: any[];
};

export type ContractAddresses = {
  [chainId: number]: string;
};

export type ContractConfigs = {
  [chainId: number]: ContractConfig;
}; 