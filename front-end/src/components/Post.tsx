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
	images?: string;
}

export default class Post extends React.Component<IPostProps, IPostState> {
	constructor(props: IPostProps) {
		super(props);

		this.state = {
			thereIsImage: false,
			images: '',
		};
	}

	componentDidMount(): void {
		if (this.props.image) {
			this.setState({ ...this.state, thereIsImage: true });

			this.setState({ ...this.state, images: this.props.image[0] });
			this.props.image[1];
			this.props.image[2];
		}
	}

	public render() {
		return (
			<article className={style.container}>
				<div className={style.container_content}>
					<h3 className={style.title}>{this.props.Title}</h3>
					{this.state.images && (
						<img
							src={`${process.env.NEXT_PUBLIC_API}public/${this.state.images}`}
							alt="user"
							width={200}
							height={200}
							crossOrigin="anonymous"
						/>
					)}

					<p>{this.props.Content}</p>
					<i>{this.props.Author}</i>
					<span>{this.props.categoric}</span>
					{/*{i && (
						<img
							src={`${process.env.NEXT_PUBLIC_API}public/${b}`}
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
					)}*/}
				</div>
			</article>
		);
	}
}
