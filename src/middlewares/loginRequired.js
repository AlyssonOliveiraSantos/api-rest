import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { autorization } = req.headers;
  console.log(autorization);
  if (!autorization) {
    res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [texto, token] = autorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    res.status(401).json({
      errors: ['Token expirado ou invalido'],
    });
  }
};
