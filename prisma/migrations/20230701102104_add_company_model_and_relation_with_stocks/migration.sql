/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Stock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "ownerId",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_name_key" ON "Stock"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_companyId_key" ON "Stock"("companyId");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
