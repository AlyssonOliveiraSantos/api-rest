import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig).single('photo');

import Photo from '../models/Photo';

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
        const photo = await Photo.create({ originalname, filename, aluno_id });

        return res.json(photo);
      } catch (e) {
        res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new PhotoController();
