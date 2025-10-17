import { Router } from "express";
import { parcelController } from "./parcel.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { parcelSchema } from "./parcel.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

// Sender Routes
router.post("/", checkAuth(Role.SENDER), validateRequest(parcelSchema), parcelController.crateParcels)
router.get("/me", checkAuth(Role.SENDER),  parcelController.onlyAllSenderParcel);
router.patch("/cancel/:id", checkAuth(Role.SENDER),  parcelController.cancelParcel);
router.get("/:id/status-log", checkAuth(Role.SENDER),  parcelController.ParcelStatusHistory);

// Receiver Routes
router.get("/incoming", checkAuth(Role.RECEIVER),  parcelController.getIncomingParcel);
router.patch("/receive/:id", checkAuth(Role.RECEIVER),  parcelController.percelReciver);
router.get("/history", checkAuth(Role.RECEIVER),  parcelController.percelHistory);


// Admin Routes
router.get("/", checkAuth(Role.ADMIN), parcelController.getAllParcel);
router.get("/:id", checkAuth(Role.ADMIN), parcelController.getSingleParcel);
router.patch("/:id", checkAuth(Role.ADMIN), parcelController.parcelStatusUpdate);
router.patch("/block/:id", checkAuth(Role.ADMIN), parcelController.blockParcel);


// tracking Purcel
router.get("/track/:trackingId", parcelController.trackingParcel);

export const parcelRouter = router;



