'use client';

import * as React from 'react';

import sty from '../styles/components/header.module.sass';
import Link from 'next/link';
import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';
import axios from '../api';
import { AxiosError, AxiosResponse } from 'axios';
import { errs } from '@/interfaces/errs';
import store from '@/store/store';
import { Avatar } from './Avatar';
import { logout } from '@/store/AuthUser/Auth';
import { parseCookies } from 'nookies';

export interface IAppProps {}

export interface IAppState {
	user: object | boolean;
	avatar: string;
	active: boolean;
}

export default class Header extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {
			user: false,
			avatar: '',
			active: false,
		};
	}
	async getUser(id: string, token: string | null) {
		await axios
			.get(`user/show/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				this.setState({ user: res.data.User });
				this.setState({ avatar: res.data.User.Avatar });
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
				<h1 className={sty.text}>
					<Link href={store.getState().isLogged ? '/home' : '/'}>Blog</Link>
				</h1>
				<span
					onClick={() =>
						this.state.active
							? this.setState({ ...this.state, active: false })
							: this.setState({ ...this.state, active: true })
					}
				>
					<AiOutlineMenu className={sty.icon} />
				</span>
				<nav>
					<ul className={this.state.active ? sty.active : ''}>
						{this.state.active ? (
							<Link href={'/'}>
								<AiFillCloseCircle
									className={sty.icon_close}
									onClick={() => {
										store.dispatch(logout(false));
										this.setState({ ...this.state, active: false });
									}}
								/>
							</Link>
						) : (
							''
						)}
						{this.state.user ? (
							<>
								{this.state.avatar ? (
									<li>
										<Avatar
											url={`${process.env.NEXT_PUBLIC_API}public/${this.state.avatar}`}
											height={50}
											width={50}
										/>
									</li>
								) : (
									''
								)}

								<li
									onClick={() =>
										this.setState({ ...this.state, active: false })
									}
								>
									<Link href={'/profile'}>Profile</Link>
								</li>
								<li
									onClick={() =>
										this.setState({ ...this.state, active: false })
									}
								></li>
							</>
						) : (
							<>
								<li
									onClick={() =>
										this.setState({ ...this.state, active: false })
									}
								>
									<Link href="/login">Login</Link>
								</li>
								<li
									onClick={() =>
										this.setState({ ...this.state, active: false })
									}
								>
									<Link href="/">About</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
		);
	}
}
