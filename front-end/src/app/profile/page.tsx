'use client';
import { AxiosError, AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import * as React from 'react';
import axios from '../../api';
import store from '@/store/store';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {};
	}

	MyPost() {
		const { token } = parseCookies();
		const id = store.getState().setId;

		axios
			.get(`post/myposts/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				console.log(res);
			})
			.catch((err: AxiosError) => {
				console.log(err);
			});
	}

	componentDidMount(): void {
		this.MyPost();
	}
	public render() {
		return (
			<main>
				<div>
					<h1>profile</h1>
					<button>Edit Account</button>
				</div>
				<section></section>
			</main>
		);
	}
}
