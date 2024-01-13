import * as React from 'react';
import style from '@/styles/components/modal.module.sass';

export interface IModalProps {
	click: React.MouseEventHandler<HTMLDivElement> | undefined;
	children: React.ReactNode;
}

export interface IModalState {}

export default class Modal extends React.Component<IModalProps, IModalState> {
	constructor(props: IModalProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<div className={style.modal_container} onClick={this.props.click}>
				<div className={style.modal_container_wrapper}>
					<div className={style.modal_container_wrapper_background}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
