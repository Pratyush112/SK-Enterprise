import express from "express";
import { getAllParts } from "../controllers/part.controller.js";

const router = express.Router();

// Route to get all parts
router.get("/", getAllParts);

export default router;