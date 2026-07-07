-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('SSLCOMMERZ', 'STRIPE');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "provider" "PaymentProvider" NOT NULL DEFAULT 'SSLCOMMERZ';
