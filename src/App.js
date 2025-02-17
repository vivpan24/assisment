import React from "react";
import { TableProvider } from "./components/TableProvider";
import HierarchicalTable from "./components/HierarchicalTable";

const App = () => {
  return (
    <TableProvider>
      <HierarchicalTable />
    </TableProvider>
  );
};

export default App;
