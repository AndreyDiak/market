/*
  Warnings:

  - You are about to drop the column `currentCount` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `currentPrice` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `prices` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Bond` table. All the data in the column will be lost.
  - You are about to drop the column `currentCount` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `currentPrice` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `prices` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Stock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bond" DROP COLUMN "currentCount",
DROP COLUMN "currentPrice",
DROP COLUMN "prices",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "currentCount",
DROP COLUMN "currentPrice",
DROP COLUMN "prices",
DROP COLUMN "type";

-- DropEnum
DROP TYPE "Asset";

-- CreateTable
CREATE TABLE "StockPrice" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,

    CONSTRAINT "StockPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BondPrice" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "bondId" INTEGER NOT NULL,

    CONSTRAINT "BondPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockPrice" ADD CONSTRAINT "StockPrice_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BondPrice" ADD CONSTRAINT "BondPrice_bondId_fkey" FOREIGN KEY ("bondId") REFERENCES "Bond"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
