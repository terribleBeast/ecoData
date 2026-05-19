import { Typography, Box, ListItemButton, List, Link } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useState } from "react";
import { getMockResearchers, getMockResearches } from "@/mock_data";
import type { IResearcherData } from "@/shared/types/researcher";
import type { IResearchData } from "@/shared/types/research";

const ResearchItem = (research_id: number) => {
  return (

        <ListItemButton key={index} href={`/researches?research_id=${item}`}>
          {index + 1}.&nbsp;<Link>{researchesData[item].title}</Link>
    </ListItemButton>

  );
};

const ResearchesList = (researches_id: number[]) => {


}

export const ResearchersTable = ({
  data,
  setSelectedResearcher,
}: {
  data: IResearcherData[];
  setSelectedResearcher: (researcher: IResearcherData) => void;
}) => {
  // const [researchesData, setResearcherData] = useState(getMockResearches());

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
<ResearchItem res/>
            )
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
