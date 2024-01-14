'use client';
import Register from '@/hook/Register';
import ReduxProvider from '@/store/Provider';

import * as React from 'react';

export interface IAppProps {}

export interface IAppState {}

export default class Home extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<main>
				<ReduxProvider>
					<Register />
				</ReduxProvider>
			</main>
		);
	}
}
