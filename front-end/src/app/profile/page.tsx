'use client';
import { AxiosError, AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import * as React from 'react';
import axios from '../../api';
import store from '@/store/store';
import { toast } from 'react-toastify';
import { errs } from '@/interfaces/errs';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import style from '@/styles/pages/Profile.module.sass';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { FaWindowClose } from 'react-icons/fa';
import TertiaryStyle from '@/styles/components/modal.module.sass';
import PostCard from '@/components/Post-Card';
import { Iuser } from '@/hook/Register';
import { logout } from '@/store/AuthUser/Auth';
import Link from 'next/link';
import UpdateUser from '@/hook/UpdateUser';

export interface IAppProps {}

export interface IAppState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	myPosts: Array<any>;
	user: Iuser;
	isVisible: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {
			user: {
				image: new File([new Blob()], 'hero'),
				name: '',
				email: '',
				ConfirmPassword: '',
				password: '',
			},
			myPosts: [],
			isVisible: false,
		};
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
				this.setState({ ...this.state, myPosts: res.data?.myPosts });
			})
			.catch((err: AxiosError<errs>) => {
				toast.error(err.response?.data?.message);
			});
	}

	async deleteUser() {
		const { token } = parseCookies();
		const id = store.getState().setId;

		await axios
			.delete(`user/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp: AxiosResponse) => {
				store.dispatch(logout(false));
				toast.success(resp.data.message);
			})
			.catch((err: AxiosError<errs>) => {
				toast.error(err.response?.data.message);
			});
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
			})
			.catch((err: AxiosError<errs>) => {
				toast.error(err.response?.data.message);
			});
	}

	componentDidMount(): void {
		const id = store.getState().setId;
		const { token } = parseCookies();
		if (id === '') return;

		this.getUser(id, token);
		this.MyPost();
	}
	public render() {
		return (
			<main>
				<section className={style.header_page}>
					<h1>profile</h1>
					<Button
						Content="Edit account"
						Click={() => this.setState({ isVisible: true })}
					/>

					{this.state.isVisible && (
						<Modal
							headerChildren={
								<>
									<div>
										<FaWindowClose
											onClick={() => this.setState({ isVisible: false })}
											className={TertiaryStyle.modal_icon}
										/>
										<Link href={'/'}>
											<AiOutlineUserDelete
												className={style.delete}
												onClick={this.deleteUser}
											/>
										</Link>
									</div>
									<h2>Edit Account</h2>
								</>
							}
						>
							<UpdateUser
								email={this.state.user.email}
								image={this.state.user.image}
								name={this.state.user.name}
								password={''}
								ConfirmPassword={''}
							/>
						</Modal>
					)}
				</section>
				<section className={style.myPost_Section}>
					<h3>My posts</h3>
					<div>
						{this.state.myPosts.map((post): React.ReactNode => {
							return (
								<Link href={`/${post._id}`} key={post._id}>
									<PostCard
										Author={post?.Author}
										Categoric={post.categoric}
										Content={post.Content}
										Title={post.Title}
										image={post.image.map((item: { filename: unknown }) => {
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
