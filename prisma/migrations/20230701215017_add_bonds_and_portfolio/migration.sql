/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `assetId` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `currentCount` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `currentPrice` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `firstTimeToUpload` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_count` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_price` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_companyId_fkey";

-- DropIndex
DROP INDEX "Stock_companyId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "assetId",
DROP COLUMN "count",
DROP COLUMN "ownerId",
ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "companyId",
DROP COLUMN "currentCount",
DROP COLUMN "currentPrice",
DROP COLUMN "firstTimeToUpload",
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_count" INTEGER NOT NULL,
ADD COLUMN     "current_price" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Bond" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Asset" NOT NULL DEFAULT 'BOND',
    "description" TEXT,
    "prices" INTEGER[],
    "current_price" INTEGER NOT NULL,
    "current_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "curent_coupon" INTEGER NOT NULL,
    "coupon_payments_value" INTEGER[],
    "coupon_payments_dates" TIMESTAMP(3)[],
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "Bond_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockPortfolio" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "stock_id" INTEGER NOT NULL,

    CONSTRAINT "StockPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BondPortfolio" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "bond_id" INTEGER NOT NULL,

    CONSTRAINT "BondPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bond_name_key" ON "Bond"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bond_company_id_key" ON "Bond"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "StockPortfolio_stock_id_key" ON "StockPortfolio"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "BondPortfolio_bond_id_key" ON "BondPortfolio"("bond_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_company_id_key" ON "Stock"("company_id");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bond" ADD CONSTRAINT "Bond_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockPortfolio" ADD CONSTRAINT "StockPortfolio_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BondPortfolio" ADD CONSTRAINT "BondPortfolio_bond_id_fkey" FOREIGN KEY ("bond_id") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
