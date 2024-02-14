'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from '@/styles/components/formController.module.sass';
import axios from '../api';
import Input from '@/components/Input';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from 'nookies';
import store from '@/store/store';
import { login, setId } from '@/store/AuthUser/Auth';
import { errs } from '@/interfaces/errs';
import { AiFillFileImage } from 'react-icons/ai';
import { Avatar } from '@/components/Avatar';

interface Iuser {
	image: File;
	name: string;
	email: string;
	password: string;
	ConfirmPassword: string;
}

const Sign = () => {
	const navigate = useRouter();
	const [preview, setPreview] = useState<boolean>(false);
	const [user, setUser] = useState<Iuser>({
		image: new File([], 'nothing'),
		name: '',
		email: '',
		password: '',
		ConfirmPassword: '',
	});

	useEffect(() => {
		const { token } = parseCookies();
		if (token) {
			navigate.push('/home');
		}
	}, []);
	const onSubmit = async () => {
		await axios
			.post('user/create', user, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				const { message, token, user } = res.data;
				setCookie(undefined, 'token', token, {
					signed: true,
					maxAge: 1000 * 60 * 15,
					path: '/',
				});
				store.dispatch(login(true));
				store.dispatch(setId(user));
				toast.success(message);
				navigate.push('/home');
			})
			.catch((e: AxiosError<errs>) => toast.error(e.response?.data.message));
	};

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			method="post"
			className={style.form_controller}
		>
			<div>
				{preview && (
					<Avatar
						url={`${URL.createObjectURL(user.image)}`}
						height={150}
						width={150}
					/>
				)}
				<label htmlFor="image">
					<AiFillFileImage /> <span>Chose a file</span>
					<Input
						name="image"
						type="file"
						id="image"
						Change={(e) => {
							if (!e.target.files) return;
							setUser({ ...user, image: e.target.files[0] });
							setPreview(true);
						}}
					/>
				</label>

				<Input
					name="name"
					type="text"
					placeHolder="Name"
					Change={(e) => setUser({ ...user, name: e.target.value })}
				/>
				<Input
					name="email"
					type="email"
					placeHolder="E-mail"
					Change={(e) => setUser({ ...user, email: e.target.value })}
				/>
				<Input
					name="password"
					type="password"
					placeHolder="Password"
					Change={(e) => setUser({ ...user, password: e.target.value })}
				/>
				<Input
					name="ConfirmPassword"
					type="password"
					placeHolder="Confirm password"
					Change={(e) => setUser({ ...user, ConfirmPassword: e.target.value })}
				/>
				<button type="submit" onClick={onSubmit}>
					Submit
				</button>
			</div>
		</form>
	);
};

export default Sign;
