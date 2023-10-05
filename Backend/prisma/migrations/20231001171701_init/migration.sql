/*
  Warnings:

  - The primary key for the `EmailConfirmation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `EmailConfirmation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `EmailConfirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailConfirmation" DROP CONSTRAINT "EmailConfirmation_pkey",
ADD COLUMN     "username" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "EmailConfirmation_pkey" PRIMARY KEY ("username");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "username" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfirmation_email_key" ON "EmailConfirmation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
