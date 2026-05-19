import { Typography, Box, ListItemButton, List, Link } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
} from "material-react-table";
import { useState } from "react";
import { getMockResearchers, getMockResearches } from "@/mock_data";
import type { IResearchDataFull } from "@/shared/types/research";

export const ResearchesTable = ({
  setSelectedResearch,
}: {
  setSelectedResearch: (research: IResearchDataFull) => void;
}) => {
  const [data, setData] = useState(getMockResearches());
  const [researchersData, setResearchersData] = useState(getMockResearchers());

  const columns: MRT_ColumnDef<IResearchDataFull>[] = [
    {
      accessorKey: "id",
      header: "№",
      accessorFn: (dataRow: MRT_RowData) => dataRow.id + 1,
      minSize: 50,
      size: 70,
      maxSize: 100,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "title",
      header: "Название",
      Cell: ({ row }) => (
        <Typography
          onClick={() => setSelectedResearch(row.original)}
          sx={{ cursor: "pointer" }}
        >
          {row.original.title}
        </Typography>
      ),
    },
    {
      accessorKey: "goal",
      header: "Цель",
    },
    {
      accessorKey: "startDate",
      header: "Дата начала",
      Cell: ({ row }) => row.original.startDate.toString(),
    },
    {
      accessorKey: "endDate",
      header: "Дата окончания",
      Cell: ({ row }) => row.original.endDate.toString(),
    },
    {
      accessorKey: "status",
      header: "Статус",
    },
    {
      accessorKey: "researchers_id",
      header: "Исследователи",
      Cell: ({ row }) => (
        <Box sx={{ overflowY: "auto", maxHeight: "20vh" }}>
          <List>
            {row.original.researchers_id.map((item, index) => (
              <ListItemButton
                key={index}
                href={`/researchers?researcher_id=${researchersData[item].id}`}
              >
                {index + 1}.&nbsp;
                <Link>
                  {researchersData[item].surname}{" "}
                  {researchersData[item].name[0]}.{" "}
                  {researchersData[item].patronymic[0]}.
                </Link>
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
  return <MaterialReactTable table={table} />;
};
