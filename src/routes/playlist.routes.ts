import { Router, Request, Response, response } from "express";
import { authenticate } from "../middlewares/authenticate";
import { PlaylistUseCase } from "../usecases/playlist.usecases";
import { PlaylistRepositoryPrisma } from "../repositories/playlist.repository";

const playlistRoutes: Router = Router();
const playlistUseCase = new PlaylistUseCase(new PlaylistRepositoryPrisma());

playlistRoutes.post("/", authenticate, async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const data = await playlistUseCase.create({
      name,
      userId: req.user.id,
    });
    return res.status(201).send({ plalistId: data });
  } catch (error) {
    return res.status(500).send(error);
  }
});

playlistRoutes.get(
  "/:id",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const existPlaylist = await playlistUseCase.getPlaylistById(id);
    if (!existPlaylist) {
      return res.status(404).send({
        message: "Playlist not found!",
      });
    }
    try {
      return res.status(200).send({ playlist: existPlaylist });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

playlistRoutes.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const playlists = await playlistUseCase.getAllPlaylist();
    return res.status(200).json(playlists);
  } catch (error) {
    return res.status(500).send(error);
  }
});

playlistRoutes.delete(
  "/:id",
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const existPlaylist = await playlistUseCase.getPlaylistById(id);
    if (!existPlaylist) {
      return res.status(404).send({
        message: "Playlist not found!",
      });
    }
    try {
      await playlistUseCase.delete(id);
      return res.status(200).send({ message: "Playlist successfully deleted" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

playlistRoutes.put("/", authenticate, async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).send(error);
  }
});

playlistRoutes.post(
  "/add-music",
  authenticate,
  async (req: Request, res: Response) => {
    const { playlistId, musicId } = req.body;
    if (!playlistId || !musicId) {
      return res
        .status(400)
        .json({ error: "Playlist ID and Music ID are required" });
    }
    try {
      await playlistUseCase.addMusicToPlaylist(musicId, playlistId);
      res.status(200).json({ message: "Music added to playlist" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

playlistRoutes.post(
  "/remove-music",
  authenticate,
  async (req: Request, res: Response) => {
    const { playlistId, musicId } = req.body;
    if (!playlistId || !musicId) {
      return res
        .status(400)
        .json({ error: "Playlist ID and Music ID are required" });
    }
    try {
      await playlistUseCase.removeMusicFromPlaylist(playlistId, musicId);
      res.status(200).json({ message: "Music removed from playlist" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

export default playlistRoutes;
