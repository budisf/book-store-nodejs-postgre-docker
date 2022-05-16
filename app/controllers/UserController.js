import moment from 'moment';
const path = require('path');
const db = require(path.resolve('app/config/database.js'));
const Helper = require(path.resolve('app/excaption/helpers.js'));

const author = {

  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      authors(email, password, name, pen_name, created_time, updated_time)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      req.body.email,
      hashPassword,
      req.body.name,
      req.body.pen_name,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id, rows[0].name, rows[0].pen_name, rows[0].email);
      return res.status(201).send({ token });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'author with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM authors WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ token });
    } catch(error) {
      return res.status(400).send(error)
    }
  },

}

export default author;