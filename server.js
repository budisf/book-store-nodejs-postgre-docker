// @ts-check

const { Client } = require("pg");
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const config = require(path.resolve('app/config/database.js'));
const client = config.data;
const app = express();
const port = 8080;

dotenv.config({ path: './.env' });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route
require('./app/routers/routers')(app);

// enable files upload
app.use(fileUpload({
  createParentPath: true,
}));


(async () => {
  await client.connect();

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
  reject("oops");
});

myPromise.then(() => {
  console.log("hello");
});
