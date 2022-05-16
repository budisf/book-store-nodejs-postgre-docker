import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
 
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id, name, pen_name, email) {
    const token = jwt.sign({
      authorId: id,
      name: name,
      pen_name: pen_name,
      email:email
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }
}

export default Helper;