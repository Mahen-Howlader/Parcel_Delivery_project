import { envVars } from "../../config/env";
import { IUser } from "../modules/user/user.interface";
import { genaretToken } from "./jwt";

export const createUserToken = (user: Partial<IUser>) => {
    const JwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    };

    const accessToken = genaretToken(JwtPayload, envVars.JWT_ACCESS_SECREAT, envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = genaretToken(JwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRED);

    return {
        accessToken,
        refreshToken
    }
};
