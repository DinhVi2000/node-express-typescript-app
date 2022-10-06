import * as express from "express";
import { Request, Response, NextFunction } from "express";

import { userRules } from "../rules";
import * as auth from "../controllers/auth-controller";

const authRouter = express.Router();

authRouter.route("/").get((req: any, res: any, next: any) => {
  res.json("ok");
});

authRouter.route("/register").post(userRules.forRegister, auth.register);
authRouter.route("/login").post(userRules.forLogin, auth.login);

export default authRouter;
