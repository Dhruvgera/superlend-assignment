export interface Asset {
  symbol: string;
  amount: number;
  usdValue: number;
}

export interface UserStats {
  address: string;
  suppliedAssets: Asset[];
  borrowedAssets: Asset[];
  healthFactor: number;
  netApy?: number;
  totalSuppliedUsd: number;
  totalBorrowedUsd: number;
} 