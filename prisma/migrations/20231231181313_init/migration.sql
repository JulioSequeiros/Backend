-- CreateTable
CREATE TABLE "Receita" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "prepTime" TEXT NOT NULL,
    "cookTime" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "feito" BOOLEAN NOT NULL,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingrediente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Ingrediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceitaIngrediente" (
    "receitaId" INTEGER NOT NULL,
    "ingredienteId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "ReceitaIngrediente_pkey" PRIMARY KEY ("receitaId","ingredienteId")
);

-- AddForeignKey
ALTER TABLE "ReceitaIngrediente" ADD CONSTRAINT "ReceitaIngrediente_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "Receita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceitaIngrediente" ADD CONSTRAINT "ReceitaIngrediente_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "Ingrediente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
