const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create a sample store
    const loja = await prisma.loja.create({
      data: {
        name: 'Happy Car Rent Porto',
        address: 'Rua do Porto',
        imagem: 'https://example.com/store-image.jpg',
        descricao: 'Loja localizada no centro do porto',
        email: 'info.porto@happycarrent.com',
        telefone: 205938414,
        carrosLoja: {
          create: [
            {
              carro: {
                create: {
                  marca: 'Porsche',
                  modelo: '911',
                  descricao: 'A high-performance sports car',
                  informacao: 'Available for rent',
                  precodiario: 150,
                  imagem: 'https://example.com/porsche-911.jpg',
                  tipo: 'Sports Car',
                },
              },
            },
            {
              carro: {
                create: {
                  marca: 'Jeep',
                  modelo: 'Grand Cherokee',
                  descricao: 'A versatile SUV',
                  informacao: 'Available for rent',
                  precodiario: 120,
                  imagem: 'https://example.com/jeep-grand-cherokee.jpg',
                  tipo: 'SUV',
                },
              },
            },
          ],
        },
      },
      include: {
        carrosLoja: {
          include: {
            carro: true,
          },
        },
      },
    });

    console.log('Store and cars seeded:', loja);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();