import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { classifiers } from "../../../entities";
import {
  ChapterContentTemplate,
  ChapterHeaderTemplate,
  ChapterInfoTemplate,
  PageChapter,
} from "../../Templates";

interface IChapterField {
  name: string;
  value: string;
}

export interface IChapterData {
  title: string;
  fields: IChapterField[] | React.ReactNode;
}

export const ClassifiersChapter = () => {
  const chaptersInfo: IChapterData[] = [];
  // const classifiers = [];
  // const [species, setSpecies] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(async () => {
  //   const response = await getSpecies("Яблоня");
  //   console.log(response);
  //   setSpecies(response.map((item) => item.species));

  //   setLoading(false);
  // }, []);
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
  // if (loading) return <div>Loading</div>;

  return (
    <PageChapter
      title={undefined}
      headerComponent={
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <ChapterHeaderTemplate chapterTitle={"Роды и сорта растений"} />
          <DropDownGenusMenu
            handleSelectClassifier={(classifier_index: number) =>
              setSelectedGenus([chaptersInfo[classifier_index]])
            }
          />
        </Box>
      }
    >
      <ChapterContentTemplate
        content={<ChapterInfoTemplate chaptersInfo={selectedGenus} />}
      />
    </PageChapter>
  );
};

export const DropDownGenusMenu = ({
  handleSelectClassifier,
}: {
  handleSelectClassifier: (index: number) => void;
}) => {
  return (
    <FormControl style={{ minWidth: "15%" }}>
      <InputLabel>Род растения</InputLabel>
      <Select defaultValue={"Яблоня"}>
        {classifiers.map((item, index) => (
          <MenuItem
            key={index}
            value={item.plant}
            onClick={() => handleSelectClassifier(index)}
          >
            {item.plant}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
