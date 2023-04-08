import {
  Box,
  Button,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  LinearProgress,
  Pagination,
  Paper,
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

export function Files() {
  const { id: userID } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    ClientsService()
      .get({ userId: userID })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });

    FilesService()
      .list({ id: userID, pageIndex: page, pageSize, month, year })
      .then((response) => {
        setData(response);
        setPageCount(response.totalPages);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error(error.message);
        setData([]);
        setLoading(false);
        setError(error.message);
      });
  }, [page, pageSize, month, year, userID]);

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : undefined}
        <Button variant="text" onClick={() => window.history.back()}>
          <Icon>
            <ArrowBackOutlinedIcon />
          </Icon>
        </Button>
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
            Cliente: {user?.rfc?.toUpperCase()} archivos de {year}/{month}
          </Typography>

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

          <Tooltip title="Actualizar">
            <IconButton>
              <RefreshRounded />
            </IconButton>
          </Tooltip>
        </Toolbar>

        {data?.length > 0 ? (
          <>
            <ImageList
              sx={{ width: "100%" }}
              variant="masonry"
              cols={3}
              gap={8}
            >
              {data.files.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={item.key}
                    srcSet={`${item.key}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Box sx={{ width: "100%", mt: 5, padding: 2 }}>
              <Pagination count={10} showFirstButton showLastButton />
            </Box>
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
