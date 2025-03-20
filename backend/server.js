// filepath: /backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

mongoose.connect('mongodb://localhost:27017/chefPortfolio', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

// filepath: /backend/server.js
const stripe = require('stripe')('tu_clave_secreta_de_stripe');

app.post('/api/checkout', async (req, res) => {
  const { token, bookId } = req.body;
  const book = await Book.findById(bookId);

  const charge = await stripe.charges.create({
    amount: book.price * 100,
    currency: 'usd',
    description: book.title,
    source: token.id
  });

  res.json(charge);
});