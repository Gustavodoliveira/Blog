'use client';

import * as React from 'react';

import sty from '../styles/components/header.module.sass';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import axios from '../api';
import { AxiosError, AxiosResponse } from 'axios';
import { errs } from '@/interfaces/errs';
import store from '@/store/store';
import { parseCookies } from 'nookies';
import { Avatar } from './Avatar';

export interface IAppProps {}

export interface IAppState {
	user: object | boolean;
	avatar: string;
}

export default class Header extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {
			user: false,
			avatar: '',
		};
	}
	async getUser(id: string, token: string) {
		await axios
			.get(`user/show/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				this.setState({ user: res.data.User });
				this.setState({ avatar: res.data.User.Avatar });
				console.log(res);
			})
			.catch((err: AxiosError<errs>) => console.log(err));
	}

	componentDidMount(): Promise<void> | void {
		const id = store.getState().setId;
		const { token } = parseCookies();
		if (id === '') return;

		return this.getUser(id, token);
	}

	public render() {
		return (
			<header className={sty.Header_Container}>
				<Link href="/">
					<h1 className={sty.text}>Blog</h1>
				</Link>
				<nav>
					{this.state.user && (
						<Avatar
							url={`${process.env.NEXT_PUBLIC_API}public/${this.state.avatar}`}
							height={50}
							width={50}
						/>
					)}
					<AiOutlineMenu className={sty.icon} />
					<ul>
						<li>
							<Link href="/login">Login</Link>
						</li>
						<li>
							<Link href="/">About</Link>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
