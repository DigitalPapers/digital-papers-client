import {
  Box,
  Button,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  LinearProgress,
  Paper,
  Stack,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientsService } from "../services/clients.service";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { RefreshRounded } from "@mui/icons-material";
import { FilesService } from "../services/files.service";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function ListPagination({
  pageCount,
  page,
  handlePageChange,
  pageSize,
  handlePageSizeChange,
}) {
  return (
    <Box sx={{ flex: "1 1 100%" }}>
      <TablePagination
        component="div"
        count={pageCount}
        rowsPerPageOptions={[1, 10, 50]}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </Box>
  );
}

export function Files() {
  const { id: userID } = useParams();

  const [data, setData] = useState([]);
  const [filesDate, setFilesDate] = useState(
    dayjs()
      .set("month", new Date().getMonth())
      .set("year", new Date().getFullYear())
  );
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setLoading(true);
    ClientsService()
      .get({ userId: userID })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    FilesService()
      .list({
        id: userID,
        pageIndex: page,
        pageSize,
        month: filesDate.month() + 1,
        year: filesDate.year(),
      })
      .then((response) => {
        setData(response);
        setPageCount(response.totalCount);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error(error.message);
        setData([]);
        setLoading(false);
        setError(error.message);
      });
    setRefreshing(false);
  }, [page, pageSize, refreshing]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  const handleRefresh = (event) => {
    event.preventDefault();
    setLoading(true);
    setRefreshing(true);
  };

  const handleDateChange = (date) => {
    console.log(date);
    setFilesDate(date);
    setRefreshing(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : undefined}

        <Stack direction="row" sx={{ pt: 2 }}>
          <Button variant="text" onClick={() => window.history.back()}>
            <Icon>
              <ArrowBackOutlinedIcon />
            </Icon>
          </Button>

          <DatePicker
            label={"Fecha"}
            views={["month", "year"]}
            value={filesDate}
            onAccept={handleDateChange}
          />
        </Stack>

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
            Cliente: {user?.rfc?.toUpperCase()}
          </Typography>

          <ListPagination
            pageCount={pageCount}
            page={page}
            handlePageChange={handlePageChange}
            pageSize={pageSize}
            handlePageSizeChange={handlePageSizeChange}
          />
          <Tooltip title="Actualizar">
            <IconButton onClick={handleRefresh}>
              <RefreshRounded />
            </IconButton>
          </Tooltip>
        </Toolbar>

        {data?.files?.length > 0 ? (
          <>
            <ImageList
              sx={{ width: "100%" }}
              variant="masonry"
              cols={data.files.length > 2 ? 3 : 1}
              gap={3}
            >
              {data.files.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={item.key}
                    loading="lazy"
                    alt="No podemos mostrar img"
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <ListPagination
              pageCount={pageCount}
              page={page}
              handlePageChange={handlePageChange}
              pageSize={pageSize}
              handlePageSizeChange={handlePageSizeChange}
            />
          </>
        ) : (
          <>
            <Box sx={{ width: "100%", mt: 5, padding: 2 }}>
              <Typography>No hay archivos para mostrar</Typography>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
