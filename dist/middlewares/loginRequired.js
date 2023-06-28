"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { autorization } = req.headers;
  if (!autorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [texto, token] = autorization.split(' ');

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await _User2.default.findOne({
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
