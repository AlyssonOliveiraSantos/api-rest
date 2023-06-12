import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig).single('foto');

class PhotoController {
  async store(req, res) {
    return upload(req, res, (err) => {
      if (err) {
        res.status(401).json({
          errors: [err],
        });
        res.json(req.file);
      }
    });
  }
}

export default new PhotoController();
