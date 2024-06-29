import { Request, Response } from "express";

type UserPayload = {
  id: string;
  /*email: string;
  username: string;
  role: string;
  createdAt: Date;*/
};

declare global{
    namespace Express{
        export interface Request{
            user: UserPayload
        }
    }
}