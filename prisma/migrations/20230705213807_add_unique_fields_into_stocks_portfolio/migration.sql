/*
  Warnings:

  - A unique constraint covering the columns `[stockId]` on the table `StockPortfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[portfolioId]` on the table `StockPortfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StockPortfolio_stockId_key" ON "StockPortfolio"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "StockPortfolio_portfolioId_key" ON "StockPortfolio"("portfolioId");
