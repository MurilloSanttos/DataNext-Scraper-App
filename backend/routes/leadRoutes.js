const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead'); // Importa o modelo que acabamos de criar

// ### ROTAS CRUD ###

// CREATE: Criar um novo lead
router.post('/leads', async (req, res) => {
  try {
    const novoLead = await Lead.create(req.body);
    res.status(201).json(novoLead); // 201 Created
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o lead', details: error.message });
  }
});

// READ: Obter todos os leads
router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.status(200).json(leads); // 200 OK
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os leads', details: error.message });
  }
});

// READ: Obter um lead específico por ID
router.get('/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (lead) {
      res.status(200).json(lead);
    } else {
      res.status(404).json({ error: 'Lead não encontrado' }); // 404 Not Found
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o lead', details: error.message });
  }
});

// UPDATE: Atualizar um lead por ID
router.put('/leads/:id', async (req, res) => {
  try {
    const [updated] = await Lead.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const leadAtualizado = await Lead.findByPk(req.params.id);
      res.status(200).json(leadAtualizado);
    } else {
      res.status(404).json({ error: 'Lead não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o lead', details: error.message });
  }
});

// DELETE: Deletar um lead por ID
router.delete('/leads/:id', async (req, res) => {
  try {
    const deleted = await Lead.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ error: 'Lead não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o lead', details: error.message });
  }
});

module.exports = router;