import { configureStore } from '@reduxjs/toolkit';
import userReducer from './AuthUser/Auth';
import { persistReducer } from 'redux-persist';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import storage from './storage';



const persistConfig = {
	key: 'root',
	storage: storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware:  (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	})
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;