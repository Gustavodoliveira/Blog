import { useParams } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import axios from '../api';
import { AxiosError, AxiosResponse } from 'axios';
import { errs } from '@/interfaces/errs';
import { toast } from 'react-toastify';
import Post from '@/components/Post';
import { IPost } from '@/interfaces/post';

const GetPost = () => {
	const [post, setPost] = useState<IPost>({
		Image: [],
		Title: '',
		Author: '',
		Content: '',
		Categoric: '',
		IdAuthor: '',
	});
	const router = useParams();

	useEffect(() => {
		const { token } = parseCookies();

		axios
			.get(`/post/${router.post}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => setPost(res.data?.Post))
			.catch((err: AxiosError<errs>) =>
				toast.error(err.response?.data.message),
			);
	}, []);

	return (
		<Post
			Title={post.Title}
			Author={post.Author}
			Content={post.Content}
			categoric={post.Categoric}
		/>
	);
};

export default GetPost;
