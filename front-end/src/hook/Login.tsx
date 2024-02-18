import Input from '@/components/Input';
import React, { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import store from '@/store/store';
import { login, setId } from '@/store/AuthUser/Auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from '../api';
import { errs } from '@/interfaces/errs';
import { setCookie } from 'nookies';
import Form from '@/components/Form';
import Button from '@/components/Button';

interface IUserLogin {
	email: string;
	password: string;
}

const LoginForm = () => {
	const navigate = useRouter();
	const [user, setUser] = useState<IUserLogin>({
		email: '',
		password: '',
	});

	const loginUser = async () => {
		await axios
			.post('/user/login', user)
			.then((res: AxiosResponse) => {
				const { message, token, user } = res.data;
				store.dispatch(login(true));
				store.dispatch(setId(user));
				setCookie(undefined, 'token', token, {
					maxAge: 24 * 60 * 15,
					path: '/',
				});
				toast.success(message);
				navigate.push('/home');
			})
			.catch((err: AxiosError<errs>) =>
				toast.error(err.response?.data.message),
			);
	};

	return (
		<Form>
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
			<Button Content="Login" Click={loginUser} />
		</Form>
	);
};

export default LoginForm;
