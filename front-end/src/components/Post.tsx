/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

import style from '@/styles/components/post.module.sass';
import { log } from 'console';

export interface IPostProps {
	image?: string[];
	Title: string;
	Content: string;
	Author: string;
	categoric: string;
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

	componentDidMount(): void {
		const active = document.getElementsByClassName(`${style.slide}`);
		const slide_active = [];
		const btn_nav = [];
		const btns = document.getElementsByClassName(`${style.btn_image}`);
		let count: number;
		let currentSlide: any;

		for (count = 0; count <= active.length; count++) {
			slide_active.push(active[count]);
		}

		for (count = 0; count <= btns.length; count++) {
			btn_nav.push(btns[count]);
		}

		const nav = (something: any) => {
			slide_active.forEach((sli) => {
				sli?.classList.remove(`${style.active}`);
				btn_nav.forEach((btn) => btn?.classList.remove(`${style.active}`));
			});

			slide_active[something]?.classList.add(`${style.active}`);
			btn_nav[something]?.classList.add(`${style.active}`);
		};

		btn_nav.forEach((btn, i) => {
			btn?.addEventListener('click', () => {
				nav(i);
				currentSlide = i;
			});
		});
	}

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

						{this.props.image && this.props.image[1] && (
							<div className={style.slide}>
								<img
									src={`${process.env.NEXT_PUBLIC_API}public/${this.props.image[1]}`}
									alt="user"
									width={200}
									height={200}
									crossOrigin="anonymous"
								/>
							</div>
						)}
						{this.props.image && this.props.image[2] && (
							<div className={style.slide}>
								<img
									src={`${process.env.NEXT_PUBLIC_API}public/${this.props.image[2]}`}
									alt="user"
									width={200}
									height={200}
									crossOrigin="anonymous"
								/>
							</div>
						)}
						<div className={style.btns_image}>
							<button
								type="button"
								className={`${style.btn_image}  ${style.active}`}
							></button>
							<button type="button" className={`${style.btn_image}`}></button>
							<button type="button" className={`${style.btn_image}`}></button>
						</div>
					</div>
					<p>{this.props.Content}</p>
					<div>
						<i>{this.props.Author}</i>
						<span>{this.props.categoric}</span>
					</div>
				</div>
			</article>
		);
	}
}
