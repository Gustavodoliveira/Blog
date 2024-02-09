import * as React from 'react';
import style from '@/styles/components/post-card.module.sass';
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
			<div className={style.Container}>
				<h2>{this.props.Title}</h2>
				<img
					src={`${process.env.NEXT_PUBLIC_API}public/${this.props.image[0]}`}
					alt="Image post"
					width={200}
					height={200}
					crossOrigin="anonymous"
				/>
				<div>
					<span>
						<i>
							<strong>{this.props.Author}</strong>
							{''} {this.props.Categoric}
						</i>
					</span>
				</div>
			</div>
		);
	}
}
