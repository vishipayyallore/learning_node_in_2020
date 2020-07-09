'use strict';

const express = require('express');
const booksController = require('../controllers/books.Controller');

function routes(Book) {

    const bookRouter = express.Router();
    const bookController = booksController(Book);

    // Middleware For Retrieving the Book
    bookRouter.use('/books/:bookId', (request, response, next) => {
        console.log(`Using Middleware for finding Book.`);

        Book.findById(request.params.bookId, (error, book) => {
            if (error) {
                return response.status(500).json(error);
            }

            if (book) {
                console.log(`Book Found: ${book}`);
                request.book = book;
                return next();
            }

            return response.status(404).json();
        });

    });

    bookRouter.route('/books')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.route('/books/:bookId')
        .get(bookController.getBookById);

    return bookRouter;
}

module.exports = routes;