import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { parcelService } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";



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

const onlyAllSenderParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const data = await parcelService.onlyAllSenderParcel(userId);
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


// all parcel 
const getAllParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await parcelService.getAllParcel();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Parcel Get successfully",
        data: result
    });
});
const getSingleParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await parcelService.getSingleParcel(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Parcel successfully",
        data: result
    });
});
const parcelStatusUpdate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { status } = req.query;
    const result = await parcelService.parcelStatusUpdate(id, status as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Parcel status updated successfully",
        data: result
    });
});
const blockParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id; 
    const result = await parcelService.blockParcel(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: result.message,
        data: result.parcel
    });
});



// traking parcel 
const trackingParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    const id = req.params.trackingId;
      const result = await parcelService.trackingParcel(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Parcel Traking Data Fetch successfully",
        data: result
    });
});

export const parcelController = {
    crateParcels,
    onlyAllSenderParcel,
    cancelParcel,
    ParcelStatusHistory,
    getIncomingParcel,
    percelReciver,
    percelHistory,
    getAllParcel,
    getSingleParcel,
    parcelStatusUpdate,
    blockParcel,
    trackingParcel
}