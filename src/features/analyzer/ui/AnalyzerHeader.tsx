import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const AnalyzerHeader = ({
  handleProcessImages,
  isFileMenuOpen,
  toggleFileMenu,
  handleDownloadResult,
}: {
  handleDownloadResult: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleProcessImages: () => void;
  isFileMenuOpen: boolean;
  toggleFileMenu: () => void;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <ChapterHeaderTemplate title="Изображения" />
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Button color="success" variant="contained" onClick={toggleFileMenu}>
        <Typography>{isFileMenuOpen ? "Закрыть" : "Добавить"}</Typography>
      </Button>
      <Button color="success" variant="contained" onClick={handleProcessImages}>
        <Typography>Обработать</Typography>
      </Button>
      <Button
        href=""
        color="success"
        variant="contained"
        onClick={handleDownloadResult}
      >
        <Typography>Выгрузить</Typography>
      </Button>
    </Box>
  </Box>
);
