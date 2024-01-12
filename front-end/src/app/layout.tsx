import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import styles from './page.module.sass';
import Header from '@/components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Raleway({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

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
				<Header />
				<ToastContainer autoClose={1500} />
				{children}
			</body>
		</html>
	);
}
