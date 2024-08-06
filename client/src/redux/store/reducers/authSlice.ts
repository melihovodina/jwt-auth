import { iUser } from '../../models/iUser';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, registration, logout, checkAuth} from './actionCreators';

interface UserState {
    user: iUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: {} as iUser,
    isAuth: false,
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
          },
          setUser(state, action: PayloadAction<iUser>) {
            state.user = action.payload;
          },
          setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.user;
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
          })
          .addCase(registration.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(registration.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.user;
          })
          .addCase(registration.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
          })
          .addCase(logout.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = {} as iUser;
          })
          .addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
          })
          .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.user;
          })
          .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
          });
      },
    });
    export const { setAuth, setUser, setLoading } = authSlice.actions;
    
    export default authSlice.reducer;