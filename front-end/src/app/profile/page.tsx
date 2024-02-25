'use client';
import { AxiosError, AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import * as React from 'react';
import axios from '../../api';
import store from '@/store/store';
import { toast } from 'react-toastify';
import { errs } from '@/interfaces/errs';
import Modal from '@/components/Modal';
import style from '@/styles/pages/Profile.module.sass';
import {
	AiFillDelete,
	AiFillEdit,
	AiFillFileImage,
	AiOutlineUserDelete,
} from 'react-icons/ai';
import { FaWindowClose } from 'react-icons/fa';
import TertiaryStyle from '@/styles/components/modal.module.sass';
import PostCard from '@/components/Post-Card';
import { Iuser } from '@/hook/Register';
import { logout } from '@/store/AuthUser/Auth';
import Link from 'next/link';
import UpdateUser from '@/hook/UpdateUser';
import Button from '../../components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import api from '../../api';

export interface IAppProps {}

export interface IAppState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	myPosts: Array<any>;
	user: Iuser;
	isVisible: boolean;
	image: unknown | undefined;
	newTitle: string | undefined;
	newContent: string | undefined;
	EditPost: {
		visible: boolean;
		Content?: string;
		Title?: string;
		id?: string;
		image?: string;
	};
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
			newContent: '',
			image: '',
			newTitle: '',
			EditPost: {
				visible: false,
				Content: '',
				Title: '',
				image: '',
			},
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

	get post() {
		const post = {
			image: this.state.image,
			newTitle: this.state.newTitle,
			newContent: this.state.newContent,
		};

		return post;
	}

	async editPost() {
		const { token } = parseCookies();
		const post = this.post;
		const { id } = this.state.EditPost;
		if (!id) return;

		api
			.patch(`/post/edit/${id}`, post, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((resp: AxiosResponse) => console.log(resp))
			.catch((err: AxiosError<errs>) => console.log(err));
	}

	public render() {
		const submit = () => {
			this.editPost();
		};

		return (
			<main className={style.Container}>
				{/* modal post edit */}
				{this.state.EditPost.visible && (
					<Modal
						headerChildren={
							<>
								<FaWindowClose
									className={TertiaryStyle.modal_icon}
									onClick={() =>
										this.setState({ EditPost: { visible: false } })
									}
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
										this.setState({
											...this.state,
											image: e.target.files[0],
										});
									}}
								/>
							</label>
							<Input
								name="Title"
								type="text"
								placeHolder={this.state.EditPost.Title}
								Change={(e) =>
									this.setState({
										...this.state,
										newTitle: e.target.value,
									})
								}
							/>
							<textarea
								name="Content"
								placeholder={this.state.EditPost.Content}
								onChange={(e) =>
									this.setState({
										...this.state,
										newContent: e.target.value,
									})
								}
								cols={30}
								rows={10}
							></textarea>
							<Button Content="Edit Post" Click={submit} />
						</Form>
					</Modal>
				)}
				<section className={style.header_page}>
					<h1>profile</h1>
					<Button
						Content="Edit account"
						Click={() => this.setState({ isVisible: true })}
					/>

					{/* modal User edit */}
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
						{this.state.myPosts.length > 0 ? (
							this.state.myPosts.map((post): React.ReactNode => {
								return (
									<div key={post._id}>
										<AiFillEdit
											className={style.icon_post_edit}
											onClick={() => {
												this.setState({
													EditPost: {
														visible: true,
														Content: post.Content,
														Title: post.Title,
														id: post._id,
														image: post.image,
													},
												});
											}}
										/>
										<AiFillDelete className={style.icon_post_delete} />
										<Link href={`/${post._id}`}>
											<PostCard
												Author={post?.Author}
												Content={post.Content}
												Title={post.Title}
												image={post?.image}
											/>
										</Link>
									</div>
								);
							})
						) : (
							<>
								<h2>you not post anything</h2>
								<Link href={'/home'}>
									<Button Content="Create a Post" />
								</Link>
							</>
						)}
					</div>
				</section>
			</main>
		);
	}
}
