import express from "express"
import { getAllUsers, login, signUp } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/all", getAllUsers)
router.post("/signup", signUp)
router.post("/login", login)

export default router;