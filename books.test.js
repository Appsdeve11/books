const request = require('supertest');
const app = require('../app');

describe('GET /books', () => {
  it('should return an array of books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body.books).toBeInstanceOf(Array);
  });
});

describe('GET /books/:isbn', () => {
  it('should return a book with the given isbn', async () => {
    const response = await request(app).get('/books/1234567890');
    expect(response.status).toBe(200);
    expect(response.body.book).toBeDefined();
  });
});

describe('POST /books', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'Sample Book',
        author: 'John Doe',
        isbn: '1234567890',
        genre: 'Fiction'
      };
      const response = await request(app)
        .post('/books')
        .send(newBook);
      expect(response.status).toBe(201);
      expect(response.body.book).toBeDefined();
      expect(response.body.book.title).toBe(newBook.title);
      expect(response.body.book.author).toBe(newBook.author);
      expect(response.body.book.isbn).toBe(newBook.isbn);
      expect(response.body.book.genre).toBe(newBook.genre);
    }; 