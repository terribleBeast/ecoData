import axios from "axios";
import type { IImageData } from "../shared/types/image";
import type { ITableData } from "../components/pages/Researches";
const port = "8000";
const host = `http://localhost:${port}/api/v1`;

export async function getPrediction(image: IImageData) {
  const formData = new FormData();
  formData.append("image", image.file, image.name);

  const response = await axios
    .post(`${host}/neural-models/predictions/Яблоня`, formData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
  console.log(response);
  return response;
}

// TODO: now we get data from csv file
export async function getResearchPrediction(
  researchId: number,
): Promise<ITableData> {
  const response = await axios
    .get(`${host}/research/${researchId}/predictions`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
  return response;
}

export async function getSpecies(genus: string) {
  const response = await axios
    .get(`${host}/plant/search/${genus}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
  return response;
}
// log levels for logging python lib
export const LevelLog = {
  INFO: 10,
  DEBUG: 20,
  ERROR: 30,
  WARNING: 40,
  CRITICAL: 50,
} as const;

export type LevelLog = (typeof LevelLog)[keyof typeof LevelLog];

export async function sendLogToServer(
  level: LevelLog,
  message: string,
  meta?: string,
) {
  try {
    await axios.post(`${host}/logs`, { level, message, meta });
  } catch (e) {
    console.log(e);
  }
}
