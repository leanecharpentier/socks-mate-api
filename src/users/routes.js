import { Router } from 'express';

import { addUser, getUserById, getUsers, login } from "./controllers.js"

const router = Router();

router.get("/", getUsers)
router.get("/:id", getUserById)

router.post("/", addUser)
router.post("/login", login)

export default router;
