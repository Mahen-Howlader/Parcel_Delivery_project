import { Router } from "express";
import { authRouter } from "../app/modules/atuh/auth.route";
import { userRouter } from "../app/modules/user/user.router";
import { parcelRouter } from "../app/modules/parcel/parcel.route";

export const router = Router();

const moduleRouter = [
    {
        path: "/auth",
        router: authRouter
    },
    {
        path: "/users",
        router: userRouter
    },
    {
        path: "/parcels",
        router: parcelRouter
    },
];

moduleRouter.forEach((route) => {
    router.use(route.path, route.router)
})