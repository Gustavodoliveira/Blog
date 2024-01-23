import style from '@/styles/components/avatar.module.sass';

interface IAvatarProps {
	url: string;
	width: number;
	height: number;
}

export const Avatar = (props: IAvatarProps): React.ReactNode => {
	return (
		<img
			src={props.url}
			alt="User Avatar"
			width={props.width}
			height={props.height}
			className={style.img_avatar}
			crossOrigin="anonymous"
		/>
	);
};
