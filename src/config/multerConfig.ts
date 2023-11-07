
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/'); // Menyimpan file di folder 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `photo_${Date.now()}.${file.originalname.split('.').pop()}`);
  },
});

const upload = multer({ storage });

export default upload;
