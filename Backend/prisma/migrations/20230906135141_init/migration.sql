/*
  Warnings:

  - Added the required column `password` to the `EmailConfirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_confirmed` to the `EmailConfirmation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailConfirmation" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "token_confirmed" BOOLEAN NOT NULL;
