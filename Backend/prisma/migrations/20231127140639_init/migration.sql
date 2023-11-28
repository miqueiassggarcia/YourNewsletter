-- AlterTable
ALTER TABLE "NewsLetter" ADD COLUMN     "posts_total" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subscribers_total" INTEGER NOT NULL DEFAULT 0;
