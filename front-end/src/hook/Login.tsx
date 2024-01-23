import Input from '@/components/Input';
import React, { useState } from 'react';
import style from '@/styles/components/formController.module.sass';
import { AxiosError, AxiosResponse } from 'axios';
import store from '@/store/store';
import { login, setId } from '@/store/AuthUser/Auth';
import { setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from '../api';
import { errs } from '@/interfaces/errs';

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
					signed: true,
					maxAge: 1000 * 60 * 15,
				});
				toast.success(message);
				navigate.push('/home');
			})
			.catch((err: AxiosError<errs>) =>
				toast.error(err.response?.data.message),
			);
	};

	return (
		<form
			action="post"
			onSubmit={(e) => e.preventDefault()}
			className={style.form_controller}
		>
			<div>
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
				<button type="submit" className={style.login_btn} onClick={loginUser}>
					Login
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
