import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   ParseIntPipe,
   Post,
   Query,
   Request,
} from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { Prediction } from '@prisma/client';
import { MeUserRes } from 'src/users/types';

@Controller('prediction')
export class PredictionController {
   constructor(private readonly predictionService: PredictionService) {}

   @Post('create')
   @HttpCode(HttpStatus.CREATED)
   async create(
      @Request() req,
      @Body() createPredictionDto: CreatePredictionDto,
   ): Promise<Prediction> {
      const { userId } = req.user as MeUserRes;
      return this.predictionService.create({
         ...createPredictionDto,
         authorId: userId,
      });
   }

   @Get('findBest')
   async findByStockId(@Query('stockId', ParseIntPipe) stockId: number): Promise<Prediction> {
      return this.predictionService.findBest(stockId);
   }
}
