import * as React from 'react';
import style from '@/styles/components/modal.module.sass';

export interface IModalProps {
	children: React.ReactNode;
	headerChildren: React.ReactNode;
}

export interface IModalState {}

export default class Modal extends React.Component<IModalProps, IModalState> {
	constructor(props: IModalProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<div className={style.modal_container}>
				<div className={style.modal_container_wrapper}>
					<div className={style.modal_container_wrapper_background}>
						<header className={style.modal_header}>
							{this.props.headerChildren}
						</header>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
