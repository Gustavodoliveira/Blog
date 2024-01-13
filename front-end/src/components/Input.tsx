import * as React from 'react';
import style from '@/styles/components/input.module.sass';

export interface IInputProps {
	type: string;
	Change: React.ChangeEventHandler<HTMLInputElement> | undefined;
	placeHolder?: string;
	name: string;
}

export interface IInputState {}

export default class Input extends React.Component<IInputProps, IInputState> {
	constructor(props: IInputProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<input
				type={this.props.type}
				name={this.props.name}
				placeholder={this.props.placeHolder}
				onChange={this.props.Change}
				className={style.inputs}
			/>
		);
	}
}
