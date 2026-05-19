import { getPrediction } from "@/api/api";
import { ImageStatus, type IImageData } from "@/shared/types/image";
import { useCallback } from "react";

export const useImagesProcessing = () => {
  const processImages = useCallback(async (images: IImageData[]) => {
    const results = await Promise.all(
      images
        .filter((image) => image.status === ImageStatus.UPLOADED)
        .map(async (image) => {
          try {
            const predictions = await getPrediction(image);
            return {
              ...image,
              predictions,
              status: ImageStatus.PROCESSED,
            } as IImageData;
          } catch (e) {
            console.log(e);
            return {
              ...image,
              status: ImageStatus.ERROR,
            } as IImageData;
          }
        }),
    );
    return results;
  }, []);

  return { processImages };
};
