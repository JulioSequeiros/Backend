const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const express = require('express')

const prisma = new PrismaClient()
const app = express()

app.use(cors());
app.use(express.json())

app.get('/lojas', async (req, res) => {
    try {
      const lojas = await prisma.loja.findMany({
        include: {
          carrosLoja: {
            include: {
              carro: true,
            },
          },
        },
      });
  
      res.json(lojas);
    } catch (error) {
      console.error('Erro a obter a lojas', error);
      res.status(500).json({ error: 'Erro ao obter lojas.' });
    }
  });

app.get('/carros', async (req, res) => {
    try {
        const carros = await prisma.frota.findMany({
            include: {
                carrosLoja: {
                    include: {
                        loja: true,
                    },
                },
            },
        });

        res.json(carros);
    } catch (error) {
        console.error('Erro a obter a carros', error);
        res.status(500).json({ error: 'Erro ao obter lojas.' });
    }
});

app.get('/api/lojas/:id/carros', async (req, res) => {
    const { id } = req.params;
    const { marca } = req.query;

    try {
        // Verifica se o ID fornecido é válido
        if (isNaN(id) || id < 1) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        // Encontra a loja com base no ID
        const loja = await prisma.loja.findUnique({
            where: { id: parseInt(id) },
            include: { carrosLoja: { include: { carro: true } } },
        });
        console.log(loja)

        // Verifica se a loja foi encontrada
        if (!loja) {
            return res.status(404).json({ error: 'Loja não encontrada' });
        }

        // Filtra os carros com base na marca, se fornecida
        const carrosFiltrados = loja.carrosLoja.filter(carrosLoja => carrosLoja.carro.lojaId == loja.id)

        // Retorna as informações dos carros filtrados ou todos os carros da loja
        res.json(carrosFiltrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.use((req, res, next) => {
    res.status(404);
    return res.json({
        success: false,
        payload: null,
        message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
});

// #6
app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)