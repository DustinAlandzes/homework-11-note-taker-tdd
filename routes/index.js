const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/api/notes/', async (req, res) => {
  const notes = fs.readFileSync('db.json', 'utf8');
  return res.json(JSON.parse(notes));
});

router.post('/api/notes/', (req, res) => {
  const {text} = req.body;
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  const pushed_notes = [...notes, {id: notes.length + 1, text: text}];
  fs.writeFileSync('db.json', JSON.stringify(pushed_notes));
  return res.json(pushed_notes);
});

router.delete('/api/notes/:id', (req, res) => {
  const {id} = Number(req.params.id);
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  const filtered_notes = notes.filter(note => note.id !== id);
  fs.writeFileSync('db.json', JSON.stringify(filtered_notes));
  return res.json(filtered_notes);
})

module.exports = router;
