import * as React from 'react';
import Style from '@/styles/components/button.module.sass';
export interface IButtonProps {
	Content: string;
	Click?: React.FormEventHandler<HTMLButtonElement>;
	Class?: string;
}

export interface IButtonState {}

export default class Button extends React.Component<
	IButtonProps,
	IButtonState
> {
	constructor(props: IButtonProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<button
				onClick={this.props.Click}
				className={`${Style.button}  ${this.props.Class}`}
			>
				{this.props.Content}
			</button>
		);
	}
}
