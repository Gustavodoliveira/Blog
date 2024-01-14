

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

 interface AuthUser{
    isLogged: boolean,
		id: string
}

const initialState: AuthUser = {
	isLogged: false ,
	id: ''
};





export const userRegister = createSlice({
	name: 'Register',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<boolean>) => {
			state.isLogged = action.payload;
		},

		logout: (state, action: PayloadAction<boolean>) => {
			state.isLogged = action.payload;
		},

		setId: (state, action: PayloadAction<string>) => {
			state.id = action.payload;
		}
	}
});

export const { login, logout, setId } = userRegister.actions;
export default userRegister.reducer;