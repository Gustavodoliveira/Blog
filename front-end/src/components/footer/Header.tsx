'use client';

import * as React from 'react';

import styled from '../../styles/components/header.module.sass';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';

export interface IAppProps {}

export interface IAppState {}

export default class Header extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<header className={styled.Header_Container}>
				<h1 className={styled.text}>Blog</h1>
				<nav>
					<AiOutlineMenu className={styled.icon} />
					<ul>
						<li>
							<Link href="/">Login</Link>
						</li>
						<li>
							<Link href="/">About</Link>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
