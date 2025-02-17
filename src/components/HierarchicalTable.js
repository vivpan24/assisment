import React from "react";
import { useTableContext } from "./TableProvider";
import TableRowComponent from "./TableRowComponent.js";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const HierarchicalTable = () => {
  const { data } = useTableContext();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Label</b></TableCell>
            <TableCell><b>Value</b></TableCell>
            <TableCell><b>Input</b></TableCell>
            <TableCell><b>Allocation %</b></TableCell>
            <TableCell><b>Allocation Val</b></TableCell>
            <TableCell><b>Variance %</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <React.Fragment key={row.id}>
              <TableRowComponent row={row} level={0} />
              {row.children &&
                row.children.map((child) => <TableRowComponent key={child.id} row={child} level={1} />)}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HierarchicalTable;
