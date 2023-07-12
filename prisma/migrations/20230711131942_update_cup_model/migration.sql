/*
  Warnings:

  - You are about to drop the column `type` on the `Cup` table. All the data in the column will be lost.
  - You are about to drop the column `prices` on the `Stock` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Cup_stockId_key";

-- AlterTable
ALTER TABLE "Cup" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "prices";
