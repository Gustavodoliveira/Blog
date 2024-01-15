import Image from 'next/image';
import * as React from 'react';

export interface IPostProps {
	image?: any;
	Title: string;
	Content: string;
	Author: string;
	categoric: string;
}

export interface IPostState {}

export default class Post extends React.Component<IPostProps, IPostState> {
	constructor(props: IPostProps) {
		super(props);

		this.state = {};
	}

	public render() {
		const { path } = this.props.image;
		console.log(this.props.image);

		return (
			<div>
				<h3>{this.props.Title}</h3>
				<p>{this.props.Content}</p>
				<i>{this.props.Author}</i>
				<span>{this.props.categoric}</span>
				<img
					src={`${process.env.NEXT_PUBLIC_API}public/6d3fcdab0de8-download.jpeg`}
					alt="user"
					width={200}
					height={200}
					crossOrigin="anonymous"
				/>
			</div>
		);
	}
}
