import axios from "axios";
import type { IImageData } from "../Models/Image";
import type { ITableData } from "../components/pages/Researches";
const port = "8000";
const host = `http://localhost:${port}`;

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
