/*
  Warnings:

  - You are about to drop the `Bond` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BondPortfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BondPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bond" DROP CONSTRAINT "Bond_companyId_fkey";

-- DropForeignKey
ALTER TABLE "BondPortfolio" DROP CONSTRAINT "BondPortfolio_bondId_fkey";

-- DropForeignKey
ALTER TABLE "BondPortfolio" DROP CONSTRAINT "BondPortfolio_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "BondPrice" DROP CONSTRAINT "BondPrice_bondId_fkey";

-- DropTable
DROP TABLE "Bond";

-- DropTable
DROP TABLE "BondPortfolio";

-- DropTable
DROP TABLE "BondPrice";
