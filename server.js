const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const { Deck, Hand } = require('./deck/deck');

const deck = new Deck();
let table = deck.dispatchCards(5);

app.get('/deck/:size', (req, res) => {
    const {size} = req.params;
    res.send(deck.dispatchCards(size));
  });


app.get('/table', (req, res) => {   
    res.send(table);
});
app.get('/game', (req, res) =>{
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Roboto:wght@100&display=swap" rel="stylesheet"> 
        <link rel="stylesheet" href="styles.css">
        <script src="script.js"></script>
        <title>Texas game</title>
    </head>
    <body>
        <h1>Playing Texas</h1>
        <h2>Table</h2>
        <div class="deck table"></div>
        <h2>Hand</h2>
        <div class="deck hand"></div>
        </div>
    </body>
    </html>`)
})

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

