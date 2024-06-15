import { Router, Request, Response } from "express";
import { GroupUseCase } from "../usecases/group.usecases";
import { authenticate } from "../middlewares/authenticate";
const groupRoutes: Router = Router();
const groupUseCase = new GroupUseCase();

groupRoutes.post("/", authenticate, async (req: Request, res: Response) => {
  const { name, description, visibility } = req.body;
  try {
    const data = await groupUseCase.create({
      name,
      description,
      visibility,
      owner: req.user.id,
    });

    return res.status(201).send({ groupId: data });
  } catch (error) {
    return res.status(500).send(error);
  }
});

groupRoutes.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const data = await groupUseCase.getAllGroup();
    return res.status(200).send({ groups: data });
  } catch (error) {
    console.error(error)
    return res.status(500).send(error);
  }
});

groupRoutes.get(
  "/:groupId",
  authenticate,
  async (req: Request, res: Response) => {
    const { groupId } = req.params;

    if (groupId == null) {
      return res.status(401).send({ message: "Missing id" });
    }

    try {
      const group = await groupUseCase.getGroupById(groupId);
      if (group == null) {
        return res.status(404).send({ message: "Group not found!" });
      }
      return res.status(200).send(group);
    } catch (error) {
      console.error(error)
      return res.status(500).send(error);
    }
  }
);

groupRoutes.post(
  "/addmembers",
  authenticate,
  async (req: Request, res: Response) => {
    const { user, group, role } = req.body;

    try {
      await groupUseCase.addMemberInGroup({
        userId: user,
        groupId: group,
        role,
      });
      return res.status(200).send({ message: "User added successfull" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

groupRoutes.post(
  "/removemembers",
  authenticate,
  async (req: Request, res: Response) => {
    const { user, group } = req.body;

    try {
      await groupUseCase.removeMemberInGroup(user, group);
      return res
        .status(200)
        .send({ message: "Member removed from group successfully" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

export default groupRoutes;
