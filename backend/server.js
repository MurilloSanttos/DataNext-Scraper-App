const express = require('express');
const app = express();
const PORT = 3001

app.get('/', (req, res) => {
    res.send('O servidor Backend está no ar!');
});

app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});