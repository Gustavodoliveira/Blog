'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../api';
import Input from '@/components/Input';
import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import store from '@/store/store';
import { login, setId } from '@/store/AuthUser/Auth';
import { errs } from '@/interfaces/errs';
import { AiFillFileImage } from 'react-icons/ai';
import { Avatar } from '@/components/Avatar';
import { parseCookies, setCookie } from 'nookies';
import Form from '@/components/Form';
import Button from '@/components/Button';

export interface Iuser {
	image: File;
	name: string;
	email: string;
	password?: string;
	ConfirmPassword?: string;
}

const Sign = () => {
	const par = useSearchParams();
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
		const q = par.get('home');

		const { token } = parseCookies();
		if (token) {
			navigate.push('/home');
		}
	}, [navigate]);

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
					maxAge: 24 * 60 * 15,
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
		<Form>
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
			<Button Content="Submit" Click={onSubmit} />
		</Form>
	);
};

export default Sign;
