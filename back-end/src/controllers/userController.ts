
import { user }from '../models/user';
import { Request, Response } from 'express';
import * as validator from 'email-validator';
import bcrypt from 'bcrypt';
import { MongooseError } from 'mongoose';
import createUserToken from '../middleware/Create-Token';



class userController {

	static async ShowUser (req: Request, res: Response) {
		const {id } = req.params;

		const User = await  user.findById(id);

		res.send(User);
	}

	static async postUser(req:Request, res: Response) {
    
		const { name, email, password, ConfirmPassword } = req.body;
    
		if(!name) return res.status(401).json({ message: 'The name is required'});

		if(!email) return res.status(401).json({ message: 'The email is required'});

		if(!validator.validate(email)) return res.status(401).json({ message: 'The email is not valid'});

		const userExists = await user.findOne({email});
    

		if(userExists) return res.status(401).json({ message: 'The email already exists'});

		if(!password) return res.status(401).json({ message: 'The password is required'});

		if(!ConfirmPassword) return res.status(401).json({ message: 'The ConfirmPassword is required'});

		if(password != ConfirmPassword) return res.status(401).json({ message: 'The password is different the confirm password'});

		const salt = await bcrypt.genSalt(12);

		const passwordHash = await bcrypt.hash(password, salt);


		try {
			const userCreate = await user.create({
				name,
				email,
				password: passwordHash,
			});

			createUserToken(userCreate.id, req, res, 'Register Successfully');
		} catch (error) {
			throw new MongooseError('Error in server' + '' + error);
		}

	}

	static async login(req: Request, res: Response) {
		const { email, password } = req.body;

		if(!email) return res.status(401).json({ message: 'The email is required'});

		const userExists = await user.findOne({email});

		if(!userExists) return res.status(401).json({ message: 'The user not exist'});

		if(!password) return res.status(401).json({ message: 'The password is required'});

		const Check_Password = await bcrypt.compare(password, userExists.password);
	
		if(!Check_Password) return res.status(401).json({message: 'Your password is invalid'});

		await createUserToken(userExists.id, req, res, 'Login Success');
    
    
	}

	static async Update (req: Request, res: Response) {
		const { id } = req.params;

		const User = await  user.findById(id);

		if(!User ) return res.status(400).json({ message: 'User not exist'});

		const { name, email, password, ConfirmPassword } = req.body;

		if(email && !validator.validate(email)) return res.status(401).json({ message: 'The email is not valid'});

		const userExists = await user.findOne({email});
    
		if(userExists) return res.status(401).json({ message: 'The email already register'});

		if(password && password != ConfirmPassword) return res.status(401).json({ message: 'The password is different the confirm password'});

		if(password == ConfirmPassword && password != null) {
			const salt = await bcrypt.genSalt(12);

			const passwordHash = await bcrypt.hash(password, salt);

			User.password = passwordHash;
		}



		try {
      
			User.name = name;
			User.email = email;

			await user.findOneAndUpdate(
				{ _id: User._id },
				{ $set: User },
				{ new: true },
			);

			res.status(200).json({message: 'Update user success'});
		} catch (error) {
			throw new MongooseError('Error in server' + '' + error);
		}

	}



}
  



export default userController;