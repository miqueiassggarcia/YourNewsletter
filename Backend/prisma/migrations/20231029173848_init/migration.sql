/*
  Warnings:

  - The primary key for the `NewsletterSubscribers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `NewsletterSubscribers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsletterSubscribers" DROP CONSTRAINT "NewsletterSubscribers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "NewsletterSubscribers_pkey" PRIMARY KEY ("id_newsletter", "user_username");
