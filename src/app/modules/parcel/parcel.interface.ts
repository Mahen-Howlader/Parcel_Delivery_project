import { Types } from "mongoose";

export enum ParcelStatusEnum {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    DISPATCHED = "DISPATCHED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
};

export interface IParcel {
    senderId: string;
    receiverId: string;
    userId : Types.ObjectId;
    type: string;
    weight: number;
    address: string;
    deliveryDate: Date;
    fee: number;
    status?: ParcelStatusEnum; // enum type
    statusLog?: { status: ParcelStatusEnum; timestamp: Date }[];
};