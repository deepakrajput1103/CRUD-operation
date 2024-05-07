const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let animals = [
  { id: 1, name: 'Lion', species: 'Mammal' },
  { id: 2, name: 'Eagle', species: 'Bird' },
  { id: 3, name: 'Snake', species: 'Reptile' }
];

// GET all animals
app.get('/animals', (req, res) => {
  res.json(animals);
});

// GET a single animal by id
app.get('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const animal = animals.find(animal => animal.id === id);
  if (!animal) {
    res.status(404).json({ message: 'Animal not found' });
  } else {
    res.json(animal);
  }
});

// POST a new animal
app.post('/animals', (req, res) => {
  const { name, species } = req.body;
  const id = animals.length + 1;
  const newAnimal = { id, name, species };
  animals.push(newAnimal);
  res.status(201).json(newAnimal);
});

// PUT update an existing animal
app.put('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, species } = req.body;
  const index = animals.findIndex(animal => animal.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Animal not found' });
  } else {
    animals[index] = { id, name, species };
    res.json(animals[index]);
  }
});

// DELETE an animal
app.delete('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  animals = animals.filter(animal => animal.id !== id);
  res.status(204).end();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
