/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bond" ALTER COLUMN "curent_coupon" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "balance" DROP NOT NULL;
