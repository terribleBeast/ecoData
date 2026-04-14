export function getImages() {
  let images = [
    "test_images/Image_1002 (1).jpg",
    "test_images/Image_1002.jpg",
    "test_images/beast.jpg",
    "test_images/Image_954.jpg",
  ];

  return images;
}
export function getMockStatus() {
  const statuses = {
    uploaded: "Загружен",
    processing: "В обработке",
    processed: "Обработан",
    error: "Ошибка",
  };

  const status =
    statuses[Math.floor(Math.random() * Object.keys(statuses).length)];
  return status;
}

export function getPredictions(image) {
  const statuses = [
    // uploaded: "Загружен",
    // processing: "В обработке",
    // processed: "Обработан",
    // error: "Ошибка",
    "В обработке",
    "Обработан",
    "Ошибка",
  ];

  const status = statuses[Math.floor(Math.random() * statuses.length)];
  image.status = status;
  if (status === "Обработан") {
    // Predictions for apple tries
    var predictions = [
      "Феникс Уральское",
      "Уральское наливное",
      "Сувенир Алтая",
      "Подарок садоводам",
      "Заветное",
      "Жебровское",
      "Жар-птица",
      "Алтайское румяное",
      "Алтайское зимнее",
      "Алтайская красавица",
    ];
    const predictionsMap = predictions.map((prediction) => ({
      classifier: prediction,
      probability: Math.random() * 100,
    }));
    return predictionsMap;
  } else return null;
}
