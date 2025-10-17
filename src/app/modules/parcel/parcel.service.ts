import AppError from "../../errorHelpers/appError";
import { IParcel, ParcelStatusEnum } from "./parcel.interface"
import { Parcel } from "./parcel.model";
import httpStatus from 'http-status-codes';

const createParcels = async (payload: Partial<IParcel>, userId: string) => {
    if (!payload.fee && payload.weight) {
        payload.fee = Number(payload.weight * 50);
    };
    if (payload.weight && payload.weight <= 0) {
        throw new AppError(401, "Weight must be a positive number");
    };
    const allData = {
        ...payload,
        userId
    }

    const data = await Parcel.create(allData);
    return data;
};

const onlyAllSenderParcel = async (id: string) => {
    const data = await Parcel.find({ userId: id });
    return data;
};

const cancelParcel = async (id: string) => {
    console.log(id);
    const parcel = await Parcel.findById(id);
    if (!parcel) {
        throw new AppError(400, "Parcel not found");
    }

    if (parcel.status === ParcelStatusEnum.DISPATCHED || parcel.status === ParcelStatusEnum.DELIVERED) {
        throw new AppError(400, "Parcel cannot be cancelled once dispatched or delivered");
    }

    parcel.status = ParcelStatusEnum.CANCELLED;

    // statusLog এ push করা
    parcel.statusLog?.push({
        status: ParcelStatusEnum.CANCELLED,
        timestamp: new Date(),
    });
    await parcel.save();

    return parcel;
};
const ParcelStatusHistory = async (id: string) => {
    const parcel = await Parcel.findById(id).select("statusLog");
    if (!parcel) {
        throw new AppError(404, "Parcel not found")
    }
    return parcel
};

// Receiver 
const getIncomingParcel = async (receiverId: string) => {
    if (!receiverId) {
        throw new AppError(400, "Receiver ID is required")
    };
    const parcels = await Parcel.find({ receiverId });
    return parcels;
};
const deliverParcel = async (parcelId: string) => {
    if (!parcelId) {
        throw new AppError(400, "Parcel ID is required");
    }

    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
        throw new AppError(404, "Parcel not found");
    }

    // যদি আগে থেকেই delivered হয়ে থাকে
    if (parcel.status === ParcelStatusEnum.DELIVERED) {
        throw new AppError(400, "Parcel already delivered");
    }

    parcel.status = ParcelStatusEnum.DELIVERED;
    parcel.statusLog?.push({
        status: ParcelStatusEnum.DELIVERED,
        timestamp: new Date(),
    });

    await parcel.save();

    return parcel;
};
const percelHistory = async (userId: string) => {
    if (!userId) {
        throw new AppError(400, "Parcel ID is required");
    }
    // Receiver এর সব delivered parcel
    const parcels = await Parcel.find({
        userId,
        status: ParcelStatusEnum.DELIVERED,
    });

    return parcels;
};

// getAllParcel

const getAllParcel = async () => {
    const parcels = await Parcel.find();
    return parcels;
};

const getSingleParcel = async (id: string) => {
    if (!id) {
        throw new AppError(400, "Receiver ID is required")
    };
    const parcels = await Parcel.findById(id);
    return parcels;
};
const parcelStatusUpdate = async (id: string, status: string) => {
    const parcels = await Parcel.findById(id);
    if (!parcels) {
        throw new AppError(httpStatus.NOT_FOUND, "Parcel Not Found");
    };
    if (parcels.status === status) {
        throw new AppError(httpStatus.BAD_REQUEST, "Status is already set to this value");
    };
    if (!status) {
        throw new AppError(httpStatus.BAD_REQUEST, "Status Required");
    }
    const updatedParcel = await Parcel.findByIdAndUpdate(
        id,
        {
            $set: { status },
            $push: {
                statusLog: {
                    status,
                    updatedAt: new Date()
                }
            }
        },
        { new: true, runValidators: true }
    );

    return updatedParcel;
};

const blockParcel = async (id: string) => {
    const parcel = await Parcel.findById(id);
    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, "Parcel Is NOT Found")
    }

    parcel.isBlocked = !parcel.isBlocked;
    await parcel.save();
    return {
        message: parcel.isBlocked
            ? "Parcel has been blocked successfully"
            : "Parcel has been unblocked successfully",
        parcel,
    }
};
const trackingParcel = async (id: string) => {
    const parcel = await Parcel.findOne({ trackingId: id });

    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, "Tracking Id Parcel NOT Found");
    }

    return {
        trackingId: parcel.trackingId,
        currentStatus : parcel.status,
        statusLog: parcel.statusLog
    };
};
export const parcelService = {
    createParcels,
    getAllParcel,
    cancelParcel,
    ParcelStatusHistory,
    getIncomingParcel,
    deliverParcel,
    percelHistory,
    onlyAllSenderParcel,
    getSingleParcel,
    parcelStatusUpdate,
    blockParcel,
    trackingParcel
}