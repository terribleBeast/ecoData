export function getMockImages(defaultStatus) {
  let images = [
    "test_images/Image_1002 (1).jpg",
    "test_images/Image_1002.jpg",
    "test_images/beast.jpg",
    undefined,
  ];
  var imagesObjects = [];
  for (let i = 0; i < 1; i++) {
    images.forEach((image) => {
      imagesObjects.push({
        src: image,
        name: image,
        key: image + i.toString(),
        predictions: null,
        status: defaultStatus,
        selectedClassifier: "Яблоня",
      });
    });
  }
  return imagesObjects;
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
