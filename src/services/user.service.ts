import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { Attributes, Includes } from "../models/includes";
import { User, UserAttributes, UserViewModel } from "../models/schemas/user";

import { ResponseCodes } from "../helper/response-codes";
import { Response } from "express";
import { Clazz } from "../models/schemas";

export class UserService {
  private static readonly _saltRounds = 12;
  private static readonly _jwtSecret = "0.rfyj3n9nzh";

  //   static get userAttributes() {
  //     return ["id", "email"];
  //   }

  private static _user: any;
  static get user() {
    return UserService._user;
  }

  static register = async (payload: UserAttributes) => {
    try {
      const hash = await bcrypt.hash(payload.password, this._saltRounds);
      const u = await User.create({ ...payload, password: hash });

      return u as UserViewModel;
    } catch (e) {
      throw e;
    }
  };

  static login = async (email: string, res: Response) => {
    let user = await User.findOne({
      where: { email },
      attributes: Attributes.user,
      include: [Includes.clazz],
    });
    if (!user) return res.send(ResponseCodes.user_not_found);

    return {
      user,
      token: jwt.sign({ user }, this._jwtSecret, {
        algorithm: "HS256",
      }),
    };
  };

  static verifyToken = async (token: string) => {
    try {
      return await jwt.verify(
        token,
        this._jwtSecret,
        async (err, decoded: any) => {
          if (err) return false;
          if (decoded) return decoded;
        }
      );
    } catch (e) {
      return false;
    }
  };

  static getUserById = async (id: number) => {
    return await User.findOne({ where: { id }, attributes: Attributes.user });
  };
}
