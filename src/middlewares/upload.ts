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
      name.replace(" ", "") +
        '-' +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage: storage,
});
