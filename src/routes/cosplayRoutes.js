import express from "express";
import { getAllCosplays, getCosplayById, createCosplay } from "../controllers/cosplayControllers.js";

const router = express.Router();

router.get("/", getAllCosplays);
router.get("/:id", getCosplayById);
router.post("/", createCosplay);


export default router;