import express, {RequestHandler} from "express";
import {authenticate} from "../middlewares/auth.middleware";
import { strictBelongsTo } from "../middlewares/util.middleware";
import { me, post, get, edit } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/post/:type", authenticate as RequestHandler, strictBelongsTo , post);

userRouter.get("/me", authenticate as RequestHandler, me);
userRouter.get("/get/:type", authenticate as RequestHandler, get);

userRouter.put("/edit/:type/:id", authenticate as RequestHandler, strictBelongsTo ,edit);

export default userRouter;

