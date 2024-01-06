import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { user}  from '../models/user';


interface JwtPayload {
  user: string,
}


const getUserByToken = async (token: string ) => {

	const decoded = jwt.verify(token, `${process.env.SecretJwt}` ) as JwtPayload;
	const id  = decoded.user;
	console.log(id);
  


	try {
		const User = await user.findById(id).select('-password  -createdAt -updatedAt');
		if(!User) return;
		return User;
	} catch (error) {
		return 'user not exist';
	}
};

export default getUserByToken;