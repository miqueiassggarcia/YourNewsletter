-- CreateTable
CREATE TABLE "NewsletterSubscribers" (
    "id" SERIAL NOT NULL,
    "id_newsletter" INTEGER NOT NULL,
    "user_username" TEXT NOT NULL,

    CONSTRAINT "NewsletterSubscribers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsletterSubscribers" ADD CONSTRAINT "NewsletterSubscribers_id_newsletter_fkey" FOREIGN KEY ("id_newsletter") REFERENCES "NewsLetter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterSubscribers" ADD CONSTRAINT "NewsletterSubscribers_user_username_fkey" FOREIGN KEY ("user_username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
