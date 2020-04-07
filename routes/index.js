const express = require('express');
const router = express.Router();

let notes = [];

router.get('/', function(req, res) {
  return res.json({"hello": "world!"});
});

router.get('/api/notes/', (req, res) => {
  return res.json(notes);
});

router.post('/api/notes/', (req, res) => {
  notes.push({id: notes.length + 1, text: req.body.text});
  return res.json(notes);
});

router.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== Number(req.params.id));
  return res.json(notes);
})

module.exports = router;
