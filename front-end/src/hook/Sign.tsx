import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import style from '@/styles/components/formController.module.sass';

interface errs {
	message: string;
}

const Sign = () => {
	const { register, handleSubmit } = useForm();
	const name = useRef<HTMLInputElement | null>(null);

	const email = useRef<HTMLInputElement | null>(null);
	const password = useRef<HTMLInputElement | null>(null);
	const ConfirmPassword = useRef<HTMLInputElement | null>(null);
	const { ref, ...rest } = register('email');
	const { ref: NameRef, ...Namerest } = register('name');
	const { ref: PasswordRef, ...pasrest } = register('password');
	const { ref: ConfirmPasswordRef, ...ConfirmPassrest } =
		register('ConfirmPassword');

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmit = (data: unknown) => {
		axios
			.post('https://blog-a34y.onrender.com/user/create', data, {
				headers: {
					'Content-Type': 'application/json',
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
			.then((res: AxiosResponse) => toast.success(res.data?.message))
			.catch((e: AxiosError<errs>) => toast.error(e.response?.data?.message));
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			method="post"
			className={style.form_controller}
		>
			<div>
				<label htmlFor="name">Name: </label>
				<input
					{...Namerest}
					name="name"
					type="text"
					placeholder="Name"
					ref={(e) => {
						NameRef(e);
						name.current = e;
					}}
				/>
				<label htmlFor="email">E-mail: </label>
				<input
					{...rest}
					name="email"
					type="email"
					placeholder="E-mail"
					ref={(e) => {
						ref(e);
						email.current = e; // you can still assign to ref
					}}
				/>
				<label htmlFor="password">Password: </label>
				<input
					{...pasrest}
					name="password"
					type="password"
					placeholder="Password"
					ref={(e) => {
						PasswordRef(e);
						password.current = e; // you can still assign to ref
					}}
				/>
				<label htmlFor="ConfirmPassword">Password: </label>
				<input
					{...ConfirmPassrest}
					name="ConfirmPassword"
					type="password"
					placeholder="Password"
					ref={(e) => {
						ConfirmPasswordRef(e);
						ConfirmPassword.current = e; // you can still assign to ref
					}}
				/>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

export default Sign;
