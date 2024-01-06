import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

import jwt, { JwtPayload} from 'jsonwebtoken';

// TODO: cookie
//import { CookieOptions } from '../helpers/CookieConfig';




interface CustomRequest extends Request {
  user: string | JwtPayload;
 }



const checkToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authheader = req.headers.authorization;

	if (!authheader)
		return res.status(401).json({ message: 'you are not authenticated' });

	const token = authheader && authheader.split(' ')[1];

	if (!token) return res.status(401).json({ message: 'access denied' });

	try {
    
		const verify = jwt.verify(token, `${process.env.SecretJwt}`);
		( req as CustomRequest).user = verify;
		next();
	} catch (error) {
		return res.status(400).json({ message: 'Token invalid' });
	}
};
export default checkToken;