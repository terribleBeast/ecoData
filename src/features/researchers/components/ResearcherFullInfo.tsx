import { ListItemButton, List, Card, Typography } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import type { IChapterData } from "@/shared/types";
import type { ISelectedResearcher } from "../types";
import { Link as RouterLink } from "react-router";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";

export const ResearcherFullInfo = ({
  researcher,
}: {
  researcher: ISelectedResearcher;
}) => {
  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        {
          name: "Фамилия",
          value: researcher.surname,
        },
        {
          name: "Имя",
          value: researcher.name,
        },
        {
          name: "Отчество",
          value: researcher.patronymic,
        },
        {
          name: "Должность",
          value: researcher.job,
        },
      ],
    },
    {
      title: "Контактная информация",
      fields: [
        {
          name: "e-mail",
          value: researcher.email,
        },
        {
          name: "Телефон",
          value: researcher.phoneNumber,
        },
      ],
    },
  ];
  const hasResearches = researcher.researches.length > 0;
  return (
    <DialogPanel>
      <DialogSection title={"Исследования"}>
        <Card sx={{ overflowY: "auto", maxHeight: "60vh" }}>
          {hasResearches ? (
            <List>
              {researcher.researches.map((item, index) => (
                <ListItemButton
                  component={RouterLink}
                  to={`/researches/${item.id}`}
                  key={index}
                >
                  <Typography>
                    {index + 1}.&nbsp;{item.title}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography
              sx={{
                padding: "1rem",
                color: "text.secondary",
                fontStyle: "italic",
              }}
            >
              Исследователь пока не участвует ни в одном исследовании
            </Typography>
          )}
        </Card>
      </DialogSection>
      <DialogSection title="Профиль исследователя">
        <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
      </DialogSection>
    </DialogPanel>
  );
};
