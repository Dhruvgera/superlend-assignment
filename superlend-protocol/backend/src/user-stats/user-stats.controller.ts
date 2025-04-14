import { Controller, Get, Param, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { UserStatsService } from './user-stats.service';
import { UserStats } from './interfaces/user-stats.interface';

@Controller('user-stats')
export class UserStatsController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @Get(':address')
  async getUserStats(@Param('address') address: string): Promise<UserStats> {
    // Basic validation for Ethereum address format
    if (!this.isValidEthAddress(address)) {
      // Could have used BadRequestException but this is clearer
      throw new HttpException(
        `Come on, that's not a valid ETH address: ${address}`, 
        HttpStatus.BAD_REQUEST
      );
    }

    // Grab the stats from our service
    try {
      return await this.userStatsService.getUserStats(address);
    } catch (error) {
      // Log this for debugging if needed
      console.error(`Error fetching stats for ${address}:`, error);
      throw new NotFoundException(`Couldn't find stats for address: ${address}`);
    }
  }

  private isValidEthAddress(address: string): boolean {
    // Basic validation for Ethereum address: 0x followed by 40 hex characters
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
} 