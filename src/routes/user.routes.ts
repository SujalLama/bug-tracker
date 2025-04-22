import { Router } from "express";
import { register, login, getUsers } from "../controllers/user.controller";
import { authenticateUser } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorization";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticateUser, authorizeRoles("ADMIN"), getUsers);

export default router;
