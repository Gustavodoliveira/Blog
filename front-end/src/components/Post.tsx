import * as React from 'react';

export interface IPostProps {
	image?: FileList[];
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
		return (
			<div>
				<h3>{this.props.Title}</h3>
				<p>{this.props.Content}</p>
				<i>{this.props.Author}</i>
				<span>{this.props.categoric}</span>
				<img
					src={`${process.env.NEXT_PUBLIC_API}public/${this.props.image}`}
					alt="user"
					width={200}
					height={200}
					crossOrigin="anonymous"
				/>
			</div>
		);
	}
}
