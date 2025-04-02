import React, { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { Web3Provider, ConnectButton, useWeb3, useContract } from '@/components/react/web3';
import { ContractFactory } from '@/components/react/web3/utils/contractFactory';
import { createContractConfig } from '@/components/react/web3/constants/contracts';
import { presaleAddresses, busdAddresses, presaleAbi, busdAbi, supportedChains, defaultChain } from './config/contracts';

const DappContent: React.FC<{ contracts: any }> = ({ contracts }) => {
  const { chainId, isConnected } = useWeb3();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // 获取合约实例
  const presaleContract = useContract(
    chainId ? contracts.presale[chainId] : null
  );
  const busdContract = useContract(
    chainId ? contracts.busd[chainId] : null
  );

  const handleBuy = useCallback(async () => {
    if (!presaleContract || !busdContract || !amount || !chainId) return;

    try {
      setLoading(true);
      // 将输入金额转换为 wei
      const amountInWei = ContractFactory.parseUnits(amount);

      // 授权 BUSD
      const approveTx = await busdContract.approve(
        contracts.presale[chainId].address,
        amountInWei
      );
      await approveTx.wait();
      message.success('授权成功！');

      // 购买
      const buyTx = await presaleContract.buy(amountInWei);
      await buyTx.wait();

      setAmount('');
      message.success('购买成功！');
    } catch (error: any) {
      if (error.code === 4001) {
        message.error('用户取消了交易');
      } else {
        message.error(error.message || '购买失败');
      }
    } finally {
      setLoading(false);
    }
  }, [presaleContract, busdContract, amount, chainId, contracts]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-end mb-6">
        <ConnectButton />
      </div>

      {isConnected ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">预售</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                购买数量 (BUSD)
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="输入 BUSD 数量"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleBuy}
                  disabled={loading || !amount}
                  className={`
                    px-6 py-2 rounded-lg font-medium transition-all duration-200
                    ${loading || !amount
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    }
                  `}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      处理中...
                    </div>
                  ) : (
                    '购买'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            请连接钱包以继续
          </h2>
          <p className="text-gray-600 mb-4">
            连接钱包后即可参与预售
          </p>
        </div>
      )}
    </div>
  );
};

const PreSalePage: React.FC = () => {
  const [contracts, setContracts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const configs = {
          presale: createContractConfig(presaleAddresses, presaleAbi),
          busd: createContractConfig(busdAddresses, busdAbi),
        };
        setContracts(configs);
      } catch (error) {
        message.error('加载合约配置失败');
        console.error('Failed to load contract configs:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!contracts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            加载失败
          </h2>
          <p className="text-gray-600">
            无法加载合约配置，请刷新页面重试
          </p>
        </div>
      </div>
    );
  }

  return (
    <Web3Provider
      config={{
        supportedChains,
        defaultChain,
        autoConnect: true,
      }}
      contracts={contracts}
    >
      <DappContent contracts={contracts} />
    </Web3Provider>
  );
};

export default PreSalePage; 