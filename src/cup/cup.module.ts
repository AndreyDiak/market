import { Module } from '@nestjs/common';
import { CupController } from './cup.controller';
import { CupService } from './cup.service';

@Module({
   providers: [CupService],
   controllers: [CupController],
})
export class CupModule {}
