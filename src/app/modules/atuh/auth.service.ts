import { config } from "dotenv";
import { envVars } from "../../../config/env";
import AppError from "../../errorHelpers/appError";
import { genaretToken } from "../../utils/jwt";
import { IUser, IUserLogin } from "../user/user.interface";
import { User } from "./auth.model";
import bcrypt from "bcrypt";
import httpStatus from 'http-status-codes';
import { createUserToken } from "../../utils/userToken";

const registerUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await User.findOne({ email });

    const hashPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));

    const user = await User.create({
        email,
        password: hashPassword,
        ...rest
    })
    return user
};
const loginUser = async (payload: Partial<IUserLogin>) => {
    const { email, password } = payload;
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not Found")
    };

    const checkPassword = await bcrypt.compare(password as string, isUserExist.password as string);
    if (!checkPassword) {
        throw new AppError(403, "Password not matched");
    }
    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role,
        id: isUserExist._id
    };
    const {accessToken,refreshToken} = createUserToken(jwtPayload);

    return {
        accessToken,
        refreshToken
    }
};

export const authService = {
    registerUser,
    loginUser
}