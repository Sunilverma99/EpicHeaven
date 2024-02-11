import  express  from "express";
import { deleteUser, getListings,getAllListings, getListing, getuserInfo, user, userUpdate } from "../controllers/user.controller.js";
import { verifyToken } from "../utiles/verifyUser.js";
const router = express.Router();

router.get('/user', user);
router.post('/update/:id', verifyToken,userUpdate)
router.delete("/delete/:id",verifyToken,deleteUser)
router .get("/allListings/:id",verifyToken,getAllListings)
router.get("/listing/:id",getListing)
router.get("/get/listing/:id",getuserInfo)
router.get("/get/allListing",getListings)
  export default router;