import 'dotenv/config';
import { Request, Response } from 'express';
import  Jwt  from 'jsonwebtoken';

const createUserToken = async (id: string, req: Request, res: Response, message: string) => {

	const token = Jwt.sign({
		user: id
	}, `${process.env.SecretJwt}`);

	res.status(200).json({
		message: message,
		token,
		user: id
	});
};

export default createUserToken;