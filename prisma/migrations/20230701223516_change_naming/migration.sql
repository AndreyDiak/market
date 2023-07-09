/*
  Warnings:

  - You are about to drop the column `company_id` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `coupon_payments_dates` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `coupon_payments_value` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `curent_coupon` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `current_count` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `current_price` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `bond_id` on the `BondPortfolio` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_id` on the `BondPortfolio` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `current_count` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `current_price` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_id` on the `StockPortfolio` table. All the data in the column will be lost.
  - You are about to drop the column `stock_id` on the `StockPortfolio` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `Bond` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bondId]` on the table `BondPortfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[portfolioId]` on the table `BondPortfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stockId]` on the table `StockPortfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[portfolioId]` on the table `StockPortfolio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentCount` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPrice` to the `Bond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bondId` to the `BondPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `BondPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentCount` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPrice` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioId` to the `StockPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockId` to the `StockPortfolio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bond" DROP CONSTRAINT "Bond_company_id_fkey";

-- DropForeignKey
ALTER TABLE "BondPortfolio" DROP CONSTRAINT "BondPortfolio_bond_id_fkey";

-- DropForeignKey
ALTER TABLE "BondPortfolio" DROP CONSTRAINT "BondPortfolio_portfolio_id_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_company_id_fkey";

-- DropForeignKey
ALTER TABLE "StockPortfolio" DROP CONSTRAINT "StockPortfolio_portfolio_id_fkey";

-- DropForeignKey
ALTER TABLE "StockPortfolio" DROP CONSTRAINT "StockPortfolio_stock_id_fkey";

-- DropIndex
DROP INDEX "Bond_company_id_key";

-- DropIndex
DROP INDEX "BondPortfolio_bond_id_key";

-- DropIndex
DROP INDEX "BondPortfolio_portfolio_id_key";

-- DropIndex
DROP INDEX "Portfolio_owner_id_key";

-- DropIndex
DROP INDEX "Stock_company_id_key";

-- DropIndex
DROP INDEX "StockPortfolio_portfolio_id_key";

-- DropIndex
DROP INDEX "StockPortfolio_stock_id_key";

-- AlterTable
ALTER TABLE "Bond" DROP COLUMN "company_id",
DROP COLUMN "coupon_payments_dates",
DROP COLUMN "coupon_payments_value",
DROP COLUMN "created_at",
DROP COLUMN "curent_coupon",
DROP COLUMN "current_count",
DROP COLUMN "current_price",
DROP COLUMN "updated_at",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "couponPaymentsDates" TIMESTAMP(3)[],
ADD COLUMN     "couponPaymentsValue" INTEGER[],
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "curentCoupon" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentCount" INTEGER NOT NULL,
ADD COLUMN     "currentPrice" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BondPortfolio" DROP COLUMN "bond_id",
DROP COLUMN "portfolio_id",
ADD COLUMN     "bondId" INTEGER NOT NULL,
ADD COLUMN     "portfolioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "owner_id",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "company_id",
DROP COLUMN "created_at",
DROP COLUMN "current_count",
DROP COLUMN "current_price",
DROP COLUMN "updated_at",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentCount" INTEGER NOT NULL,
ADD COLUMN     "currentPrice" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "StockPortfolio" DROP COLUMN "portfolio_id",
DROP COLUMN "stock_id",
ADD COLUMN     "portfolioId" INTEGER NOT NULL,
ADD COLUMN     "stockId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Bond_companyId_key" ON "Bond"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "BondPortfolio_bondId_key" ON "BondPortfolio"("bondId");

-- CreateIndex
CREATE UNIQUE INDEX "BondPortfolio_portfolioId_key" ON "BondPortfolio"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_ownerId_key" ON "Portfolio"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_companyId_key" ON "Stock"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "StockPortfolio_stockId_key" ON "StockPortfolio"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "StockPortfolio_portfolioId_key" ON "StockPortfolio"("portfolioId");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bond" ADD CONSTRAINT "Bond_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPortfolio" ADD CONSTRAINT "StockPortfolio_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPortfolio" ADD CONSTRAINT "StockPortfolio_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BondPortfolio" ADD CONSTRAINT "BondPortfolio_bondId_fkey" FOREIGN KEY ("bondId") REFERENCES "Bond"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BondPortfolio" ADD CONSTRAINT "BondPortfolio_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
