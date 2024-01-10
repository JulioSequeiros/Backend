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