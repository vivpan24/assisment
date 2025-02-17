import React, { createContext, useContext, useState } from "react";

const TableContext = createContext();

const initialData = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    originalValue: 1500,
    children: [
      { id: "phones", label: "Phones", value: 800, originalValue: 800 },
      { id: "laptops", label: "Laptops", value: 700, originalValue: 700 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    originalValue: 1000,
    children: [
      { id: "tables", label: "Tables", value: 300, originalValue: 300 },
      { id: "chairs", label: "Chairs", value: 700, originalValue: 700 },
    ],
  },
];

export const TableProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const updateValue = (id, amount, isPercentage) => {
    const newData = data.map((category) => {
      if (category.id === id) {
        let newValue = isPercentage
          ? category.value + (category.value * amount) / 100
          : amount;
        return { ...category, value: newValue };
      }
      
      if (category.children) {
        const updatedChildren = category.children.map((child) => {
          if (child.id === id) {
            let newValue = isPercentage
              ? child.value + (child.value * amount) / 100
              : amount;
            return { ...child, value: newValue };
          }
          return child;
        });

        const updatedCategory = {
          ...category,
          children: updatedChildren,
          value: updatedChildren.reduce((sum, child) => sum + child.value, 0),
        };
        return updatedCategory;
      }
      return category;
    });
    setData(newData);
  };

  const calculateVariance = (originalValue, updatedValue) => {
    return originalValue !== 0 ? ((updatedValue - originalValue) / originalValue) * 100 : 0;
  };

  return (
    <TableContext.Provider value={{ data, updateValue, calculateVariance }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
