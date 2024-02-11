import  express  from "express";
import { signup,login,googleLogin, signOutUser} from "../controllers/auth.controller.js";
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login)
router.post('/google',googleLogin)
router.get("/signout",signOutUser);
  export default router;

  