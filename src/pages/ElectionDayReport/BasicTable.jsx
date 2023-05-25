import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";

const BasicTable = ({ title, data, columns }) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      responsive
    //   pagination={{
    //     enabled: false,
    //     defaultPage: 1,
    //     defaultRowsPerPage: 50,
    //     rowsPerPageOptions: [50, 100, 200],
    //     totalRows: data?.length,
    //   }}
    //   paginationPerPage={50}
    //   paginationRowsPerPageOptions={[50, 100, 200]}
      highlightOnHover
      striped
    />
  );
};
export default BasicTable;
