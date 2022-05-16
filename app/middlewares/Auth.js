import jwt from 'jsonwebtoken';
const path = require('path');
const db = require(path.resolve('app/config/database.js'));

const Auth = {

  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM authors WHERE id = $1';
      const { rows } = await db.query(text, [decoded.authorId]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.author = { 
        id: decoded.authorId, 
        name: decoded.name,
        pen_name: decoded.pen_name,
        email: decoded.email
       };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;