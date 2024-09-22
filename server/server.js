const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5003;

app.use(cors());
app.use(express.json());

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'fiction', price: 24, image: '/book-covers/great-gatsby.jpg', bestSeller: true },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'fiction', price: 49, image: '/book-covers/to-kill-a-mockingbird.jpg', bestSeller: true },
    { id: 3, title: '1984', author: 'George Orwell', genre: 'fiction', price: 75, image: '/book-covers/1984.jpg' },
    { id: 4, title: 'Moby-Dick', author: 'Herman Melville', genre: 'fiction', price: 74, image: '/book-covers/moby-dick.jpg' },
    { id: 5, title: 'War and Peace', author: 'Leo Tolstoy', genre: 'historical fiction', price: 88, image: '/book-covers/war-and-peace.jpg', bestSeller: true },
    { id: 6, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'romance', price: 17, image: '/book-covers/pride-and-prejudice.jpg' },
    { id: 7, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'fiction', price: 78, image: '/book-covers/the-catcher-in-the-rye.jpg' },
    { id: 8, title: 'Brave New World', author: 'Aldous Huxley', genre: 'science fiction', price: 39, image: '/book-covers/brave-new-world.jpg', bestSeller: true },
    { id: 9, title: 'Dune', author: 'Frank Herbert', genre: 'science fiction', price: 45, image: '/book-covers/dune.jpg' },
    { id: 10, title: 'Foundation', author: 'Isaac Asimov', genre: 'science fiction', price: 50, image: '/book-covers/foundation.jpg' },
    { id: 11, title: 'The Biography of Steve Jobs', author: 'Walter Isaacson', genre: 'biography', price: 30, image: '/book-covers/steve-jobs.jpg' },
    { id: 12, title: 'Becoming', author: 'Michelle Obama', genre: 'biography', price: 32, image: '/book-covers/becoming.jpg', bestSeller: true },
    { id: 13, title: 'Sherlock Holmes', author: 'Arthur Conan Doyle', genre: 'mystery', price: 25, image: '/book-covers/sherlock-holmes.jpg' },
    { id: 14, title: 'Gone Girl', author: 'Gillian Flynn', genre: 'mystery', price: 27, image: '/book-covers/gone-girl.jpg' },
    { id: 15, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'fantasy', price: 35, image: '/book-covers/the-hobbit.jpg', bestSeller: true },
    { id: 16, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'fantasy', price: 28, image: '/book-covers/harry-potter.jpg', bestSeller: true },
    { id: 17, title: 'Dracula', author: 'Bram Stoker', genre: 'horror', price: 20, image: '/book-covers/dracula.jpg' },
    { id: 18, title: 'It', author: 'Stephen King', genre: 'horror', price: 40, image: '/book-covers/it.jpg' },
    { id: 19, title: 'Educated', author: 'Tara Westover', genre: 'non-fiction', price: 29, image: '/book-covers/educated.jpg' },
    { id: 20, title: 'The Wright Brothers', author: 'David McCullough', genre: 'non-fiction', price: 25, image: '/book-covers/wright-brothers.jpg' },
    { id: 21, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'non-fiction', price: 30, image: '/book-covers/sapiens.jpg' }
];

let cart = [];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/genre/:genre', (req, res) => {
    const genre = req.params.genre.toLowerCase();
    const filteredBooks = books.filter(book => book.genre.toLowerCase() === genre);
    res.json(filteredBooks);
});

app.get('/api/books/best-sellers', (req, res) => {
    const bestSellers = books.filter(book => book.bestSeller);
    res.json(bestSellers);
});

app.get('/api/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    res.json(filteredBooks);
});

app.get('/api/cart', (req, res) => {
    res.json(cart);
});

app.post('/api/cart', (req, res) => {
    const book = req.body;
    const itemExists = cart.find(item => item.id === book.id);
    if (itemExists) {
        cart = cart.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    res.json(cart);
});

app.delete('/api/cart/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    cart = cart.filter(item => item.id !== id);
    res.json(cart);
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
