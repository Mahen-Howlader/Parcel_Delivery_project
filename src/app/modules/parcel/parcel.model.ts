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
      default: [{ status: ParcelStatusEnum.PENDING }],
    },
    trackingId: { type: String, unique: true }, 
    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);



ParcelSchema.pre("save", function (next) {
  if (!this.trackingId) {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, ""); // e.g. 20251017
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();

    this.trackingId = `TRK-${dateStr}-${randomStr}`;
  }
  next();
});


export const Parcel = model<IParcel>("Parcel", ParcelSchema);
