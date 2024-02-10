/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as React from 'react';
import style from '@/styles/pages/AppHome.module.sass';
import Modal from '@/components/Modal';

import { FaWindowClose } from 'react-icons/fa';
import Input from '@/components/Input';
import axios from '../../api';
import { parseCookies } from 'nookies';
import { AiFillFileImage } from 'react-icons/ai';
import { AxiosError, AxiosResponse } from 'axios';
import { Id, toast } from 'react-toastify';
import PostCard from '@/components/Post-Card';
import Link from 'next/link';

export interface IAppProps {}

export interface IAppState {
	newPost?: boolean;
	image?: unknown;
	Title: string;
	Content: string;
	categoric: string;
	Posts: Array<any>;
}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {
			image: '',
			Title: '',
			Content: '',
			categoric: '',
			Posts: [],
		};
	}

	async getAllPost() {
		const { token } = parseCookies();
		await axios
			.get('post/allpost', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				this.setState({ ...this.state, Posts: res.data.Posts });
			})
			.catch((err: AxiosError) => console.log(err));
	}

	componentDidMount(): Promise<void> | void {
		return this.getAllPost();
	}

	get post() {
		return {
			image: this.state.image,
			Title: this.state.Title,
			Content: this.state.Content,
			categoric: this.state.categoric,
		};
	}

	async ApiPosted(): Promise<void | string | Id> {
		const post = this.post;
		const { token } = parseCookies();

		await axios
			.post('post/posted', post, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res: AxiosResponse) => {
				toast.success(res.data.message);
				Promise.resolve();
			})
			.catch((e: AxiosError) => console.log(e));
	}

	public render() {
		const Submit = () => {
			const resp = this.ApiPosted();
			console.log(resp);
		};
		return (
			<main className={style.Container}>
				<div className={style.Container_header}>
					<h1>Posts</h1>
					<button
						className={style.btn_newPost}
						onClick={() => this.setState({ newPost: true })}
					>
						New Post
					</button>
				</div>
				{this.state.newPost && (
					<Modal>
						<header className={style.modal_header}>
							<FaWindowClose
								className={style.modal_icon}
								onClick={() => this.setState({ newPost: false })}
							/>
							<h3>Create new post</h3>
						</header>
						<form
							method="post"
							className={style.form_container}
							onSubmit={(e) => e.preventDefault()}
						>
							<label htmlFor="image">
								<AiFillFileImage /> <span>Chose a files</span>
								<Input
									type="file"
									name="image"
									id="image"
									multiple={true}
									Change={(e) => {
										if (!e.target.files) return;
										this.setState({ ...this.state, image: e.target.files });
									}}
								/>
							</label>
							<Input
								name="Title"
								type="text"
								placeHolder="Title"
								Change={(e) =>
									this.setState({
										...this.state,
										Title: e.target.value,
									})
								}
							/>
							<textarea
								name="Content"
								placeholder="Content"
								onChange={(e) =>
									this.setState({
										...this.state,
										Content: e.target.value,
									})
								}
								cols={30}
								rows={10}
							></textarea>
							<label htmlFor="categoric">
								Categoric:
								<select
									name="categoric"
									id="categoric"
									onChange={(e) =>
										this.setState({ ...this.state, categoric: e.target.value })
									}
								>
									<option value="Forrest">Forrest</option>
									<option value="Desert">Desert</option>
									<option value="Ocean">Ocean</option>
								</select>{' '}
							</label>

							<button type="submit" onClick={Submit}>
								newPost
							</button>
						</form>
					</Modal>
				)}
				<section className={style.post_section}>
					<div>
						{this.state.Posts.map((item): React.ReactNode => {
							return (
								<Link
									href={`
								/${item._id}	
								`}
									key={1}
								>
									<PostCard
										Title={item?.Title}
										Author={item?.Author}
										Categoric={item?.categoric}
										Content={item?.Content}
										key={1}
										image={item.image.map((item: { filename: any }) => {
											return item.filename;
										})}
									/>
								</Link>
							);
						})}
					</div>
				</section>
			</main>
		);
	}
}
