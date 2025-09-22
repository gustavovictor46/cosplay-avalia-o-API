import express from "express";
import { getAllCosplays, getCosplayById, createCosplay, deleteCosplay, updateCosplay } from "../controllers/cosplayControllers.js";

const router = express.Router();

router.get("/", getAllCosplays);
router.get("/:id", getCosplayById);
router.post("/", createCosplay);
router.delete("/:id", deleteCosplay);
router.put("/:id", updateCosplay);


export default router;