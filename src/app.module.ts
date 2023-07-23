import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stocks.module';
import { CompanyModule } from './company/company.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { OfferModule } from './offer/offer.module';
import { CupService } from './cup/cup.service';
import { CupModule } from './cup/cup.module';
import { CupGateway } from './app.gateway';

@Module({
   imports: [
      UsersModule,
      PrismaModule,
      AuthModule,
      StockModule,
      CompanyModule,
      PortfolioModule,
      OfferModule,
      CupModule,
   ],
   providers: [PrismaService, CupService, CupGateway],
})
export class AppModule {}
