const path = require('path');
const express = require('express');
const book = require(path.resolve('./app/controllers/BookController'))
const author = require(path.resolve('./app/controllers/AuthorController'))
const user = require(path.resolve('./app/controllers/UserController'))
const sale = require(path.resolve('./app/controllers/SaleController'))
const config = require(path.resolve('app/config/database.js'));
const client = config.data;
const Auth = require(path.resolve('app/middlewares/Auth.js'));



module.exports = app => {

  // book
  app.get('/book/get/:id', book.get);
  app.get('/book/get', book.index);
	app.post('/book/add', Auth.verifyToken, book.store);
  app.put('/book/update/:id', Auth.verifyToken, book.update);
  app.put('/book/update_cover/:id', Auth.verifyToken, book.updateCover);
  app.delete('/book/delete/:id', Auth.verifyToken, book.delete);
  app.get('/book/get_my_book/:author_id', Auth.verifyToken, author.getBookByAuthor);

  //author
  app.put('/author/delete', Auth.verifyToken, author.delete);
  app.get('/author/get_my_profile/:author_id', Auth.verifyToken, author.getProfileByAuthor);
  app.put('/author/update', Auth.verifyToken, author.update);
  app.post('/author/register', user.author.create);
  app.post('/author/login', user.author.login);

  //sale
  app.get('/sales/get_my_sales/:author_id', Auth.verifyToken, sale.getMySales);
  app.post('/sales/get/:id', Auth.verifyToken, sale.getSaleById);
  app.post('/sales/add', Auth.verifyToken, sale.store);

}
