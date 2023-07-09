-- AddForeignKey
ALTER TABLE "StockPortfolio" ADD CONSTRAINT "StockPortfolio_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BondPortfolio" ADD CONSTRAINT "BondPortfolio_bondId_fkey" FOREIGN KEY ("bondId") REFERENCES "Bond"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
