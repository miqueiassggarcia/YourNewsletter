-- AlterTable
ALTER TABLE "EmailConfirmation" ALTER COLUMN "token_generate_time" SET DATA TYPE TEXT,
ALTER COLUMN "token_expiry_time" SET DATA TYPE TEXT,
ALTER COLUMN "token_confirmation" SET DATA TYPE TEXT;
