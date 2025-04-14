import { Asset, UserStats } from '../interfaces/user-stats.interface';

export class AssetDto implements Asset {
  symbol: string;
  amount: number;
  usdValue: number;
}

export class UserStatsDto implements UserStats {
  address: string;
  suppliedAssets: AssetDto[];
  borrowedAssets: AssetDto[];
  healthFactor: number;
  netApy?: number;
  totalSuppliedUsd: number;
  totalBorrowedUsd: number;
} 