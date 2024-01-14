

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

 interface AuthUser{
    isLogged: boolean,
}

const initialState: AuthUser = {
	isLogged: false ,
};





export const userReducer = createSlice({
	name: 'Register',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<boolean>) => {
			state.isLogged = action.payload;
		},

		logout: (state, action: PayloadAction<boolean>) => {
			state.isLogged = action.payload;
		},
	}
});

export const { login, logout,} = userReducer.actions;
export default userReducer.reducer;