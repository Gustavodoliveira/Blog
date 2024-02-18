import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import React, { useState } from 'react';
import { AiFillFileImage } from 'react-icons/ai';
import { Iuser as User } from './Register';

const UpdateUser = (user: User) => {
	const [iuser, setUser] = useState<User>({
		image: new File([new Blob()], 'hero'),
		email: '',
		name: '',
		password: '',
		ConfirmPassword: '',
	});
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
				<Input name="password" type="password" placeHolder="Password" />
				<Input
					name="ConfirmPassword"
					type="password"
					placeHolder="Confirm password"
				/>
				<Button Content="Edit" Click={() => console.log(iuser)} />
			</Form>
		</>
	);
};

export default UpdateUser;
