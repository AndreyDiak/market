import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';
import { CompanyModule } from './company/company.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { OfferModule } from './offer/offer.module';
import { CupService } from './cup/cup.service';
import { CupModule } from './cup/cup.module';
import { DealModule } from './deal/deal.module';
import { NoteModule } from './note/note.module';
import { PredictionService } from './prediction/prediction.service';
import { PredictionModule } from './prediction/prediction.module';
import { AtGuard } from './auth/guards/at.guard';

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
      DealModule,
      NoteModule,
      PredictionModule,
   ],
   providers: [
      {
         provide: APP_GUARD,
         useClass: AtGuard,
      },
   ],
})
export class AppModule {}
