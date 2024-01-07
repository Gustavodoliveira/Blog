
import { Request, Response } from 'express';
import getToken from '../helpers/Get-token';
import getUserByToken from '../helpers/Get-user-by-token';
import { post } from '../models/post';
import { user } from '../models/user';
import { MongooseError } from 'mongoose';

export class PostController {
	static async postedPost (req: Request, res: Response) {
		const { Title, Content, categoric } = req.body;

		if(!Title) return res.status(401).json({ message: 'The title is required'});

		if(!Content) return res.status(401).json({ message: 'The content is required'});

		if(!categoric) return res.status(401).json({ message: 'The categoric is required'});

		const token = getToken(req);

		if(!token) return res.status(400).json({ message: 'You are not logged'});

		const id =  await getUserByToken(token);

		const User = await user.findById(id);

		if(!User) return res.status(400).json({message :'User not found'});

    

		if(!user) return;

		let image;
    
		if (req.files) {
			image = req.files;
		}

		try {
			const Post = await post.create({
				image,
				Title,
				Content,
				categoric,
				Author: User.name,
				IdAuthor: User._id
			});

			return res.status(200).json({ message: 'Post posted success',
				Post: Post
			});
		} catch (error) {
			throw new MongooseError('Error in server' + ' ' + error);
		}
	}
}