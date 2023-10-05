-- CreateTable
CREATE TABLE "NewsLetter" (
    "id" SERIAL NOT NULL,
    "userUsername" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "NewsLetter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetter_userUsername_key" ON "NewsLetter"("userUsername");

-- AddForeignKey
ALTER TABLE "NewsLetter" ADD CONSTRAINT "NewsLetter_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
