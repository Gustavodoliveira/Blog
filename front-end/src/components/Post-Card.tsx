import * as React from 'react';

export interface IAppProps {
	image: string[];
	Title: string;
	Author: string;
	Categoric: string;
}

export interface IAppState {}

export default class PostCard extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<div>
				<h2>{this.props.Title}</h2>
				<img
					src={`${process.env.NEXT_PUBLIC_API}public/${this.props.image[0]}`}
					alt="Image post"
					width={150}
					height={150}
					crossOrigin="anonymous"
				/>
				<div>
					<span>
						<strong>{this.props.Author}</strong>
						{''} <i>{this.props.Categoric}</i>
					</span>
				</div>
			</div>
		);
	}
}
