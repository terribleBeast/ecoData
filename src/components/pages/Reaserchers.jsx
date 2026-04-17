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
import { getMockReaserchers } from "../../mock_data";
import {
  ChapterContentTemplate,
  ChapterHeaderTemplate,
  ChaptersPaper,
} from "../ChapterTemplate";
import { DialogPanel } from "../DialogPanel";

const REASERCHES_LIST_LEN = 1;

const ReasercherFullInfo = ({ reasercher }) => {
  const chaptersInfo = [
    {
      title: "Общая информация",
      fields: [
        {
          name: "Фамилия",
          value: reasercher.surname,
        },
        {
          name: "Имя",
          value: reasercher.name,
        },
        {
          name: "Отчество",
          value: reasercher.patronomic,
        },
        {
          name: "Должность",
          value: reasercher.job,
        },
      ],
    },
    {
      title: "Контактная информация",
      fields: [
        {
          name: "e-mail",
          value: reasercher.email,
        },
        {
          name: "Телефон",
          value: reasercher.phone,
        },
      ],
    },
  ];
  return (
    <DialogPanel>
      <ChaptersPaper>
        <ChapterHeaderTemplate chapterTitle="Исследования" />
        <Card style={{ overflowY: "auto", maxHeight: "60vh" }}>
          <List>
            {reasercher.reaserches.map((item, index) => (
              <ListItemButton
                to={`/researcher?reaserch_id=${reasercher.reaserches[index].id}`}
              >
                {index + 1}.&nbsp;<Link>{item}</Link>
              </ListItemButton>
            ))}
          </List>
        </Card>
      </ChaptersPaper>
      <ChaptersPaper>
        <ChapterHeaderTemplate chapterTitle="Профиль исследователя" />
        <ChapterContentTemplate chaptersInfo={chaptersInfo} />
      </ChaptersPaper>
    </DialogPanel>
  );
};

const ReaserchersTable = ({ setSelectedReasercher }) => {
  const [data, setData] = useState(getMockReaserchers(15));
  const [reaserchesListState, setReaserchesListState] = useState(
    Array(data.length).fill(true),
  );

  const handleToggleReaserches = (reaserchIndex) =>
    setReaserchesListState(
      reaserchesListState.map((item, index) => {
        if (index == reaserchIndex) {
          return !item;
        }
      }),
    );
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
      accessorKey: "fullName",
      header: "ФИО",
      Cell: ({ row }) => (
        <Typography
          onClick={() => setSelectedReasercher(row.original)}
          style={{ cursor: "pointer" }}
        >
          {row.original.surname} {row.original.name[0]}.{" "}
          {row.original.patronomic[0]}.
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
      // editVariant: "select",
      // editSelectOptions: rolesUser,
      // muiEditTextFieldProps: {
      //   error: !!validationErrors?.state,
      //   helperText: validationErrors?.state,
      // },
    },
    {
      accessorKey: "job",
      header: "Работа",
    },
    {
      accessorKey: "reaserches",
      header: "Исследования",
      Cell: ({ row }) => (
        <Box style={{ overflowY: "auto", maxHeight: "20vh" }}>
          <List>
            {row.original.reaserches
              .slice(
                0,
                reaserchesListState[row.id]
                  ? REASERCHES_LIST_LEN
                  : row.original.reaserches.length,
              )
              .map((item, index) => (
                <ListItemButton
                  key={index}
                  to={`/researcher?reaserch_id=${row.original.reaserches[index].id}`}
                >
                  {index + 1}.&nbsp;<Link>{item}</Link>
                </ListItemButton>
              ))}

            {row.original.reaserches.length > 3 ? (
              <ListItemButton onClick={() => handleToggleReaserches(row.id)}>
                <Typography>
                  {reaserchesListState[row.id] ? ">" : "<"}
                </Typography>
              </ListItemButton>
            ) : (
              <></>
            )}
          </List>
        </Box>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    // layoutMode: "grid",
    // state:
  });
  console.log("Table");
  return <MaterialReactTable table={table} />;
};

const Reaserchers = () => {
  const [selectedReasercher, setSelectedReasercher] = useState(null);
  // TODO: set name of chapter
  return (
    <>
      <Dialog
        open={selectedReasercher !== null}
        onClose={() => {
          setSelectedReasercher(null);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedReasercher !== null && (
          <ReasercherFullInfo reasercher={selectedReasercher} />
        )}
      </Dialog>
      <Typography className="page-title">Исследователи</Typography>
      <Paper className="chapter">
        <Typography className="chapter-title">НАЗВАНИЕ</Typography>
        <ReaserchersTable setSelectedReasercher={setSelectedReasercher} />
      </Paper>
    </>
  );
};

export default Reaserchers;
