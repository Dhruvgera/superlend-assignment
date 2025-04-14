import { Module } from '@nestjs/common';
import { UserStatsModule } from './user-stats/user-stats.module';

@Module({
  imports: [UserStatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {} 