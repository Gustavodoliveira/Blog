'use client';
import * as React from 'react';
import style from '@/styles/pages/AppHome.module.sass';
import Modal from '@/components/Modal';

import { BsFillPostcardFill } from 'react-icons/bs';
import Input from '@/components/Input';
import axios from '../../api';
import { parseCookies } from 'nookies';
import { AiFillFileImage } from 'react-icons/ai';
import { AxiosError, AxiosResponse } from 'axios';

export interface IAppProps {}

export interface IAppState {
	newPost?: boolean;
	Image?: unknown;
	Title: string;
	Content: string;
	categoric: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {
			Image: '',
			Title: '',
			Content: '',
			categoric: '',
		};
	}

	get post() {
		return {
			image: this.state.Image,
			Title: this.state.Title,
			Content: this.state.Content,
			categoric: this.state.categoric,
		};
	}

	async ApiPosted() {
		const post = this.post;
		const { token } = parseCookies();
		console.log(token);
		console.log(post);

		//await axios
		//	.post('post/posted', post, {
		//		headers: {
		//			Authorization: `Bearer ${token}`,
		//			'Content-Type': 'multipart/form-data',
		//		},
		//	})
		//	.then((res: AxiosResponse) => console.log(res))
		//	.catch((e: AxiosError) => console.log(e));
	}

	public render() {
		const Submit = () => {
			const resp = this.ApiPosted();
			console.log(resp);
		};
		return (
			<main className={style.Container}>
				<h1>Home app</h1>

				<button
					className={style.btn_newPost}
					onClick={() => this.setState({ newPost: true })}
				>
					New Post
				</button>
				{this.state.newPost && (
					<Modal>
						<header className={style.modal_header}>
							<BsFillPostcardFill
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
										this.setState({ ...this.state, Image: e.target.files });
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
								cols="30"
								rows="10"
							></textarea>

							<select
								name="categoric"
								id=""
								onChange={(e) =>
									this.setState({ ...this.state, categoric: e.target.value })
								}
							>
								<option value="Forrest">Forrest</option>
								<option value="Desert">Desert</option>
								<option value="Ocean">Ocean</option>
							</select>
							<button onClick={Submit}>newPost</button>
						</form>
					</Modal>
				)}
			</main>
		);
	}
}
