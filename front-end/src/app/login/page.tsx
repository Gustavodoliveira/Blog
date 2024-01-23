'use client';

import * as React from 'react';
import LoginForm from '@/hook/Login';

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
				<LoginForm />
			</div>
		);
	}
}
