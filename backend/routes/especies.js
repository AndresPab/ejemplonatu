const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las especies
router.get('/especies', (req, res) => {
    db.query('SELECT * FROM especies', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Crear una especie
router.post('/especies', (req, res) => {
    const data = req.body;
    db.query('INSERT INTO especies SET ?', data, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, ...data });
    });
});

// Actualizar una especie
router.put('/especies/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    db.query('UPDATE especies SET ? WHERE id = ?', [data, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id, ...data });
    });
});

// Eliminar una especie
router.delete('/especies/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM especies WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Especie eliminada' });
    });
});

module.exports = router;