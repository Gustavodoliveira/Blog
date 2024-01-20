import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import styles from './page.module.sass';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import ReduxProvider from '@/store/Provider';

const inter = Raleway({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const HeaderNoSSR = dynamic(() => import('../components/Header'));

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Blog',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${styles.style_body} ${inter.className}`}>
				<ReduxProvider>
					<HeaderNoSSR />
					<ToastContainer autoClose={1500} />
					{children}
				</ReduxProvider>
			</body>
		</html>
	);
}
