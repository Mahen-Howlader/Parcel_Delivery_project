import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { controllerUser } from "./user.controller";
const router = Router();


router.get("/", checkAuth(Role.ADMIN), controllerUser.allUser)
router.get("/:id", checkAuth(Role.ADMIN), controllerUser.getSingleUser)
router.patch("/block/:id", checkAuth(Role.ADMIN), controllerUser.blockedAndUnclockedUser)
router.delete("/:id", checkAuth(Role.ADMIN), controllerUser.deleteUser)

// userRouter.post("/all-user")
export const userRouter = router;