import { Request } from "express";

export interface ExtendRequest extends Request {
  decodedToken?: any;
  // checksum?: Checksum
}
