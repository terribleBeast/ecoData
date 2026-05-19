import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getResearchPrediction } from "@/api/api";
import type { IPrediction } from "@/shared/types/image";
import { LoadingComponent } from "@/shared/components";

export interface ITableData {
  headers: string[];
  rows: IPrediction[][];
}
export const ResultTable = () => {
  const [tableData, setTableData] = useState<ITableData>({
    headers: [],
    rows: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPrediction = async () => {
      try {
        const response = await getResearchPrediction(1);
        console.log(response);
        setTableData({
          headers: response.headers,
          rows: response.rows,
        });
      } catch (error) {
        console.error("Error fetching prediction:", error);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {}, 2000000);
    getPrediction();
  }, []);
  if (loading) return <LoadingComponent />;
  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableData.headers.map((name, index) => (
            <TableCell key={index}>{name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.rows.map((row, index) => (
          <TableRow key={index}>
            {row.map((value, index) => (
              <TableCell key={index}>{value.probability}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
