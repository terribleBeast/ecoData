import axios from "axios";

const port = "8000";
const host = `http://localhost:${port}`;

export async function getPrediction(image) {
  const response = await axios
    .post(`${host}/predictions`, image)
    .then((response) => {
      return response.data.predictions;
    })
    .catch((error) => console.error(error));
  return response;
}
