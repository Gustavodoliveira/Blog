

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { destroyCookie } from 'nookies';

 interface AuthUser{
    isLogged: boolean,
		setId: string
}

const initialState: AuthUser = {
	isLogged: false ,
	setId: ''
};

export const userReducer = createSlice({
	name: 'Register',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<boolean>) => {
			state.isLogged = action.payload;
		},

		logout: (state, action: PayloadAction<boolean>) => {
			destroyCookie({}, 'token', {
				path: '/'
			});
			state.isLogged = action.payload;
		},

		setId: (state, action: PayloadAction<string>) => {
			state.setId = action.payload;
		}
 	}
});

export const { login, logout, setId} = userReducer.actions;
export default userReducer.reducer;