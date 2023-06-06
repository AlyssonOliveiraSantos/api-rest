import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { autorization } = req.headers;
  if (!autorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [texto, token] = autorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: ['Usuario invalido'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    res.status(401).json({
      errors: ['Token expirado ou invalido'],
    });
  }
};
