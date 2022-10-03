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

    // console.log("this._saltRounds :", this._saltRounds);
    // return bcrypt.hash(password, this._saltRounds).then((hash) => {
    //   console.log("hash :", hash);
    //   return User.create({ email, password: hash }).then((u: any) =>
    //     this.getUserById(u!.id)
    //   );
    // });
  };

  static login = async (email: string, res: Response) => {
    let user = await User.findOne({
      where: { email },
      attributes: Attributes.user,
      include: [Includes.clazz],
    });
    if (!user) return res.send(ResponseCodes.user_not_found);

    return { user, token: jwt.sign({ id: user.id, email }, this._jwtSecret) };
  };

  //   verifyToken(token: string) {
  //     return new Promise((resolve, reject) => {
  //       jwt.verify(token, this._jwtSecret, (err, decoded) => {
  //         if (err) {
  //           resolve(false);
  //           return;
  //         }

  //         UserService._user = User.findOne({ id: decoded["id"] });
  //         resolve(true);
  //         return;
  //       });
  //     }) as Promise<boolean>;
  //   }

  static getUserById(id: number) {
    return User.findOne({ where: { id }, attributes: Attributes.user });
  }
}
