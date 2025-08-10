const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Nossa conexão

const Lead = sequelize.define('Lead', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome_estabelecimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Novo', // Status padrão
  },
  fonte_dados: {
    type: DataTypes.STRING,
  }
}, {
  // Opções do modelo
  tableName: 'leads', // Força o nome da tabela a ser 'leads'
  timestamps: true,   // Adiciona createdAt e updatedAt
});

module.exports = Lead;