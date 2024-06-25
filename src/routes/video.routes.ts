import { Router, Request, Response } from "express";
import multer from "multer";
import createMulterConfig from "../utils/multerConfig";
import { authenticate } from "../middlewares/authenticate";
import { compress_media, deleteFile } from "../utils/helpersFunctions";
import fs from "fs";
import path, { join, resolve } from "path";
import { VideoUseCase } from "../usecases/video.usecases";

const savePath = resolve(__dirname, "..", "..", "uploads/video");

const upload = multer(
  createMulterConfig(savePath, ["video/mp4", "video/mkv"])
).single("file");

const videoRoutes: Router = Router();
const videoUseCase = new VideoUseCase();

videoRoutes.post("/uploads", (req: Request, res: Response) => {
  return upload(req, res, async (error) => {
    if (!req.file) {
      return res.status(400).json({ message: error.message });
    }

    const { title, description } = req.body;
    const tempPath = req.file.path;
    const outputFileName = "compressed_" + req.file.filename;
    const outputPath = path.join(savePath, outputFileName);

    try {
      await compress_media(tempPath, outputPath);

      const videoData = resolve(outputPath);
      const videoSize = fs.statSync(videoData).size;

      const data = await videoUseCase.create({
        title,
        description,
        path: outputPath,
        filename: outputFileName,
        mimetype: req.file.mimetype,
        size: BigInt(videoSize),
        userId: req.user.id,
      });

      //remove temporary files
      await deleteFile(tempPath);

      return res
        .status(201)
        .send({ videoId: data, message: "File uploaded successfully" });
    } catch (error) {}
  });
});

videoRoutes.get("/play/:id", async (req: Request, res: Response) => {
  const range = req.headers.range;
  const { id } = req.params;
  try {
    const video = await videoUseCase.getVideoById(id);
    if (!video) {
      return res.status(404).send({
        message: "Video not found!",
      });
    }
    const videoPath = resolve(video.path);
    const videoSize = fs.statSync(videoPath).size;

    if (!range) {
      return res.status(400).send("Range header is required");
    }

    // Parse Range
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": `${video.mimetype}`,
    };
    res.writeHead(206, headers);

    // create read stream for the part of the video
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (error) {
    res.status(500).send(error);
  }
});

videoRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const video = await videoUseCase.getVideoById(id);
  if (!video) {
    return res.status(404).send({
      message: "Video not found!",
    });
  }
  try {
    return res.status(200).send(video);
  } catch (error) {
    res.status(500).send(error);
  }
});

videoRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const videos = await videoUseCase.getAllVideo();
    return res.status(200).send({ videos });
  } catch (error) {
    res.status(500).send(error);
  }
});

videoRoutes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const existVideo = await videoUseCase.getVideoById(id);
  if (!existVideo) {
    return res.status(404).send({
      message: "Video not found!",
    });
  }
  try {
    await videoUseCase.delete(id);
    res.status(200).json({ message: "Video successfully deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

videoRoutes.get("/download", async (req: Request, res: Response) => {
  try {
    const video = await videoUseCase.getVideoById(
      "ac4cfc7e-28c6-4441-898d-0873795b3874"
    );
    if (!video) {
      return res.status(404).send({
        message: "Video not found!",
      });
    }
    const videoPath = resolve(video.path);
    const videoSize = fs.statSync(videoPath).size;

    const headers = {
      "Content-Length": videoSize,
      "Content-Type": `${video.mimetype}`,
    };

    res.writeHead(200, headers);

    // create read stream for the video
    const videoStream = fs.createReadStream(videoPath);

    videoStream.pipe(res);

    // Ensure the stream ends properly
    videoStream.on("end", () => {
      res.end();
    });

    // Handle stream errors
    videoStream.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(500).send("An error occurred while streaming the video");
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default videoRoutes;
