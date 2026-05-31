import { Box } from "@mui/material";
import { useState } from "react";
import { PageChapter } from "@/shared/ui/layout";
import { classifiers, type IChapterData } from "@/shared/types";
import { ClassifierDropdown } from "./ClassifierDropdown";
import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";

export const ClassifiersChapter = () => {
  const chaptersInfo: IChapterData[] = [];
  for (let i = 0; i < classifiers.length; i++) {
    chaptersInfo.push({
      title: classifiers[i].plant,
      fields: [
        {
          name: "Сорта",
          value: classifiers[i].varieties.join(", "),
        },
      ],
    });
  }
  const [selectedGenus, setSelectedGenus] = useState([chaptersInfo[0]]);

  return (
    <PageChapter
      header={{
        component: (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ChapterHeaderTemplate title={"Роды и сорта растений"} />
            <ClassifierDropdown
              onSelect={(classifier_index: number) =>
                setSelectedGenus([chaptersInfo[classifier_index]])
              }
            />
          </Box>
        ),
      }}
    >
      <Box>
        <ChapterInfoTemplate chaptersInfo={selectedGenus} />
      </Box>
    </PageChapter>
  );
};
