import fs from "fs";
import path from "path";
import { Radio } from "../interfaces/radio.interface";

const dataFilePath = path.resolve(__dirname, "..", "data/radios.json");

export const loadRadios = () => {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
};

export const saveRadios = (radios: Radio[]) => {
  const data = JSON.stringify(radios, null, 2);
  fs.writeFileSync(dataFilePath, data, "utf-8");
};

export const radios: Radio[] = loadRadios();
