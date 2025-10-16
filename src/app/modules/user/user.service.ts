import AppError from "../../errorHelpers/appError";
import httpStatus from 'http-status-codes';
import { User } from "./user.model";

const allUser = async () => {
    const data = await User.find();
    return data;
};
const getSingleUser = async (id: string) => {
    const data = await User.findById(id);
    return data;
};

const blockedAndUnclockedUser = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // Toggle block/unblock
    user.isBlocked = !user.isBlocked;
    await user.save();
    return {
        message: user.isBlocked
            ? "User has been blocked successfully"
            : "User has been unblocked successfully",
        user,
    };
};

const deleteUser = async (id : string) => {
     const data = await User.findByIdAndDelete(id);
     return data;
};

export const userService = {
    allUser,
    getSingleUser,
    blockedAndUnclockedUser,
    deleteUser
}