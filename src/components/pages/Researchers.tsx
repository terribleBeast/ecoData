import {
  Typography,
  Box,
  Dialog,
  ListItemButton,
  List,
  Link,
  Card,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useState } from "react";
import { getMockResearchers, getMockResearches } from "../../mock_data";
import { ChapterInfoTemplate, DialogChapters, PageChapter } from "../Templates";
import { DialogPanel } from "../DialogPanel";
import type { IResearchData } from "../../Models/Research";
import type { IResearcherData } from "../../Models/Researcher";
import type { IChapterData } from "./Analyzator/components";

const ResearcherFullInfo = ({
  researcher,
  researches,
}: {
  researcher: IResearcherData;
  researches: IResearchData[];
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

const ResearchersTable = ({
  setSelectedResearcher,
}: {
  setSelectedResearcher: (researcher: IResearcherData) => void;
}) => {
  const [data, setData] = useState(getMockResearchers());
  const [researchesData, setResearcherData] = useState(getMockResearches());

  const columns: MRT_ColumnDef<IResearcherData>[] = [
    {
      accessorKey: "id",
      header: "№",
      accessorFn: (dataRow) => dataRow.id + 1,
      minSize: 50,
      size: 70,
      maxSize: 100,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "fullName",
      header: "ФИО",
      Cell: ({ row }) => (
        <Typography
          onClick={() => setSelectedResearcher(row.original)}
          sx={{ cursor: "pointer" }}
        >
          {row.original.surname} {row.original.name[0]}.{" "}
          {row.original.patronymic[0]}.
        </Typography>
      ),
    },
    {
      accessorKey: "email",
      header: "e-mail",
    },
    {
      accessorKey: "role",
      header: "Статус",
    },
    {
      accessorKey: "job",
      header: "Работа",
    },
    {
      accessorKey: "researches",
      header: "Исследования",
      Cell: ({ row }) => (
        <Box sx={{ overflowY: "auto", maxHeight: "20vh" }}>
          <List>
            {row.original.researches_id.map((item, index) => (
              <ListItemButton
                key={index}
                href={`/researches?research_id=${researchesData[item].id}`}
              >
                {index + 1}.&nbsp;<Link>{researchesData[item].title}</Link>
              </ListItemButton>
            ))}
          </List>
        </Box>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
  });
  console.log("Table");
  return <MaterialReactTable table={table} />;
};

const Researchers = () => {
  const [selectedResearcher, setSelectedResearcher] =
    useState<IResearcherData | null>(null);

  return (
    <>
      <Dialog
        open={selectedResearcher !== null}
        onClose={() => {
          setSelectedResearcher(null);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedResearcher !== null && (
          <ResearcherFullInfo
            researcher={selectedResearcher}
            researches={getMockResearches()}
          />
        )}
      </Dialog>
      <PageChapter title="Таблица исследователей">
        <ResearchersTable setSelectedResearcher={setSelectedResearcher} />
      </PageChapter>
    </>
  );
};

export default Researchers;
