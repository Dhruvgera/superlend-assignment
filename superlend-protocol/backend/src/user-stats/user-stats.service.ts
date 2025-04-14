import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStats, Asset } from './interfaces/user-stats.interface';

@Injectable()
export class UserStatsService {
  // Mock data for demonstration
  private readonly mockUserStats: Record<string, UserStats> = {
    '0x1234567890123456789012345678901234567890': {
      address: '0x1234567890123456789012345678901234567890',
      suppliedAssets: [
        { symbol: 'ETH', amount: 2.5, usdValue: 5000 }, // ETH price around $2k
        { symbol: 'USDC', amount: 1000, usdValue: 1000 },
      ],
      borrowedAssets: [
        { symbol: 'DAI', amount: 2000, usdValue: 2000 },
      ],
      healthFactor: 2.5, // pretty safe position
      netApy: 0.025, // 2.5% positive APY
      totalSuppliedUsd: 6000,
      totalBorrowedUsd: 2000,
    },
    '0xabcdef0123456789abcdef0123456789abcdef01': {
      address: '0xabcdef0123456789abcdef0123456789abcdef01',
      suppliedAssets: [
        { symbol: 'BTC', amount: 0.5, usdValue: 15000 },
        { symbol: 'ETH', amount: 10, usdValue: 20000 },
      ],
      borrowedAssets: [
        { symbol: 'USDT', amount: 5000, usdValue: 5000 }, 
        { symbol: 'USDC', amount: 10000, usdValue: 10000 },
      ],
      healthFactor: 1.8, // a bit risky
      netApy: -0.01, // negative APY - might need to adjust position
      totalSuppliedUsd: 35000,
      totalBorrowedUsd: 15000,
    },
  };

  async getUserStats(address: string): Promise<UserStats> {
    // Convert to lowercase to handle different case inputs
    const userStatsKey = address.toLowerCase();
    const userStats = this.mockUserStats[userStatsKey];
    
    if (!userStats) {
      // If user doesn't exist, return empty stats
      // Could throw error instead but this is probably better UX
      return this.createEmptyUserStats(address);
    }
    
    return userStats;
  }

  private createEmptyUserStats(address: string): UserStats {
    // Default values for new users
    return {
      address,
      suppliedAssets: [],
      borrowedAssets: [],
      healthFactor: 0,
      netApy: 0,
      totalSuppliedUsd: 0,
      totalBorrowedUsd: 0,
    };
  }

  // In a real application, we would fetch this data from Aave or other protocols using SDKs/APIs
  // Example of how we might implement it with real Aave SDK (pseudocode):
  /*
  async getAaveUserStats(address: string): Promise<UserStats> {
    // Initialize Aave SDK
    const aaveClient = new AaveClient(provider);
    
    // Fetch user reserves data
    const userReserves = await aaveClient.getUserReserves(address);
    
    // Process supplied assets
    const suppliedAssets: Asset[] = userReserves
      .filter(reserve => reserve.currentATokenBalance > 0)
      .map(reserve => ({
        symbol: reserve.reserve.symbol,
        amount: reserve.currentATokenBalance,
        usdValue: reserve.currentATokenBalance * reserve.reserve.priceInUsd
      }));
      
    // Process borrowed assets  
    const borrowedAssets: Asset[] = userReserves
      .filter(reserve => reserve.currentVariableDebt > 0 || reserve.currentStableDebt > 0)
      .map(reserve => ({
        symbol: reserve.reserve.symbol,
        amount: reserve.currentVariableDebt + reserve.currentStableDebt,
        usdValue: (reserve.currentVariableDebt + reserve.currentStableDebt) * reserve.reserve.priceInUsd
      }));
    
    // Calculate totals  
    const totalSuppliedUsd = suppliedAssets.reduce((sum, asset) => sum + asset.usdValue, 0);
    const totalBorrowedUsd = borrowedAssets.reduce((sum, asset) => sum + asset.usdValue, 0);
    
    // Get health factor
    const healthFactor = await aaveClient.getUserHealthFactor(address);
    
    // Calculate net APY
    const netApy = this.calculateNetApy(userReserves);
    
    return {
      address,
      suppliedAssets,
      borrowedAssets,
      healthFactor,
      netApy,
      totalSuppliedUsd,
      totalBorrowedUsd
    };
  }
  
  private calculateNetApy(userReserves): number {
    // Complex calculation based on deposit APYs, borrow rates, and amounts
    // This is a simplified example
    let supplyInterest = 0;
    let borrowInterest = 0;
    let totalSupply = 0;
    let totalBorrow = 0;
    
    for (const reserve of userReserves) {
      if (reserve.currentATokenBalance > 0) {
        const supplyUsd = reserve.currentATokenBalance * reserve.reserve.priceInUsd;
        supplyInterest += supplyUsd * reserve.reserve.supplyAPY;
        totalSupply += supplyUsd;
      }
      
      const totalDebt = reserve.currentVariableDebt + reserve.currentStableDebt;
      if (totalDebt > 0) {
        const borrowUsd = totalDebt * reserve.reserve.priceInUsd;
        borrowInterest += borrowUsd * reserve.reserve.variableBorrowAPY;
        totalBorrow += borrowUsd;
      }
    }
    
    const annualSupplyInterest = totalSupply > 0 ? supplyInterest / totalSupply : 0;
    const annualBorrowInterest = totalBorrow > 0 ? borrowInterest / totalBorrow : 0;
    
    // Calculate net APY considering the relative amounts
    if (totalSupply === 0) return 0;
    
    return annualSupplyInterest - (annualBorrowInterest * totalBorrow / totalSupply);
  }
  */
} 