
import UserModel from '../models/user';
import { Request, Response } from 'express';
import * as validator from 'email-validator';
import bcrypt from 'bcrypt';
import { MongooseError } from 'mongoose';

class userController {
	static async postUser(req:Request, res: Response) {
    
		const { name, email, password, ConfirmPassword } = req.body;
    
		if(!name) return res.status(401).json({ message: 'The name is required'});

		if(!email) return res.status(401).json({ message: 'The email is required'});

		if(!validator.validate(email)) return res.status(401).json({ message: 'The email is not valid'});

		const userExists = await UserModel.find({email});

		if(userExists) return res.status(401).json({ message: 'The email already exists'});

		if(!password) return res.status(401).json({ message: 'The password is required'});

		if(!ConfirmPassword) return res.status(401).json({ message: 'The ConfirmPassword is required'});

		if(password != ConfirmPassword) return res.status(401).json({ message: 'The password is different the confirm password'});

		const salt = await bcrypt.genSalt(12);

		const passwordHash = await bcrypt.hash(password, salt);


		try {
			const user = await UserModel.create({
				name,
				email,
				passwordHash
			});

			return res.status(200).json({ message: user});
		} catch (error) {
			throw new MongooseError('Error in server' + error);
		}

	}
  
}


export default userController;