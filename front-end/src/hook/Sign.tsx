import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

const Sign = (): JSX.Element => {
	const { register, handleSubmit } = useForm();
	const email = useRef<HTMLInputElement | null>(null);
	const password = useRef<HTMLInputElement | null>(null);
	const { ref, ...rest } = register('email');
	const { ref: PasswordRef, ...pasrest } = register('password');

	return (
		<form onSubmit={handleSubmit((data) => console.log(data))}>
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
			<button type="submit">Submit</button>
		</form>
	);
};

export default Sign;
