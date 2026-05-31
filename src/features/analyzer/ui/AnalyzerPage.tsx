import { Box, Dialog } from "@mui/material";
import { useAnalyzerPage } from "../hooks/useAnalyzerPage";
import { exportImagesToCsv } from "../utils";
import { ImageStatus } from "@/shared/types/image";
import {
  FileDragAndDrop,
  ImageFullInfo,
  ImagesContainer,
  ClassifiersChapter,
  ClassifierMenu,
} from "../components";
import { PageChapter } from "@/shared/ui/layout/PageChapter";
import { AnalyzerHeader } from "./AnalyzerHeader";

const AnalyzerPage = () => {
  const {
    images,
    isFileMenuOpen,
    selectedImage,
    selectedClassifier,
    addImages,
    deleteImage,
    updateImageStatus,
    handleSelectClassifier,
    toggleFileMenu,
    openImageFullInfo,
    closeImageFullInfo,
    handleProcessImages,
  } = useAnalyzerPage();

  const handleDownloadResult = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    exportImagesToCsv(images);
  };

  return (
    <>
      <Dialog
        open={selectedImage !== null}
        onClose={closeImageFullInfo}
        fullWidth
        maxWidth="xl"
      >
        {selectedImage && <ImageFullInfo image={selectedImage} />}
      </Dialog>

      <ClassifiersChapter />

      <PageChapter
        header={{
          component: (
            <AnalyzerHeader
              handleDownloadResult={handleDownloadResult}
              handleProcessImages={handleProcessImages}
              isFileMenuOpen={isFileMenuOpen}
              toggleFileMenu={toggleFileMenu}
            />
          ),
        }}
      >
        {isFileMenuOpen && (
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "80%" }}>
              <FileDragAndDrop
                onImagesAdded={addImages}
                defaultStatus={ImageStatus.LOADING}
                selectedClassifier={selectedClassifier}
              />
            </Box>
            <Box sx={{ display: "flex", width: "20%" }}>
              <ClassifierMenu onSelect={handleSelectClassifier} />
            </Box>
          </Box>
        )}
        <ImagesContainer
          images={images}
          onOpen={openImageFullInfo}
          onDelete={deleteImage}
          onUpdate={updateImageStatus}
        />
      </PageChapter>
    </>
  );
};

export default AnalyzerPage;
