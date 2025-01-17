import { Router } from 'express';

import { addUser, getUserById, getUsers, giveLike, login, getDemo } from "./controllers.js"
import { isAuthenticated } from '../tools/helpers.js';

const router = Router();

router.get("/", isAuthenticated, getUsers)
router.get("/demo", getDemo)
router.get("/:id", isAuthenticated, getUserById)

router.post("/", addUser)
router.post("/login", login)
router.post("/:id/like", isAuthenticated, giveLike)

export default router;
