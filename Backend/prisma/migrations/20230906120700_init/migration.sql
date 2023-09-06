/*
  Warnings:

  - The primary key for the `EmailConfirmation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmailConfirmation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailConfirmation" DROP CONSTRAINT "EmailConfirmation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EmailConfirmation_pkey" PRIMARY KEY ("email");
