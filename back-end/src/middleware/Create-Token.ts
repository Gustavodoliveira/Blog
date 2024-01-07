import 'dotenv/config';
import { Request, Response } from 'express';
import  Jwt  from 'jsonwebtoken';

const createUserToken = async (id: string, req: Request, res: Response, message: string) => {

	const token = Jwt.sign({
		user: id
	}, `${process.env.SecretJwt}`);

	res.cookie('token', token, {
		signed: true,
		maxAge: 1000 * 60 * 15, // would expire after 15 minutes
		httpOnly: true, 
		sameSite: 'none'
	});
	res.status(200).json({
		message: message,
		token,
		user: id
	});
};

export default createUserToken;