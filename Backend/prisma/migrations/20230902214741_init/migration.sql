/*
  Warnings:

  - Changed the type of `token_generate_time` on the `EmailConfirmation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `token_expiry_time` on the `EmailConfirmation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmailConfirmation" DROP COLUMN "token_generate_time",
ADD COLUMN     "token_generate_time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "token_expiry_time",
ADD COLUMN     "token_expiry_time" TIMESTAMP(3) NOT NULL;
