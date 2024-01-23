/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

import style from '@/styles/components/post.module.sass';

export interface IPostProps {
	image?: string[];
	Title: string;
	Content: string;
	Author: string;
	categoric: string;
}

export interface IPostState {
	thereIsImage: boolean;
}

export default class Post extends React.Component<IPostProps, IPostState> {
	constructor(props: IPostProps) {
		super(props);

		this.state = {
			thereIsImage: false,
		};
	}

	public render() {
		let i;
		let b;
		let c;

		if (this.props.image) {
			i = this.props.image[0];
			b = this.props.image[1];
			c = this.props.image[2];
		}

		return (
			<div className={style.container}>
				<h3 className={style.title}>{this.props.Title}</h3>
				{b && (
					<img
						src={`${process.env.NEXT_PUBLIC_API}public/${b}`}
						alt="user"
						width={200}
						height={200}
						crossOrigin="anonymous"
					/>
				)}

				<p>{this.props.Content}</p>
				<i>{this.props.Author}</i>
				<span>{this.props.categoric}</span>
				{i && (
					<img
						src={`${process.env.NEXT_PUBLIC_API}public/${i}`}
						alt="user"
						width={200}
						height={200}
						crossOrigin="anonymous"
					/>
				)}
				{c && (
					<img
						src={`${process.env.NEXT_PUBLIC_API}public/${c}`}
						alt="user"
						width={200}
						height={200}
						crossOrigin="anonymous"
					/>
				)}
			</div>
		);
	}
}
