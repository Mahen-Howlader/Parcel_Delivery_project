import AppError from "../../errorHelpers/appError";
import { IParcel, ParcelStatusEnum } from "./parcel.interface"
import { Parcel } from "./parcel.model";

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

const getAllParcel = async (id: string) => {
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





export const parcelService = {
    createParcels,
    getAllParcel,
    cancelParcel,
    ParcelStatusHistory,
    getIncomingParcel,
    deliverParcel,
    percelHistory
}