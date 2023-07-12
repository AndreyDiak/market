/*
  Warnings:

  - Made the column `balance` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Offer_cupId_key";

-- DropIndex
DROP INDEX "Offer_userId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "balance" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
