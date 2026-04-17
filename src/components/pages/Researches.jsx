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

const ReaserchFullInfo = () => {
  const chaptersInfo = [
    { title: "Общая информация", fields: [{ name: "TMP", value: "TMP" }] },
  ];

  return (
    <DialogPanel>
      <ChaptersPaper>
        <ChapterHeaderTemplate chapterTitle="Исследования" />
        <Card style={{ overflowY: "auto", maxHeight: "60vh" }}></Card>
      </ChaptersPaper>
      <ChaptersPaper>
        <ChapterHeaderTemplate chapterTitle="Профиль исследователя" />
        <ChapterContentTemplate chaptersInfo={chaptersInfo} />
      </ChaptersPaper>
    </DialogPanel>
  );
};

const ReaserchesTable = () => {
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
                  {index + 1}.&nbsp;<Link>{reaserchersData[item].surname}</Link>
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
          <ReaserchFullInfo reasercher={selectedReaserch} />
        )}
      </Dialog>
      <Typography className="page-title">Исследования</Typography>
      <Paper className="chapter">
        <Typography className="chapter-title">НАЗВАНИЕ</Typography>
        <ReaserchesTable setSelectedReasercher={setSelectedReaserch} />
      </Paper>
    </>
  );
};

export default Research;
