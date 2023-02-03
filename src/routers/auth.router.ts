import express from "express";
import {login} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/user/login", login);
authRouter.post("/admin/login", login)


export default authRouter;
