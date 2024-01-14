/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoobStorage = () => {
	return {
		getItem(_key: unknown) {
			return Promise.resolve(null);
		},
		setItem(_key:unknown) {
			return Promise.resolve();
		},
		removeItem(_key: unknown) {
			return Promise.resolve();
		}
	};
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoobStorage();

export default storage;