import React, { useState } from 'react';
import { toast } from 'react-toastify';
import style from '@/styles/components/formController.module.sass';
import axios from '../api';
import Input from '@/components/Input';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import store from '@/store/store';
import { login } from '@/store/AuthUser/Auth';
import { AiFillFileImage } from 'react-icons/ai';

interface errs {
	message: string;
}
interface Iuser {
	image: unknown;
	name: string;
	email: string;
	password: string;
	ConfirmPassword: string;
}

const Sign = () => {
	const navigate = useRouter();
	const [user, setUser] = useState<Iuser>({
		image: '',
		name: '',
		email: '',
		password: '',
		ConfirmPassword: '',
	});

	const onSubmit = async () => {
		await axios
			.post('user/create', user, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				const { message, token } = res.data;
				setCookie(undefined, 'token', token, {
					signed: true,
					maxAge: 1000 * 60 * 15,
				});
				store.dispatch(login(true));
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
				<label htmlFor="image">
					<AiFillFileImage /> <span>Chose a file</span>
					<Input
						type="file"
						name="image"
						id="image"
						Change={(e) => {
							if (!e.target.files) return;
							setUser({ ...user, image: e.target.files[0] });
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
