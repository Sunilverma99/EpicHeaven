import express from "express";
import { addListing, deleteListing, updateUserListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utiles/verifyUser.js";
const router = express.Router();

router.post('/createListing',addListing);
router.delete('/deleteListing/:id',verifyToken,deleteListing)
router.post("/updateListing/:id",verifyToken,updateUserListing)
export default router;