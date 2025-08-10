const express = require('express');
const sequelize = require('./config/database');

// Importações
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware'); // Nosso middleware de proteção

const app = express();
const PORT = 3001;
app.use(express.json());

async function startServer() {
  try {
    await sequelize.sync(); // Sincroniza todos os modelos (Leads e Users)
    console.log('Banco de dados sincronizado.');

    // Rotas públicas de autenticação (não precisam de proteção)
    app.use('/api/auth', authRoutes);

    // Rotas de Leads agora estão protegidas pelo middleware
    // Todas as requisições para /api/leads precisarão de um token válido
    app.use('/api', authMiddleware, leadRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível iniciar o servidor:', error);
  }
}

startServer();