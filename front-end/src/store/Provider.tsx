'use client';

import { Provider } from 'react-redux';
import store from './store';
import { persistStore } from 'redux-persist';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

persistStore(store);

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const nav = useRouter();

	useEffect(() => {
		const { token } = parseCookies();
		if (!token) nav.push('/');
	}, []);

	return <Provider store={store}>{children}</Provider>;
}
