// filepath: /src/services/bookService.js
const API_URL = 'http://localhost:5000/api/books';

export const getBooks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createBook = async (book) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  });
  return response.json();
};