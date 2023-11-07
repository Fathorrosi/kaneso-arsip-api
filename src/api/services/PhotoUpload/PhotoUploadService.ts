import fs from 'fs';
import { Service } from 'typedi';

@Service()
export class PhotoUploadService {
  async uploadPhoto(file: Express.Multer.File): Promise<string> {
    try {
      // Menyimpan foto ke sistem file
      const fileName = `photo_${Date.now()}.${file.originalname.split('.').pop()}`;
      const filePath = `uploads/${fileName}`;
      fs.writeFileSync(filePath, file.buffer);

      // Mengembalikan URL atau path ke foto yang diunggah
      return filePath; // Anda bisa mengembalikan URL jika Anda memiliki server file statik
    } catch (error) {
      // Menangani kesalahan jika terjadi
      throw new Error('Gagal mengunggah foto.');
    }
  }
}
