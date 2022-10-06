import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ExtendRequest } from "../helper/express-extend";
import { auth } from "../middlewares/auth-middleware";
import { UserAddModel } from "../models/schemas/user";
import { UserService } from "../services/user.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate data
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = req.body as UserAddModel;

    const u = await UserService.register(payload);
    res.send(u);
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const data: any = await UserService.login(req.body.email, res);
    req.decodedToken = await UserService.verifyToken(data.token);

    res.send(data);
  } catch (e) {
    next(e);
  }
};
