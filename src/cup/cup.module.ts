import { CupGateway } from './cup.gateway';
import { Module } from '@nestjs/common';
import { CupController } from './cup.controller';
import { CupService } from './cup.service';

@Module({
   providers: [CupService, CupGateway],
   controllers: [CupController],
})
export class CupModule {}
