import { BSC, BSC_TESTNET } from '@/components/react/web3/constants/chains';
import { createContractConfig } from '@/components/react/web3/constants/contracts';

// 预售合约地址
const presaleAddresses = {
  [BSC.id]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BSC 主网地址
  [BSC_TESTNET.id]: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', // BSC 测试网地址
};

// BUSD 合约地址
const busdAddresses = {
  [BSC.id]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BSC BUSD 合约地址
  [BSC_TESTNET.id]: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', // BSC 测试网 BUSD 合约地址
};

// 加载 ABI
export const loadAbi = async (name: string) => {
  const response = await fetch(`/abi/${name}.json`);
  return await response.json();
};

// 创建合约配置
export const initContractConfigs = async () => {
  const [presaleAbi, busdAbi] = await Promise.all([
    loadAbi('presale'),
    loadAbi('busd'),
  ]);

  return {
    presale: createContractConfig(presaleAddresses, presaleAbi),
    busd: createContractConfig(busdAddresses, busdAbi),
  };
}; 