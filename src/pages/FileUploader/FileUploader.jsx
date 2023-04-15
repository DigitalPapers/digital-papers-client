import {
  Alert,
  Box,
  Button,
  Card,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { ClientsService } from "../../services/clients.service";
import ClientSelect from "../../components/ClientsSelect";

export default function FileUploader() {
  const [clientSelected, setClient] = useState("");

  const [error, setError] = useState({ active: false, message: "" });
  const [filesDate, setFilesDate] = useState(
    dayjs()
      .set("month", new Date().getMonth())
      .set("year", new Date().getFullYear())
  );

  const [filesUploaded, setFilesUploaded] = useState([]);

  const handleSelectClient = (event) => {
    setClient(event.target.value);
  };

  const handleDateChange = (date) => {
    console.log(date);
    setFilesDate(date);
    setRefreshing(true);
  };

  const handleChangeFiles = (event) => {
    console.log(event.target.files);
    if (!event.target.files.length) {
      setError({
        active: true,
        message: "Por favor selecciona al menos un archivo",
      });
      return;
    }
    const files = filesUploaded.length ? [...filesUploaded] : [];

    for (const file of event.target.files) {
      files.push({ file, src: URL.createObjectURL(file) });
    }
    console.log(files);
    setFilesUploaded(files);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <Toolbar sx={{ mb: "20px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, mb: "10" }}
          >
            Subir imagenes
          </Typography>
        </Toolbar>

        {error.active ? (
          <Alert severity="error">{error.message}</Alert>
        ) : undefined}

        <Card sx={{ border: "1px solid red" }}>
          <Stack spacing={3}>
            <ClientSelect setError={setError} />

            <DatePicker
              label={"Fecha"}
              views={["month", "year"]}
              value={filesDate}
              onAccept={handleDateChange}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ border: "2px solid red" }}
            >
              Select files
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                id="files-selected"
                onChange={handleChangeFiles}
              />
            </Button>
          </Stack>
        </Card>

        {filesUploaded.length ? (
          <ImageList
            sx={{ width: "100%", height: "100%" }}
            cols={3}
            rowHeight={164}
          >
            {filesUploaded.map((item) => (
              <ImageListItem key={item.file.name}>
                <img
                  src={`${item.src}`}
                  srcSet={`${item.src}`}
                  alt={item.file.name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : undefined}
      </Paper>
    </Box>
  );
}
