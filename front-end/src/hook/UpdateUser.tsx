import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import React, { useState } from 'react';
import { AiFillFileImage } from 'react-icons/ai';
import { Iuser as User } from './Register';
import axios from '../api';
import { AxiosError, AxiosResponse } from 'axios';
import { errs } from '@/interfaces/errs';
import { parseCookies } from 'nookies';
import store from '@/store/store';
import { toast } from 'react-toastify';

const UpdateUser = (user: User) => {
	const [iuser, setUser] = useState<User>({
		image: new File([new Blob()], 'hero'),
		email: user.email,
		name: user.name,
	});

	const edit = () => {
		const { token } = parseCookies();
		const id = store.getState().setId;

		axios
			.patch(`user/update/${id}`, iuser, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				toast.success(res.data.message);
			})
			.catch((err: AxiosError<errs>) => {
				toast.error(err.response?.data.message);
			});
	};
	return (
		<>
			<Form>
				<label htmlFor="image">
					<AiFillFileImage /> <span>Chose a file</span>
					<Input name="image" type="file" id="image" multiple={false} />
				</label>

				<Input
					name="name"
					type="text"
					placeHolder={user.name}
					Change={(e) => setUser({ ...iuser, name: e.target.value })}
				/>
				<Input
					name="email"
					type="email"
					placeHolder={user.email}
					Change={(e) => setUser({ ...iuser, email: e.target.value })}
				/>
				<Input
					name="password"
					type="password"
					placeHolder="Password"
					Change={(e) => setUser({ ...iuser, password: e.target.value })}
				/>
				<Input
					name="ConfirmPassword"
					type="password"
					placeHolder="Confirm password"
					Change={(e) => setUser({ ...iuser, ConfirmPassword: e.target.value })}
				/>
				<Button Content="Edit" Click={() => edit()} />
			</Form>
		</>
	);
};

export default UpdateUser;
