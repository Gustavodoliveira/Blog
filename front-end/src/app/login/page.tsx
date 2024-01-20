'use client';
import Input from '@/components/Input';
import style from '@/styles/components/formController.module.sass';

import * as React from 'react';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<div>
				<h1>login</h1>

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
							Change={(e) => console.log(e.target.value)}
						/>
						<Input
							name="password"
							type="password"
							placeHolder="Password"
							Change={(e) => console.log(e.target.value)}
						/>
						<button type="submit" className={style.login_btn}>
							Login
						</button>
					</div>
				</form>
			</div>
		);
	}
}
