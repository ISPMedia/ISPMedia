import { Router, Request, Response, response } from "express";
import { authenticate } from "../middlewares/authenticate";
import { RadioUseCase } from "../usecases/radio.usecases";
import { RadioRepositoryPrisma } from "../repositories/radio.repository";
import { RadioResponse } from "../interfaces/radio.interface";

const radioRouter: Router = Router();
const radioUseCase = new RadioUseCase(new RadioRepositoryPrisma());

radioRouter.post("/", async (req: Request, res: Response) => {
  const { name, country, freq, url } = req.body;
  try {
    const data = await radioUseCase.create({ name, country, freq, url });
    return res.status(201).send({ radioId: data });
  } catch (error) {
    return res.status(500).send(error);
  }
});

radioRouter.get("/", async (req: Request, res: Response) => {
  try {
    const radios = await radioUseCase.getAllRadio();
    return res.status(200).json(radios);
  } catch (error) {
    return res.status(500).send(error);
  }
});

radioRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existRadio = await radioUseCase.getRadioById(Number(id));
    if (!existRadio) {
      return res.status(404).send({
        message: "Radio not found!",
      });
    }
    return res.status(200).send({ radio: existRadio });
  } catch (error) {
    return res.status(500).send(error);
  }
});

radioRouter.delete(
  "/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const existRadio = await radioUseCase.getRadioById(Number(id));
    if (!existRadio) {
      return res.status(404).send({
        message: "Radio not found!",
      });
    }

    try {
      await radioUseCase.delete(Number(id));
      return res.status(200).send({ message: "Radio successfully deleted" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

radioRouter.post("/", authenticate, async (req: Request, res: Response) => {});
export default radioRouter;
