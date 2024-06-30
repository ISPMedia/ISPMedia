import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenFromCookie = req.cookies["access_token"];
  const { authorization } = req.headers;

  if (!tokenFromCookie && !authorization) {
    return res.status(401).send({ message: "Authentication is required" });
  }
  
  let token;

  // Se o token estiver no header, extrai o token
  if (authorization) {
    const [type, tokenValue] = authorization.split(" ");
    if (type !== "Bearer") {
      return res.status(401).send({ message: "Invalid token format" });
    }
    token = tokenValue;
  }

  // Usa o token do cookie se não houver token no header
  if (!token) {
    token = tokenFromCookie;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
  } catch (error) {
    res.status(500).send(error);
  }
  next();
}
