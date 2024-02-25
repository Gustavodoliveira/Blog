/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as React from 'react';
import style from '@/styles/pages/AppHome.module.sass';
import Modal from '@/components/Modal';
import TertiaryStyle from '@/styles/components/modal.module.sass';

import { FaWindowClose } from 'react-icons/fa';
import Input from '@/components/Input';
import axios from '../../api';
import { AiFillFileImage } from 'react-icons/ai';
import { AxiosError, AxiosResponse } from 'axios';
import { Id, toast } from 'react-toastify';
import PostCard from '@/components/Post-Card';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import Form from '@/components/Form';
import Button from '@/components/Button';

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
					<Button
						Click={() => this.setState({ newPost: true })}
						Content="New Post"
						Class={`${style.btn_newPost}`}
					/>
				</div>
				{this.state.newPost && (
					<Modal
						headerChildren={
							<>
								<FaWindowClose
									className={TertiaryStyle.modal_icon}
									onClick={() => this.setState({ newPost: false })}
								/>
								<h3>Create new post</h3>
							</>
						}
					>
						<Form>
							<label htmlFor="image">
								<AiFillFileImage /> <span>Chose a files</span>
								<Input
									type="file"
									name="image"
									id="image"
									multiple={false}
									Change={(e) => {
										if (!e.target.files) return;
										this.setState({ ...this.state, image: e.target.files[0] });
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
							<Button Content="New Post" Click={Submit} />
						</Form>
					</Modal>
				)}
				<section className={style.post_section}>
					<div>
						{this.state.Posts.length > 0 ? (
							this.state.Posts.map((item): React.ReactNode => {
								return (
									<Link
										href={`
									/${item._id}	
									`}
										key={item._id}
									>
										<PostCard
											Title={item?.Title}
											Author={item?.Author}
											Content={item?.Content}
											image={item.image}
										/>
									</Link>
								);
							})
						) : (
							<h2>No post</h2>
						)}
					</div>
				</section>
			</main>
		);
	}
}
