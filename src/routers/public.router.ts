import express from "express";
import { allData, gradeBased, usernnameBased, jobData, memo, postMemo, privateMessage } from "../controllers/public.controller";

const publicRouter = express.Router();

// get
publicRouter.get("/student", allData);
publicRouter.get("/student/grade/:grade", gradeBased);
publicRouter.get("/student/user/:username", usernnameBased);
publicRouter.get("/job", jobData);
publicRouter.get("/memo", memo);

// post
publicRouter.post("/memo", postMemo);
publicRouter.post("/message/:userId", privateMessage);


export default publicRouter