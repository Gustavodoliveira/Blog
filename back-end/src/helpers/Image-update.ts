import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const ConfigUploadImage = {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', 'public'),
		filename(req, file, callback) {
			const hash =crypto.randomBytes(6).toString('hex');

			const filename = `${hash}-${file.originalname}`;

			callback(null, filename);
		}

  
	}),
  
};

