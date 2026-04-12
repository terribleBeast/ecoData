export function getImages() {
  let images = [
    "test_images/Image_1002 (1).jpg",
    "test_images/Image_1002.jpg",
    "test_images/beast.jpg",
    "test_images/Image_954.jpg",
  ];

  return images;
}

export function getPrediction(image) {
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
  return predictions[Math.floor(Math.random() * predictions.length)];
}
