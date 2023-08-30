import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealGateway } from './deal.gateway';

@Module({
   providers: [DealService, DealGateway],
})
export class DealModule {}
