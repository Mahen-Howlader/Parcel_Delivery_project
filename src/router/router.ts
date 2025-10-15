import { Router } from "express";
import { userRouter } from "../app/modules/user/user.router";

export const router = Router();

const moduleRouter = [
    {
        path: "/user",
        router: userRouter
    },
];

moduleRouter.forEach((route) => {
    router.use(route.path, route.router)
})