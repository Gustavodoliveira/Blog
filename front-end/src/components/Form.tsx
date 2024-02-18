import * as React from 'react';
import style from '@/styles/components/formController.module.sass';

export interface IFormProps {
	children: React.ReactNode;
}

export interface IFormState {}

export default class Form extends React.Component<IFormProps, IFormState> {
	constructor(props: IFormProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<form
				method="post"
				className={style.form_controller}
				onSubmit={(e) => e.preventDefault()}
			>
				{this.props.children}
			</form>
		);
	}
}
