import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { parcelService } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';



// Sender Routes
const crateParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const data = await parcelService.createParcels(req.body, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Create Successfully",
        data: data
    });
});

const getAllParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const data = await parcelService.getAllParcel(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Parcel Retrive Successfully",
        data: data
    });
});

const cancelParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const data = await parcelService.cancelParcel(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Cancel Parsel Successfully",
        data: data
    });
});
const ParcelStatusHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const data = await parcelService.ParcelStatusHistory(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Parcel status log fetched successfully",
        data: data
    });
});

// Receiver 
const getIncomingParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const receiverId = req.user.userId;
    const result = await parcelService.getIncomingParcel(receiverId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Incoming parcels fetched successfully",
        data: result
    });
});
const percelReciver = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const receiverId = req.params.id;
    const result = await parcelService.deliverParcel(receiverId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Incoming parcels fetched successfully",
        data: result
    });
});
const percelHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const result = await parcelService.percelHistory(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Delivery history fetched successfully",
        data: result
    });
});

export const parcelController = {
    crateParcels,
    getAllParcel,
    cancelParcel,
    ParcelStatusHistory,
    getIncomingParcel,
    percelReciver,
    percelHistory
}