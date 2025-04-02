import { BSC, BSC_TESTNET } from '@/components/react/web3/constants/chains';
import type { ContractAddresses } from '@/components/react/web3/types/contracts';
import { PRESALE_ABI } from '../abi/presale';
import { BUSD_ABI } from '../abi/busd';

// 预售合约地址
export const presaleAddresses: ContractAddresses = {
  [BSC.id]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BSC 主网地址
  [BSC_TESTNET.id]: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', // BSC 测试网地址
};

// BUSD 合约地址
export const busdAddresses: ContractAddresses = {
  [BSC.id]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BSC BUSD 合约地址
  [BSC_TESTNET.id]: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', // BSC 测试网 BUSD 合约地址
};

// 合约 ABI
export const presaleAbi = PRESALE_ABI;
export const busdAbi = BUSD_ABI;

// 支持的链
export const supportedChains = [BSC, BSC_TESTNET];
export const defaultChain = BSC_TESTNET; 