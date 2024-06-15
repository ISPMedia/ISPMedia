import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies["access_token"];
  if (!token) {
    return res.status(401).send({ message: "Authentication is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
  } catch (error) {
    res.status(500).send(error);
  }
  next();
}
