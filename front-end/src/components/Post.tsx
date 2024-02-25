/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

import style from '@/styles/components/post.module.sass';

export interface IPostProps {
	image?: string[];
	Title: string;
	Content: string;
	Author: string;
}

export interface IPostState {
	thereIsImage: boolean;
	imageA?: string;
	imageB: string;
	imageC: string;
}

export default class Post extends React.Component<IPostProps, IPostState> {
	constructor(props: IPostProps) {
		super(props);

		this.state = {
			thereIsImage: false,
			imageA: '',
			imageB: '',
			imageC: '',
		};
	}

	componentDidMount(): void {}

	public render() {
		return (
			<article className={style.container}>
				<div className={style.container_content}>
					<h3 className={style.title}>{this.props.Title}</h3>
					div
					<div className={style.image_carousel}>
						{this.props.image && (
							<div className={`${style.slide}  ${style.active}`}>
								<img
									src={`${process.env.NEXT_PUBLIC_API}public/${this.props.image[0]}`}
									alt="user"
									width={200}
									height={200}
									crossOrigin="anonymous"
								/>
							</div>
						)}
					</div>
					<p>{this.props.Content}</p>
					<div>
						<i>{this.props.Author}</i>
					</div>
				</div>
			</article>
		);
	}
}
