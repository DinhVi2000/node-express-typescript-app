import * as express from "express";
import { Request, Response, NextFunction } from "express";

import { userRules } from "../rules";
import { UserService } from "../services/user.service";

import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";
import { User, UserAddModel, UserViewModel } from "../models/schemas/user";

const authRouter = express.Router();

authRouter.route("/").get((req: any, res: any, next: any) => {
  res.json("ok");
});

authRouter
  .route("/register")
  .post(
    userRules.forRegister,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json(errors.array());

        const payload = req.body as UserAddModel;

        const u = await UserService.register(payload);
        res.send(u);
      } catch (e) {
        next(e);
      }
    }
  );

authRouter
  .route("/login")
  .post(
    userRules.forLogin,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json(errors.array());

        const data = await UserService.login(req.body.email, res);
        res.send(data);
      } catch (e) {
        next(e);
      }
    }
  );

export default authRouter;
