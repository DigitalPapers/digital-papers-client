import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useTable, usePagination } from "react-table";
import {
  Alert,
  Box,
  IconButton,
  LinearProgress,
  Link,
  Paper,
  TableContainer,
  TableFooter,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DEFAULT_ROWS_PER_PAGE } from "../../utils/consts";
import TablePaginationActions from "./TablePaginationActions";
import { RefreshRounded } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

function EnhancedTableToolbar({ numSelected = 0, tableName = "" }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {tableName}
      </Typography>

      <Tooltip title="Actualizar">
        <IconButton>
          <RefreshRounded />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

function EnhancedTableHead({ headers }) {
  return (
    <TableHead>
      {headers.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <TableCell {...column.getHeaderProps()}>
              {column.render("Header")}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

function BaseTable({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  totalCount,
  error,
  link: { isLink, goToLink, identifier },
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      autoReset: false,
      pageCount: controlledPageCount,
    },
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const handlePageChanged = (newPage) => {
    gotoPage(newPage);
  };

  return (
    <Box sx={{ witdh: "100" }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <EnhancedTableToolbar tableName={"Clientes"} />
          {loading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : undefined}
          {typeof error === "string" ? (
            <Alert severity="error">{error}</Alert>
          ) : undefined}

          <Table {...getTableProps()} sx={{ minWidth: 750 }} size={"medium"}>
            <EnhancedTableHead headers={headerGroups} />

            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {isLink && cell.column.id === identifier ? (
                            <Link
                              component={RouterLink}
                              to={goToLink.replace(":id", cell.value)}
                              underline="none"
                            >
                              {cell.render("Cell")}
                            </Link>
                          ) : (
                            cell.render("Cell")
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "All", value: totalCount },
                  ]}
                  colSpan={3}
                  count={totalCount}
                  rowsPerPage={pageSize}
                  page={pageIndex}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  onPageChange={handlePageChanged}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default BaseTable;
