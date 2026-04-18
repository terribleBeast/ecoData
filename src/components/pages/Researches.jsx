import {
  Typography,
  Box,
  Paper,
  Dialog,
  ListItemButton,
  List,
  Link,
  Card,
  CardContent,
  CardHeader,
  Button,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { getMockReaserchers, getMockReaserches } from "../../mock_data";
import {
  ChapterContentTemplate,
  ChapterHeaderTemplate,
  ChaptersPaper,
} from "../ChapterTemplate";
import { DialogPanel } from "../DialogPanel";

const ReaserchFullInfo = ({ reaserch }) => {
  const chaptersInfo = [
    {
      title: "Общая информация",
      fields: [
        { name: "Название", value: reaserch.title },
        { name: "Цель", value: reaserch.goal },
        { name: "Статус", value: reaserch.status },
      ],
    },
  ];

  return (
    <DialogPanel>
      <ChaptersPaper>
        <ChapterHeaderTemplate chapterTitle="Таблица результатов" />
        <Card style={{ overflowY: "auto", maxHeight: "60vh" }}></Card>
      </ChaptersPaper>
      <ChaptersPaper>
        <ChapterHeaderTemplate chapterTitle="Данные об исследовании" />
        <ChapterContentTemplate chaptersInfo={chaptersInfo} />
      </ChaptersPaper>
    </DialogPanel>
  );
};

const ReaserchesTable = ({ setSelectedReaserch }) => {
  const [data, setData] = useState(getMockReaserches());
  const [reaserchersData, setReaserchersData] = useState(getMockReaserchers());
  const columns = [
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
      accessorKey: "title",
      header: "Название",
      Cell: ({ row }) => (
        <Typography
          onClick={() => setSelectedReaserch(row.original)}
          style={{ cursor: "pointer" }}
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
      accessorKey: "reaserchers_id",
      header: "Исследователи",
      Cell: ({ row }) => (
        <Box style={{ overflowY: "auto", maxHeight: "20vh" }}>
          <List>
            {row.original.reaserchers_id
              // .slice(
              //   0,
              //   reaserchesListState[row.id]
              //     ? REASERCHES_LIST_LEN
              //     : row.original.reaserches_id.length,
              // )
              .map((item, index) => (
                <ListItemButton
                  key={index}
                  to={`/researcher?reasercher_id=${reaserchersData[item].id}`}
                >
                  {index + 1}.&nbsp;
                  <Link>
                    {reaserchersData[item].surname}{" "}
                    {reaserchersData[item].name[0]}.{" "}
                    {reaserchersData[item].patronomic[0]}.
                  </Link>
                </ListItemButton>
              ))}

            {/* {row.original.reaserches_id.length > 3 ? (
              <ListItemButton onClick={() => handleToggleReaserches(row.id)}>
                <Typography>
                  {reaserchesListState[row.id] ? ">" : "<"}
                </Typography>
              </ListItemButton>
            ) : (
              <></>
            )}*/}
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

const Research = () => {
  const [selectedReaserch, setSelectedReaserch] = useState(null);
  // TODO: set name of chapter
  return (
    <>
      <Dialog
        open={selectedReaserch !== null}
        onClose={() => {
          setSelectedReaserch(null);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedReaserch !== null && (
          <ReaserchFullInfo reaserch={selectedReaserch} />
        )}
      </Dialog>
      <Typography className="page-title">Исследования</Typography>
      <Paper className="chapter">
        <Typography className="chapter-title">НАЗВАНИЕ</Typography>
        <ReaserchesTable setSelectedReaserch={setSelectedReaserch} />
      </Paper>
    </>
  );
};

export default Research;
