import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserStatsService } from './user-stats.service';
import { UserStats } from './interfaces/user-stats.interface';

@Controller('user-stats')
export class UserStatsController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @Get(':address')
  async getUserStats(@Param('address') address: string): Promise<UserStats> {
    // Basic validation for Ethereum address format
    if (!this.isValidEthAddress(address)) {
      throw new NotFoundException(`Invalid Ethereum address format: ${address}`);
    }

    return this.userStatsService.getUserStats(address);
  }

  private isValidEthAddress(address: string): boolean {
    // Basic validation for Ethereum address: 0x followed by 40 hex characters
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
} 