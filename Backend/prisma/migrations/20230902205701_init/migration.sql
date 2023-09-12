/*
  Warnings:

  - You are about to drop the column `token_confirmacao` on the `EmailConfirmation` table. All the data in the column will be lost.
  - You are about to drop the column `token_data_geracao` on the `EmailConfirmation` table. All the data in the column will be lost.
  - Added the required column `token_confirmation` to the `EmailConfirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_generate_time` to the `EmailConfirmation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `token_expiry_time` on the `EmailConfirmation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmailConfirmation" DROP COLUMN "token_confirmacao",
DROP COLUMN "token_data_geracao",
ADD COLUMN     "token_confirmation" VARCHAR(255) NOT NULL,
ADD COLUMN     "token_generate_time" INTEGER NOT NULL,
DROP COLUMN "token_expiry_time",
ADD COLUMN     "token_expiry_time" INTEGER NOT NULL;
