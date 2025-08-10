const { Sequelize } = require('sequelize');

// Inicializa a conexão do Sequelize com o banco de dados SQLite
console.log('Inicializando a conexão com o banco de dados SQLite...');

const sequelize = new Sequelize({
  // Define que estamos usando o dialeto (tipo) do SQLite
  dialect: 'sqlite',

  // Define o caminho e o nome do arquivo que irá armazenar nosso banco de dados
  storage: './database.sqlite',

  // Habilita o logging para que possamos ver no console os comandos SQL
  // que o Sequelize está executando por baixo dos panos.
  // É muito útil para depuração durante o desenvolvimento.
  logging: console.log,
});

// Testa a conexão com o banco de dados
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados SQLite estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testConnection();

// Exporta a instância do sequelize para ser utilizada em outras partes da aplicação
module.exports = sequelize;