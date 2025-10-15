import { Router } from "express";
import { authRouter } from "../app/modules/atuh/auth.route";

export const router = Router();

const moduleRouter = [
    {
        path: "/auth",
        router: authRouter
    },
];

moduleRouter.forEach((route) => {
    router.use(route.path, route.router)
})