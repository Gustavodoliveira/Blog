'use client';
import * as React from 'react';
import style from '@/styles/pages/AppHome.module.sass';
import Modal from '@/components/Modal';

import { BsFillPostcardFill } from 'react-icons/bs';
import Input from '@/components/Input';
import axios from '../../api';
import { parseCookies } from 'nookies';
import { AxiosError, AxiosResponse } from 'axios';

export interface IAppProps {}

export interface IAppState {
	newPost?: boolean;
	Image?: unknown;
	Title?: string;
	Content?: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {
			Image: '',
			Title: '',
			Content: '',
		};
	}

	get post() {
		return {
			image: this.state.Image,
			Title: this.state.Title,
			Content: this.state.Content,
		};
	}

	async ApiPosted() {
		const post = this.post;
		const { token } = parseCookies();
		console.log(token);

		await axios
			.post('post/posted', post, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res: AxiosResponse) => console.log(res))
			.catch((e: AxiosError) => console.log(e));
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
							<Input
								type="file"
								name="image"
								Change={(e) => {
									if (!e.target.files) return;
									this.setState({ ...this.state, Image: e.target.files[0] });
								}}
							/>
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
							<Input
								name="Content"
								type="text"
								placeHolder="Content"
								Change={(e) =>
									this.setState({
										...this.state,
										Content: e.target.value,
									})
								}
							/>
							<button onClick={Submit}>newPost</button>
						</form>
					</Modal>
				)}
			</main>
		);
	}
}
