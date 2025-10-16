import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { authService } from "./auth.service";
import httpStatus from 'http-status-codes'
import { sendResponse } from "../../utils/sendResponse";
import { setAtuhCookie } from "../../utils/setCookie";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.registerUser(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Create Successfully",
        data: result
    })
});

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.loginUser(req.body);
    setAtuhCookie(res, result);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Login user Successfully",
        data: {
            accessToken: result.accessToken,
            refreshToken: result.accessToken,
        }
    })
});



export const authController = {
    registerUser,
    loginUser
}