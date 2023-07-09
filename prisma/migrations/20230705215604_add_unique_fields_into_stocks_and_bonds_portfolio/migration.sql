/*
  Warnings:

  - A unique constraint covering the columns `[bondId]` on the table `BondPortfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StockPortfolio_portfolioId_key";

-- CreateIndex
CREATE UNIQUE INDEX "BondPortfolio_bondId_key" ON "BondPortfolio"("bondId");
