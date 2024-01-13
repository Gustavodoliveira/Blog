import React, { useState } from 'react';
import { toast } from 'react-toastify';
import style from '@/styles/components/formController.module.sass';
import axios from '../api';
import Input from '@/components/Input';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

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
				toast.success(res.data.message);
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
				<label htmlFor="image">Avatar :</label>
				<Input
					type="file"
					name="image"
					Change={(e) => {
						if (!e.target.files) return;
						setUser({ ...user, image: e.target.files[0] });
					}}
				/>
				<label htmlFor="name">Name: </label>
				<Input
					name="name"
					type="text"
					placeHolder="Name"
					Change={(e) => setUser({ ...user, name: e.target.value })}
				/>
				<label htmlFor="email">E-mail: </label>
				<Input
					name="email"
					type="email"
					placeHolder="E-mail"
					Change={(e) => setUser({ ...user, email: e.target.value })}
				/>
				<label htmlFor="password">Password: </label>
				<Input
					name="password"
					type="password"
					placeHolder="Password"
					Change={(e) => setUser({ ...user, password: e.target.value })}
				/>
				<label htmlFor="ConfirmPassword">Confirm Password: </label>
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
