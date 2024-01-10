/*
  Warnings:

  - You are about to drop the `Ingrediente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Receita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReceitaIngrediente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReceitaIngrediente" DROP CONSTRAINT "ReceitaIngrediente_ingredienteId_fkey";

-- DropForeignKey
ALTER TABLE "ReceitaIngrediente" DROP CONSTRAINT "ReceitaIngrediente_receitaId_fkey";

-- DropTable
DROP TABLE "Ingrediente";

-- DropTable
DROP TABLE "Receita";

-- DropTable
DROP TABLE "ReceitaIngrediente";

-- CreateTable
CREATE TABLE "Loja" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Frota" (
    "id" SERIAL NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "informacao" TEXT NOT NULL,
    "precodiario" INTEGER NOT NULL,
    "imagem" TEXT NOT NULL,

    CONSTRAINT "Frota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarroLoja" (
    "id" SERIAL NOT NULL,
    "lojaId" INTEGER NOT NULL,
    "carroId" INTEGER NOT NULL,

    CONSTRAINT "CarroLoja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarroLoja_lojaId_carroId_key" ON "CarroLoja"("lojaId", "carroId");

-- AddForeignKey
ALTER TABLE "CarroLoja" ADD CONSTRAINT "CarroLoja_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarroLoja" ADD CONSTRAINT "CarroLoja_carroId_fkey" FOREIGN KEY ("carroId") REFERENCES "Frota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
