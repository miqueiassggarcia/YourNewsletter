-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "email_cofirmado" BOOLEAN NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailConfirmacao" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "token_confirmacao" VARCHAR(255) NOT NULL,
    "token_data_confirmacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailConfirmacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmailConfirmacao" ADD CONSTRAINT "EmailConfirmacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
