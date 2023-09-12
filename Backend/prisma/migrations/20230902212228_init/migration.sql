/*
  Warnings:

  - Changed the type of `token_confirmation` on the `EmailConfirmation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmailConfirmation" DROP COLUMN "token_confirmation",
ADD COLUMN     "token_confirmation" INTEGER NOT NULL;
