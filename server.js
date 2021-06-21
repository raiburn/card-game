const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const { Deck, Hand } = require('./deck/deck');

const deck = new Deck();
let table = deck.dispatchCards(5);
console.log(table);

app.get('/deck/:size', (req, res) => {
    const {size} = req.params;
    res.send(deck.dispatchCards(size));
  });


app.get('/table', (req, res) => {   
    res.send(table);
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});