import { createSlice } from "@reduxjs/toolkit";
import { JwtHeader, JwtPayload, jwtDecode } from "jwt-decode";
import TokenService, { TokenObject } from "../../config/TokenService";

interface AuthState {
  user: JwtHeader | JwtPayload | null | undefined;
  token: { accessToken: string } | null | TokenObject;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: TokenService.getUser(),
  token: TokenService.getToken(),
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;

      //decode and store current user
      const decodedUser = jwtDecode(token);
      //store user in state
      state.user = decodedUser;
      state.token = token as TokenObject;

      if (state.user === decodedUser) {
        state.isLoggedIn = true;
      }

      TokenService.updateLocalAccessToken(state.token);
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
