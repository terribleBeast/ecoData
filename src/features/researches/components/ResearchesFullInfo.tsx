import { DialogPanel } from "@/shared/components";
import type { IChapterData } from "@/shared/types";
import { Box, Card, List, ListItemButton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { ResultTable } from "./PredictionResultTable";
import type { ISelectedResearch } from "../types";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";

export const ResearchFullInfo = ({
  research,
}: {
  research: ISelectedResearch;
}) => {
  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        { name: "Название", value: research.title },
        { name: "Цель", value: research.goal },
        { name: "Статус", value: research.status },
      ],
    },
    {
      title: "Участники",
      fields: (
        <Box sx={{ overflowY: "auto", maxHeight: "20vh" }}>
          {research.researchers.length > 0 ? (
            <List>
              {research.researchers.map((researcher) => (
                <ListItemButton
                  key={researcher.id}
                  component={RouterLink}
                  to={`/researchers?researcher_id=${researcher.id}`}
                >
                  <Typography>
                    {researcher.surname} {researcher.name[0]}.{" "}
                    {researcher.patronymic[0]}.
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography
              sx={{
                padding: "0.5rem",
                color: "text.secondary",
                fontStyle: "italic",
              }}
            >
              Нет участников
            </Typography>
          )}
        </Box>
      ),
    },
  ];

  return (
    <DialogPanel>
      <DialogSection title="Таблица результатов">
        <Card sx={{ overflowY: "auto", overflowX: "auto", maxHeight: "60vh" }}>
          <ResultTable data={research.results} isLoading={false} />
        </Card>
      </DialogSection>
      <DialogSection title="Данные об исследовании">
        <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
      </DialogSection>
    </DialogPanel>
  );
};
