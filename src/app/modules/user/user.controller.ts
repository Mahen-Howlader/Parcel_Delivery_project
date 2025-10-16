import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';

const allUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allData = await userService.allUser();
    sendResponse(res, {
        success: true,
        message: "All Users Retrieved Successfully",
        statusCode: httpStatus.OK,
        data: allData
    })
});
const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await userService.getSingleUser(id);
    sendResponse(res, {
        success: true,
        message: "Single User Retrieved Successfully",
        statusCode: httpStatus.OK,
        data: data
    });
});
const blockedAndUnclockedUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await userService.blockedAndUnclockedUser(id);
    sendResponse(res, {
        success: true,
        message: data.message,
        statusCode: httpStatus.OK,
        data: data
    });
});
const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await userService.deleteUser(id);
    sendResponse(res, {
        success: true,
        message: "User delete successfully",
        statusCode: httpStatus.OK,
        data: null
    });
});


export const controllerUser = {
    allUser,
    getSingleUser,
    blockedAndUnclockedUser,
    deleteUser
};