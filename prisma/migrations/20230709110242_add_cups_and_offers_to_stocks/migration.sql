/*
  Warnings:

  - You are about to drop the `StockPrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lastPrice` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Operation" AS ENUM ('SELL', 'BUY');

-- DropForeignKey
ALTER TABLE "StockPrice" DROP CONSTRAINT "StockPrice_stockId_fkey";

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "lastPrice" INTEGER NOT NULL,
ADD COLUMN     "prices" INTEGER[];

-- DropTable
DROP TABLE "StockPrice";

-- CreateTable
CREATE TABLE "Cup" (
    "id" SERIAL NOT NULL,
    "type" "Operation" NOT NULL DEFAULT 'BUY',
    "price" INTEGER NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,

    CONSTRAINT "Cup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "cupId" INTEGER NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cup_price_key" ON "Cup"("price");

-- CreateIndex
CREATE UNIQUE INDEX "Cup_stockId_key" ON "Cup"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_userId_key" ON "Offer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_cupId_key" ON "Offer"("cupId");

-- AddForeignKey
ALTER TABLE "Cup" ADD CONSTRAINT "Cup_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_cupId_fkey" FOREIGN KEY ("cupId") REFERENCES "Cup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
