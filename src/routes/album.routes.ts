import { Router, Request, Response } from "express";
import { AlbumUseCase } from "../usecases/album.usecases";
import { authenticate } from "../middlewares/authenticate";
 
const albumRoutes: Router = Router();
const albumUseCase = new AlbumUseCase();

albumRoutes.post("/", authenticate, async (req: Request, res: Response) => {
  const { title, release_date, artist } = req.body;
  try {
    const data = await albumUseCase.create({
      title,
      release_date,
      artist,
      userId: req.user.id,
    });
    return res.status(201).send({ albumId: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

albumRoutes.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const data = await albumUseCase.getAllAlbum();
    return res.status(200).send({ albums: data });
  } catch (error) {
    return res.status(500).send(error);
  }
});

albumRoutes.get("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const existAlbum = await albumUseCase.getAlbumById(id);
  if (!existAlbum) {
    return res.status(404).send({
      message: "Album not found!",
    });
  }
  try {
    const album = await albumUseCase.getAlbumById(id);
    return res.status(200).json(album);
  } catch (error) {
    return res.status(500).send(error);
  }
});

albumRoutes.put("/", authenticate, async (req: Request, res: Response) => {});

albumRoutes.delete(
  "/:id",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const existAlbum = await albumUseCase.getAlbumById(id);
    if (!existAlbum) {
      return res.status(404).send({
        message: "Album not found!",
      });
    }
    try {
      await albumUseCase.delete(id);
      res.status(200).json({ message: "Album successfully deleted" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

export default albumRoutes;
