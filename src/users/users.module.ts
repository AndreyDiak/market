import { Module, forwardRef } from '@nestjs/common';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { StockModule } from 'src/stock/stock.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { StocksPortfolioService } from 'src/portfolio/stocks-portfolio/stocks-portfolio.service';

@Module({
   imports: [forwardRef(() => StockModule)],
   controllers: [UsersController],
   providers: [UsersService, PortfolioService, StocksPortfolioService],
   exports: [UsersService],
})
export class UsersModule {}
