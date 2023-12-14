/*
  Warnings:

  - The primary key for the `NewsletterSubscribers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `NewsletterSubscribers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsletterSubscribers" DROP CONSTRAINT "NewsletterSubscribers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "NewsletterSubscribers_pkey" PRIMARY KEY ("id_newsletter", "user_username");

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "id_newsletter" INTEGER NOT NULL,
    "scheduling_date" TIMESTAMP(3) NOT NULL,
    "send_date" TIMESTAMP(3) NOT NULL,
    "sent" BOOLEAN NOT NULL,
    "subject" VARCHAR(88) NOT NULL,
    "html" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_newsletter_fkey" FOREIGN KEY ("id_newsletter") REFERENCES "NewsLetter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
