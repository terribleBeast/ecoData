export const ImageStatus = {
  LOADING: "Загрузка",
  UPLOADED: "Загружен",
  PROCESSING: "В обработке",
  PROCESSED: "Обработан",
  ERROR: "Ошибка",
  UNKNOWN: "Неизвестно",
} as const;

export type ImageStatus = (typeof ImageStatus)[keyof typeof ImageStatus];
export interface IPrediction {
  classifier: string;
  probability: number;
}
export interface IImageData {
  id: number;
  key: string;
  src: string | undefined;
  file: File;
  name: string;
  predictions?: IPrediction[];
  status: ImageStatus;
  classifier: string;
}
