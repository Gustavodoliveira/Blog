
import { Request, Response } from 'express';
import getToken from '../helpers/Get-token';
import getUserByToken from '../helpers/Get-user-by-token';

export class PostController {
	static async postedPost (req: Request, res: Response) {
		const { Title, Content, categoric } = req.body;

		if(!Title) return res.status(401).json({ message: 'The title is required'});

		if(!Content) return res.status(401).json({ message: 'The content is required'});

		if(!categoric) return res.status(401).json({ message: 'The categoric is required'});

		const token = getToken(req);

		if(!token) return res.status(400).json({ message: 'You are not logged'});

		const user = await getUserByToken(token);

		console.log(user);
    
		//let image = '';
	}
}