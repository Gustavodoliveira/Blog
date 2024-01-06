import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const ConfigUserUploadImage = {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', 'public', 'user'),
		filename(req, file, callback) {
			const hash =crypto.randomBytes(6).toString('hex');

			const filename = `${hash}-${file.originalname}`;

			callback(null, filename);
		}
	}),
};

export default ConfigUserUploadImage;