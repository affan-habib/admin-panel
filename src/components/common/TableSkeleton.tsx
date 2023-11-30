import React from "react";
import { Skeleton } from "@mui/material";

const TableSkeleton: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} height={100} style={{ marginBottom: 3 }} />
      ))}
    </div>
  );
};

export default TableSkeleton;
