import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { user}  from '../models/user';
import mongoose from 'mongoose';


interface JwtPayload {
  user: string,
}


const getUserByToken = async (token: string ): Promise<mongoose.Types.ObjectId | undefined | unknown> => {

	const decoded = jwt.verify(token, `${process.env.SecretJwt}` ) as JwtPayload;
	const id  = decoded.user;
	try {
		const User = await user.findById(id).select('-password  -createdAt -updatedAt');
		if(!User) return ;
		return User._id;
	} catch (error) {
		return  error;
	}
};

export default getUserByToken;