/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `RentalOrder` will be added. If there are existing duplicate values, this will fail.
  - Made the column `transactionId` on table `RentalOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RentalOrder" ALTER COLUMN "transactionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RentalOrder_transactionId_key" ON "RentalOrder"("transactionId");
