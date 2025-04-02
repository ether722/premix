import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import type { ContractConfig } from '../types/contracts';

export class ContractFactory {
  private provider: Web3Provider;
  private signer: ethers.Signer | null = null;

  constructor(provider: Web3Provider) {
    this.provider = provider;
    this.signer = provider.getSigner();
  }

  createContract(config: ContractConfig) {
    const contract = new ethers.Contract(
      config.address,
      config.abi,
      this.signer || this.provider
    );

    return contract;
  }

  static isValidAddress(address: string): boolean {
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch {
      return false;
    }
  }

  static formatUnits(value: ethers.BigNumberish, decimals = 18): string {
    return ethers.utils.formatUnits(value, decimals);
  }

  static parseUnits(value: string, decimals = 18): ethers.BigNumber {
    return ethers.utils.parseUnits(value, decimals);
  }
} 