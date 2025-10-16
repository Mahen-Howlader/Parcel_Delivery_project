import { model, Schema } from "mongoose";
import { IParcel, ParcelStatusEnum } from "./parcel.interface";

const StatusLogSchema = new Schema(
  {
    status: {
      type: String,
      enum: Object.values(ParcelStatusEnum),
      required: true
    },
    timestamp: { type: Date, default: Date.now }
  },
  { _id: false }
);

const ParcelSchema = new Schema<IParcel>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      required: true
    },
    weight: { type: Number, required: true, min: 0.1 },
    address: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    fee: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: Object.values(ParcelStatusEnum),
      default: ParcelStatusEnum.PENDING
    },
    statusLog: {
      type: [StatusLogSchema],
      default: [{ status: ParcelStatusEnum.PENDING }]
    }
  },
  { timestamps: true }
);


export const Parcel = model<IParcel>("Parcel", ParcelSchema);
