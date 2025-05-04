import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.mjs";
import { getProfile } from "../controllers/profileController.mjs";

const router = Router();

router.get("/", authenticate, getProfile);

export default router;
