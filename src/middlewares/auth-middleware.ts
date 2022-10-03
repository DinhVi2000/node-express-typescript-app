import { NextFunction, Request, Response } from "express";
import { ErrorMessages, ResponseCodes } from "../helper/response-codes";
import { publicPaths } from "./public-path";

export const isPublicPath = (req: Request): boolean => {
  const path = `${req.method}@${req.path}`;
  const public_path = publicPaths.find((e) => e.match(path) !== null);
  if (public_path) return true;
  return false;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  let isPublic = isPublicPath(req);

  if (isPublic) {
    return next();
  }
  res.json({
    error: ResponseCodes[ResponseCodes.token_missing_or_invalid],
  });
};
