import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../../config/env";
import httpStatus from 'http-status-codes';
import { User } from "../modules/user/user.model";

export const checkAuth = (...authRole: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError(403, "No Token Recived")
        }
        const verifyedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECREAT);
        const isUserExist = await User.findOne({ email: verifyedToken.email });
        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "Email dose not exist");
        };
        if (isUserExist.isBlocked) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is Blocked");
        }
        if (!authRole.includes(verifyedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!");
        }

        req.user = verifyedToken;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};