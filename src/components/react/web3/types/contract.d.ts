import { ContractConfig } from '.';

declare module '../hooks/useContract' {
  export function useContract<T = any>(config: ContractConfig | null): T | null;
} 