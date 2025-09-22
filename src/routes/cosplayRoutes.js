import express from "express";
import { getAllCosplays, } from "../controllers/cosplayControllers.js";

const router = express.Router();

router.get("/", getAllCosplays);



export default router;