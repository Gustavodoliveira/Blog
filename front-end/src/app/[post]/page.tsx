'use client';

import GetPost from '@/hook/GetPost';
import * as React from 'react';

import style from '@/styles/pages/PostHome.module.sass';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<main className={style.container}>
				{/* TODO: image carousel  */}
				<GetPost />
			</main>
		);
	}
}
