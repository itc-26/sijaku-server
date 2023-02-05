import express from "express";
import {login} from "../controllers/auth.controller";
import { allData, gradeBased, usernnameBased, jobData } from "../controllers/public.controller";

const publicRouter = express.Router();

publicRouter.get("/student", allData);
publicRouter.get("/student/grade/:grade", gradeBased)
publicRouter.get("/student/user/:username", usernnameBased)
publicRouter.get("/job", jobData)

export default publicRouter