'use client';
import Header from '@/components/footer/Header';
import Sign from '@/hook/Sign';

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
			<div>
				<Header />
				<Sign />
			</div>
		);
	}
}
