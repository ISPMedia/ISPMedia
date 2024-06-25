import { randomInt } from "crypto";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export function immediate_editor_privileges_notification() {}

export const compress_media = async (inputPath: string, outputPath: string) => {
  const videoCodec = "libx264";
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec(videoCodec)
      .outputOptions("-preset fast")
      .save(outputPath)
      .on("end", () => {
        console.log("Video encoding complete.");
        resolve(outputPath);
      })
      .on("error", (err) => reject(err));
  });
};

export function decompress_media(mediaId: string) {}

export function validate_email(email: string): boolean {
  const baseYear = 2012;
  const currentYear = new Date().getFullYear();
  const regex = /^(\d{4})(\d{4})@isptec\.co\.ao$/;
  const match = email.match(regex)!;

  if (!match) {
    return false;
  }

  const registrationYear = parseInt(match[1], 10);
  if (registrationYear < baseYear || registrationYear > currentYear) {
    return false;
  }

  return true;
}

export const replacer = (key: string, value: any): any => {
  return typeof value === "bigint" ? value.toString() : value;
};

export const generateSecureConfirmationCode = () => {
  const code = randomInt(100000, 1000000); // randomInt generates a random integer in the range [min, max)
  return code.toString();
};

export const deleteFile = (filePath: string) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
};
