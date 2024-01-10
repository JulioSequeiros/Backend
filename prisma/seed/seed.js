import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const loja = await prisma.loja.createMany({
    data: [{
      name: 'Happy Car Rent Viana',
      address: 'Endereço A',
      imagem: 'https://www.cm-viana-castelo.pt/wp-content/uploads/2023/07/DJI_0529-scaled.jpg',
      descricao: 'Loja localizada no centro de Viana do Castelo',
      email: 'happynewcar.viana@happynewcar.pt',
      telefone: 258800700,
      carrosLoja: {
        create: [
          {
            carro: {
              create: {
                marca: 'Volkswagen',
                modelo: 'Jetta',
                descricao: 'O Jetta é um carro sedan médio da Volkswagen. Ele possui um motor 1.4 TSI de 150 cv, uma transmissão automática de 6 velocidades e um consumo médio de 6,0 litros por 100 km.',
                informacao: 'O Jetta está disponível na loja de Viana do Castelo',
                precodiario: 106,
                imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Volkswagen_Jetta_VII_IMG_2964.jpg/1920px-Volkswagen_Jetta_VII_IMG_2964.jpg',
              },
            },
          },
          {
            carro: {
              create: {
                marca: 'Fiat',
                modelo: 'Cronos',
                descricao: 'O Cronos é um carro sedan compacto da Fiat. Ele possui um motor 1.3 Firefly de 109 cv, uma transmissão manual de 5 velocidades ou automática de 6 velocidades e um consumo médio de 5,5 litros por 100 km.',
                informacao: 'O Cronos está disponível nas loja de Viana do Castelo.',
                precodiario: 117,
                imagem: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Fiat_Cronos_1.8_16V_E.Torq_Precision.jpg',
              },
            },
          },
        ],
      },
    },
        ],
    include: {
      carrosLoja: {
        include: {
          carro: true,
        },
      },
    },

  });
  console.log('Lojas criadas');
}

main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
      process.exit(1)
    });
