import { ListItemButton, List, Link, Card } from "@mui/material";
import {
  ChapterInfoTemplate,
  DialogChapters,
} from "@/shared/components/Templates";
import { DialogPanel } from "@/shared/components/DialogPanel";
import type { IResearchDataFull } from "@/shared/types/research";
import type { IResearcherData } from "@/shared/types/researcher";
import type { IChapterData } from "@/shared/types";

export const ResearcherFullInfo = ({
  researcher,
  researches,
}: {
  researcher: IResearcherData;
  researches: IResearchDataFull[];
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
          value: researcher.phone,
        },
      ],
    },
  ];
  return (
    <DialogPanel>
      <DialogChapters title={"Исследования"}>
        <Card sx={{ overflowY: "auto", maxHeight: "60vh" }}>
          <List>
            {researcher.researches_id.map((item, index) => (
              <ListItemButton
                href={`/researches?research_id=${researches[item].id}`}
              >
                {index + 1}.&nbsp;
                <Link>{researches[researcher.researches_id[index]].title}</Link>
              </ListItemButton>
            ))}
          </List>
        </Card>
      </DialogChapters>
      <DialogChapters title="Профиль исследователя">
        <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
      </DialogChapters>
    </DialogPanel>
  );
};
