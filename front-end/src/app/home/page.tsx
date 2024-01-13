'use client';
import * as React from 'react';
import style from '@/styles/pages/AppHome.module.sass';
import Modal from '@/components/Modal';

export interface IAppProps {}

export interface IAppState {
	newPost: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {
			newPost: false,
		};
	}

	public render() {
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
					<Modal click={() => this.setState({ newPost: false })}>
						<header>
							<h3>Create new post</h3>
						</header>
					</Modal>
				)}
			</main>
		);
	}
}
