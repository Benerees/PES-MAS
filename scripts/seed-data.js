const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'monitoramento_db';

const sampleEvents = [
  {
    equipment_id: 'EQ001',
    data_hora: new Date(),
    classe: 'Aprovado',
    total: 150,
    temperatura: 75.5,
    pressao: 2.3,
    velocidade: 1200
  },
  {
    equipment_id: 'EQ001',
    data_hora: new Date(Date.now() - 3600000),
    classe: 'Reprovado',
    total: 25,
    temperatura: 82.1,
    pressao: 2.8,
    velocidade: 1350
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGO_URL);
  
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
    // Inserir eventos de exemplo
    await db.collection('eventos').insertMany(sampleEvents);
    console.log('✅ Dados de exemplo inseridos com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao inserir dados:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();