/*
  Warnings:

  - A unique constraint covering the columns `[portfolio_id]` on the table `BondPortfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[portfolio_id]` on the table `StockPortfolio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `portfolio_id` to the `BondPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolio_id` to the `StockPortfolio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BondPortfolio" DROP CONSTRAINT "BondPortfolio_bond_id_fkey";

-- DropForeignKey
ALTER TABLE "StockPortfolio" DROP CONSTRAINT "StockPortfolio_stock_id_fkey";

-- AlterTable
ALTER TABLE "BondPortfolio" ADD COLUMN     "portfolio_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StockPortfolio" ADD COLUMN     "portfolio_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BondPortfolio_portfolio_id_key" ON "BondPortfolio"("portfolio_id");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_owner_id_key" ON "Portfolio"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "StockPortfolio_portfolio_id_key" ON "StockPortfolio"("portfolio_id");

-- AddForeignKey
ALTER TABLE "StockPortfolio" ADD CONSTRAINT "StockPortfolio_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPortfolio" ADD CONSTRAINT "StockPortfolio_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BondPortfolio" ADD CONSTRAINT "BondPortfolio_bond_id_fkey" FOREIGN KEY ("bond_id") REFERENCES "Bond"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BondPortfolio" ADD CONSTRAINT "BondPortfolio_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
