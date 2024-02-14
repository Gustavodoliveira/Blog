
import { Request, Response } from 'express';
import getToken from '../helpers/Get-token';
import getUserByToken from '../helpers/Get-user-by-token';
import { post } from '../models/post';
import { user } from '../models/user';
import { MongooseError } from 'mongoose';

export class PostController {

	static async getPost (req: Request, res:Response) {
		const { id } = req.params;


		const Post = await post.findById(id);

		if(!Post) return res.status(401).json({message: 'Post not exist'});

		return res.status(200).json({ Post });
	}

	static async postedPost (req: Request, res: Response) {
		const { Title, Content, categoric} = req.body;


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
		let count;
    

		if (req.files) {
			image = req.files;
			count = image.length;
		}

		if(count as number > 3) return res.status(401).json({ message: 'You can only send 3 images'});
    

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

	static async getPostCategoric (req: Request, res:Response) {
		const {categoric} = req.params;
    
		try {
			const posts = await post.find({ categoric: categoric});
			res.status(200).json({posts});
		} catch (error) {
			throw new MongooseError('Internal server error' + '' + error);
		}

	}

	static async getMyPost(req:Request, res:Response) {
		const token = getToken(req);

		if(!token) return res.status(400).json({ message: 'You are not logged'});

		const id =  await getUserByToken(token);

		

		const User = await user.findById(id);

		if(!User) return res.status(400).json({message :'User not found'});

		try {
			const myPosts = await post.find({ IdAuthor: User._id});

			if(!myPosts) return res.status(204).json({ message: 'You haven`t posted yet'});

			return res.status(200).json({myPosts});
		} catch (error) {
			throw new MongooseError('Internal server error' + '' + error);
      
		}
	}

	static async getAllPost (req:Request, res: Response) {
		const Posts = await post.find();

		return res.status(200).json({Posts});
	}

	static async PostUpdate (req: Request, res:Response) {
		const { postId } = req.params;
		const Post = await post.findById(postId);

		if(!Post) return res.status(204).json({ message: 'Post not found'});

		const { newTitle, newContent, newCategoric } = req.body;

		if(newTitle || newContent || newCategoric) {
			Post.Title = newTitle;
			Post.Content = newContent;
			Post.categoric = newCategoric;
		}

		let image;
		let count;
    

		if (req.files) {
			image = req.files;
			count = image.length;
			Post.image = image as unknown as string[];
		}

		if(count as number > 3) return res.status(401).json({ message: 'You can only send 3 images'});

		

		try {
			const EditPost = await post.findByIdAndUpdate(
				{_id: Post._id},
				{$set: Post},
				{new:true}
			);

			return res.status(200).json({ message: 'Post edit success',
				EditPost});
		} catch (error) {
			throw new MongooseError('Error in server' + ' ' + error);
		}

	}

	static async DeletePost (req: Request, res: Response) {
		const { id } = req.params;

	

		try {
			const Post = await post.findById(id);

			if(!Post) return res.status(204).json({ message: 'Post not found'});

			await post.deleteOne({ _id: Post._id});

			return res.status(200).json({message: 'Delete post success'});
		} catch (error) {
			throw new MongooseError('Error in server' + ' ' + error);
      
		}

    


	}
}