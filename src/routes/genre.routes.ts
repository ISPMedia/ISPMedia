import { Router, Request, Response } from "express";
import { authenticate } from "../middlewares/authenticate";
import { GenreUseCase } from "../usecases/genre.usecases";
import { GenreRepositoryPrisma } from "../repositories/genre.repository";

const genreRoutes: Router = Router();
const genreUseCase = new GenreUseCase(new GenreRepositoryPrisma());

genreRoutes.post("/", authenticate, async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const data = await genreUseCase.create(name);
    return res.status(201).send({ genreId: data });
  } catch (error) {
    return res.status(500).send(error);
  }
});
genreRoutes.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const genres = await genreUseCase.getAllGenre();
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).send(error);
  }
});
genreRoutes.get("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existGenre = await genreUseCase.getGenreById(id);
    if (!existGenre) {
      return res.status(404).send({
        message: "Genre not found!",
      });
    }
    return res.status(200).send({ genre: existGenre });
  } catch (error) {
    return res.status(500).send(error);
  }
});
genreRoutes.delete(
  "/:id",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const existGenre = await genreUseCase.getGenreById(id);
    if (!existGenre) {
      return res.status(404).send({
        message: "Genre not found!",
      });
    }
    try {
      await genreUseCase.delete(id);
      return res.status(200).send({ message: "Album successfully deleted" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);
genreRoutes.put(
  "/:id",
  authenticate,
  async (req: Request, res: Response) => {}
);

export default genreRoutes;
