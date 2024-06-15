import { Request, Response } from "express";
import multer, { FileFilterCallback, MulterError } from "multer";
import { extname, resolve } from "path";

const createMulterConfig = (
  destinationPath: string,
  allowedMimeTypes: string[]
) => {
  return {
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname);
        error.message = `The file should be one of the following types: ${allowedMimeTypes.join(
          ", "
        )}`;
        return cb(error);
      }

      return cb(null, true);
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, resolve(destinationPath));
      },
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() +
          "-" +
          Math.round(Math.random() * 1e9) +
          extname(file.originalname);
        cb(null, uniqueSuffix);
      },
    }),
  };
};

export default createMulterConfig;
