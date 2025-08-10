const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

module.exports = function (req, res, next) {
  // Pega o token do cabeçalho de autorização
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  // O token vem no formato "Bearer <token>", então pegamos apenas a segunda parte
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Formato de token inválido.' });
  }

  try {
    // Verifica o token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Adiciona o payload do usuário à requisição
    next(); // Passa para a próxima função (a rota em si)
  } catch (ex) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};