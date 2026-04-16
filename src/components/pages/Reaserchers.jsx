import { Typography, Box, Paper } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { getMockReaserchers } from "../../mock_data";

const ReaserchersTable = () => {
  const [data, setData] = useState(getMockReaserchers());
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      minSize: 50,
      size: 70,
      maxSize: 100,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "name",
      header: "Имя",
    },
    {
      accessorKey: "surname",
      header: "Фамилия",
    },
    {
      accessorKey: "email",
      header: "e-mail",
    },
    {
      accessorKey: "role",
      header: "Role",
      // editVariant: "select",
      // editSelectOptions: rolesUser,
      // muiEditTextFieldProps: {
      //   error: !!validationErrors?.state,
      //   helperText: validationErrors?.state,
      // },
    },
    {
      accessorKey: "job_id",
      header: "job_id",
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
  return (
    <Paper className="chapter">
      <Typography className="chapter-title">Исследователи</Typography>
      <ReaserchersTable />
    </Paper>
  );
};

export default Reaserchers;
