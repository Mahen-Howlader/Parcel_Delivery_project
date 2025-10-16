import { model, Schema } from "mongoose";
import { IUser, Role } from "../user/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Role,
      default: Role.SENDER
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);


export const User = model<IUser>("User", userSchema);