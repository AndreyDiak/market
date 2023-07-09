/*
  Warnings:

  - You are about to drop the column `stockId` on the `Portfolio` table. All the data in the column will be lost.
  - Added the required column `assetId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentCount` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPrice` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Asset" AS ENUM ('STOCK', 'BOND');

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "stockId",
ADD COLUMN     "assetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "currentCount" INTEGER NOT NULL,
ADD COLUMN     "currentPrice" INTEGER NOT NULL,
ADD COLUMN     "type" "Asset" NOT NULL DEFAULT 'STOCK';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
