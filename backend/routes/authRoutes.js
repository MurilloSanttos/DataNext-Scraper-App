const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/auth');

// Rota de Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    // O hook no modelo User já cuidará da criptografia da senha
    const user = await User.create({ email, password });
    res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário', details: error.message });
  }
});

// Rota de Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Compara a senha enviada com a senha criptografada no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Senha inválida' }); // 401 Unauthorized
    }

    // Gera o Token JWT
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '8h' }); // Token expira em 8 horas

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
  }
});

module.exports = router;