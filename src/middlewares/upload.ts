import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() +
      Math.floor(Math.random() * 10000 + 10000);
    const name = String(req.body.name).toLowerCase();
    cb(
      null,
      file.filename +
        name.replace(" ", "") +
        '-' +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  // fileFilter: (req, file, cb) => {
  //   if(file.mimetype !== 'image/png' || file.mimetype !== 'image/jpg')
  //     return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));

  //   return cb(null, true);
  // },
  storage: storage,
});
