import { Router, Request, Response } from "express";
import multer from "multer";
import createMulterConfig from "../utils/multerConfig";
import { authenticate } from "../middlewares/authenticate";
import { MusicUseCase } from "../usecases/music.usecases";
import fs from "fs";
import path, { resolve } from "path";

const upload = multer(
  createMulterConfig(resolve(__dirname, "..", "..", "uploads/music"), [
    "audio/mp3",
    "audio/mpeg",
  ])
).single("file");
const musicRoutes: Router = Router();
const musicUsecase = new MusicUseCase();

musicRoutes.post("/uploads", authenticate, (req: Request, res: Response) => {
  return upload(req, res, async (error) => {
    if (!req.file) {
      return res.status(400).json({ message: error.message });
    }

    const {
      title,
      description,
      lyrics,
      publisher,
      composer,
      genreId,
      albumId,
      artist,
    } = req.body;
    const data = await musicUsecase.create({
      title,
      description,
      lyrics,
      publisher,
      composer,
      genreId,
      userId: req.user.id,
      albumId,
      artist,
      path: req.file.path,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
    });
    return res
      .status(201)
      .send({ MusicId: data, message: "File uploaded successfully" });
  });
});

musicRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const musics = await musicUsecase.getAllMusic();
    return res.status(200).json(musics);
  } catch (error) {
    res.status(500).send(error);
  }
});

musicRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const music = await musicUsecase.getMusicById(id);
    if (!music) {
      return res.status(404).send({ message: "Music not found!" });
    }
    return res.status(200).send(music);
  } catch (error) {
    res.status(500).send(error);
  }
});

musicRoutes.get("/play/:musicId", async (req: Request, res: Response) => {
  const range = req.headers.range;
    const { musicId } = req.params;
    try {
      const music = await musicUsecase.getMusicById(musicId);
      if (!music) {
        return res.status(404).send({
          message: "Video not found!",
        });
      }
      const musicPath = resolve(music.path);
      //return fs.readFileSync(musicPath)
      return res.sendFile(musicPath);
     /* const musicSize = fs.statSync(musicPath).size;

      if (!range) {
        return res.status(400).send("Range header is required");
      }

      // Parse Range
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, musicSize - 1);

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${musicSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": `${music.mimetype}`,
      };
      res.writeHead(206, headers);

      // create read stream for the part of the music
      const musicStream = fs.createReadStream(musicPath, { start, end });
      musicStream.pipe(res);*/
    } catch (error) {
      res.status(500).send(error);
    }
});

musicRoutes.delete("/:musicId", async (req: Request, res: Response) => {
  const { musicId } = req.params;

  const existMusic = await musicUsecase.getMusicById(musicId);
  if (!existMusic) {
    return res.status(404).send({
      message: "Music not found!",
    });
  }
  try {
    await musicUsecase.delete(musicId);
    res.status(200).json({ message: "Music successfully deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

musicRoutes.put("/:musicId", async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({ message: "Missing music id" });
  }
});

export default musicRoutes;
