// filepath: /frontend/src/components/Books.js
import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';
import StripeCheckout from 'react-stripe-checkout';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  const handleToken = async (token, bookId) => {
    const response = await fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, bookId })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      {books.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <p>${book.price}</p>
          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
            token={(token) => handleToken(token, book._id)}
            amount={book.price * 100}
            name={book.title}
          />
        </div>
      ))}
    </div>
  );
};

export default Books;