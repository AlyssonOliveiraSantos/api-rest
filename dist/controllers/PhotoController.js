"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
const upload = _multer2.default.call(void 0, _multer4.default).single('photo');

var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        res.status(401).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const photo = await _Photo2.default.create({ originalname, filename, aluno_id });

        return res.json(photo);
      } catch (e) {
        res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

exports. default = new PhotoController();
