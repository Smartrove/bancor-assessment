import Cookie from "js-cookie";
// import jwt from "jsonwebtoken";
import { config } from "./config";
import { JwtPayload, jwtDecode } from "jwt-decode";

const { production, dev } = config;

export interface TokenObject {
  token: string;
}

const getLocalAccessToken = () => {
  try {
    const user = Cookie.get("token");
    return user;
  } catch (error) {
    return null;
  }
};

const getUser = () => {
  try {
    const user = Cookie.get("token");
    if (user) {
      // Check if user is defined before decoding
      return jwtDecode(user);
    }
  } catch (error) {
    if (dev) console.log(error);
    return null;
  }
};

export const getToken = () => {
  try {
    const accessToken = Cookie.get("token");

    if (accessToken) {
      const token = {
        accessToken,
      };
      return token;
    }

    return null;
  } catch (error) {
    // if (dev) console.log(error);
    return null;
  }
};

const updateLocalAccessToken = (token: TokenObject | null) => {
  try {
    if (token) {
      //@ts-expect-error token
      const accessTokenDecoded = jwtDecode(token) as JwtPayload;

      const accessTokenExp = accessTokenDecoded.iat;
      console.log("access token decoded", accessTokenDecoded);
      console.log("access token accessTokenExp", accessTokenExp);

      // Check if accessTokenDecoded.exp is defined before using it
      if (accessTokenExp !== undefined) {
        const accessTokenExpiry = new Date(accessTokenExp * 2000);

        const accessTokenCookieOptions = {
          httpOnly: false,
          expires: accessTokenExpiry,
          path: "/",
          sameSite: "strict",
          secure: production,
        };

        //@ts-expect-error token
        console.log(Cookie.set("token", token, accessTokenCookieOptions));
        //@ts-expect-error token
        Cookie.set("token", token, accessTokenCookieOptions);
      }
    }
  } catch (error) {
    // Handle the error if needed
    console.error(error);
    return false;
  }
};

const removeUser = () => {
  try {
    const token = Cookie.get("token");
    if (token) {
      Cookie.remove("token", { path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
};

const TokenService = {
  getLocalAccessToken,
  updateLocalAccessToken,
  removeUser,
  getToken,
  getUser,
};

export default TokenService;
