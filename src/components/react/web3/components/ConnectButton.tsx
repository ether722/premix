import React from 'react';
import { Button } from 'antd';
import { useWeb3 } from '../hooks/useWeb3';

export const ConnectButton: React.FC = () => {
  const { account, isConnecting, connect, disconnect } = useWeb3();

  const handleClick = () => {
    if (account) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleClick}
      loading={isConnecting}
      className="min-w-[120px]"
    >
      {account ? (
        <span>
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        '连接钱包'
      )}
    </Button>
  );
}; 