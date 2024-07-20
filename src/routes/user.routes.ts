import { Router, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { UserUseCase } from "../usecases/user.usecases";
import { validate_email } from "../utils/helpersFunctions";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { authenticate } from "../middlewares/authenticate";
const userRoutes: Router = Router();
const userUseCase = new UserUseCase();
const SALT_ROUNDS = 10;
userRoutes.post("/register", async (req: Request, res: Response) => {
  const { email, password, username, role } = req.body;

  if (!validate_email(email)) {
    return res.status(401).send({
      message: "Invalid Email!",
    });
  }

  let userExist = await userUseCase.findByEmail(email);
  if (userExist) {
    return res.status(401).send({
      message: "User already exists with this email",
    });
  }

  try {
    const data = await userUseCase.create({
      username,
      email,
      password: hashSync(password, SALT_ROUNDS),
      role: role === null ? "user" : role,
    });
    return res.status(201).send({ userId: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoutes.get(
  "/:userId",
  authenticate,
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await userUseCase.getById(userId);
      if (user === null) {
        return res.status(404).send({ message: "User not found!" });
      }

      return res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

userRoutes.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const user = await userUseCase.getAllUser();
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoutes.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!validate_email(email)) {
    return res.status(401).send({
      message: "Invalid Email!",
    });
  }

  let userExist = await userUseCase.findByEmail(email);
  const isMatch = userExist && compareSync(password, userExist.password);
  if (!userExist || !isMatch) {
    return res.status(401).send({
      message: "Invalid email or password",
    });
  }

  const payload = {
    id: userExist.id,
    email: userExist.email,
    username: userExist.username,
    role: userExist.role,
    createdAt: userExist.createdAt,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
    sameSite: "none",
  });
  return res.send({ accessToken: token, user: payload });
});

userRoutes.post(
  "/logout",
  authenticate,
  async (req: Request, res: Response) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.send({ message: "Logout successful" });
  }
);

userRoutes.put("/updaterole", authenticate, async (req: Request, res: Response) => {
  const { id, role } = req.body;

  const user = await userUseCase.getById(id);
      if (user === null) {
        return res.status(404).send({ message: "User not found!" });
      }

  try {
    const data = await userUseCase.updateUserRole(id, role);
    return res.status(201).send({ user: data });
  } catch (error) {
    res.status(500).send(error);
  }
});
export default userRoutes;
