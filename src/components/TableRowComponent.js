import React, { useState } from "react";
import { useTableContext } from "./TableProvider";
import { TableRow, TableCell, TextField, Button } from "@mui/material";

const TableRowComponent = ({ row, level }) => {
  const { updateValue, calculateVariance } = useTableContext();
  const [inputValue, setInputValue] = useState("");

  const handlePercentageUpdate = () => {
    if (!isNaN(inputValue) && inputValue !== "") {
      updateValue(row.id, parseFloat(inputValue), true);
    }
  };

  const handleValueUpdate = () => {
    if (!isNaN(inputValue) && inputValue !== "") {
      updateValue(row.id, parseFloat(inputValue), false);
    }
  };

  return (
    <TableRow>
      <TableCell style={{ paddingLeft: `${level * 20}px` }}>
        {row.label}
      </TableCell>
      <TableCell>{row.value.toFixed(2)}</TableCell>
      <TableCell>
        <TextField
          type="number"
          size="small"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" size="small" onClick={handlePercentageUpdate}>
          %
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="contained" size="small" onClick={handleValueUpdate}>
          Set
        </Button>
      </TableCell>
      <TableCell>{calculateVariance(row.originalValue, row.value).toFixed(2)}%</TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
