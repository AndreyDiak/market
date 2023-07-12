-- DropIndex
DROP INDEX "Cup_price_key";

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
