import {
  Alert,
  Box,
  Button,
  Card,
  LinearProgress,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState, useRef } from "react";
import ClientSelect from "../../components/ClientsSelect";
import { FilePresentOutlined, SendOutlined } from "@mui/icons-material";

import ImgViewer from "../../components/ImgViewer/ImgViewer";
import { FilesService } from "../../services/files.service";

export default function FileUploader() {
  const [clientSelected, setClient] = useState(null);
  const [error, setError] = useState({ active: false, message: "" });
  const [filesDate, setFilesDate] = useState(
    dayjs()
      .set("month", new Date().getMonth())
      .set("year", new Date().getFullYear())
  );
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const handleDateChange = (date) => {
    setFilesDate(date);
  };

  const handleChangeFiles = (event) => {
    if (!event.target.files.length) {
      setError({
        active: true,
        message: "Por favor selecciona al menos un archivo",
      });
      return;
    }

    const files = filesUploaded.length ? [...filesUploaded] : [];
    for (const file of event.target.files) {
      const index = files.findIndex(
        (fileParsed) => fileParsed.file.name === file.name
      );

      if (index === -1) {
        files.push({ file, src: URL.createObjectURL(file) });
      }
    }
    setFilesUploaded(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!clientSelected) {
      setError({
        active: true,
        message: "Por favor seleccione un cliente",
      });
      return;
    }

    setError({ active: false, message: "" });
    const formData = new FormData();
    for (const file of filesUploaded) {
      formData.append("files", file.file, file.file.name);
    }

    setIsLoading(true);
    console.log({
      clientSelected,
      formData,
      month: filesDate.month() + 1,
      year: filesDate.year(),
    });

    // Display the values
    for (const value of formData.values()) {
      console.log(value);
    }
    try {
      const response = await FilesService().upload({
        clientId: clientSelected,
        formData,
        month: filesDate.month() + 1,
        year: filesDate.year(),
      });
      if (response.status === 201) {
        setIsLoading(false);
        setFilesUploaded([]);
        setUploadCompleted(true);
        setTimeout(() => {
          setUploadCompleted(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError({
        active: true,
        message: error.message,
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : undefined}

        {uploadCompleted ? (
          <Box sx={{ width: "100%" }}>
            <Alert severity="success">Archivos subidos con éxito</Alert>
          </Box>
        ) : undefined}

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
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <ClientSelect setError={setError} setClient={setClient} />

            <DatePicker
              label={"Fecha"}
              views={["month", "year"]}
              value={filesDate}
              onAccept={handleDateChange}
            />

            <Stack spacing={4} direction="row">
              <Button
                variant="contained"
                component="label"
                color="secondary"
                endIcon={<FilePresentOutlined />}
                disabled={isLoading}
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

              <Button
                variant="contained"
                component="label"
                disabled={filesUploaded.length === 0 || isLoading}
                endIcon={<SendOutlined />}
                onClick={handleSubmit}
              >
                Subir archivos
                <input hidden id="submit-files" type="submit" />
              </Button>
            </Stack>
          </Stack>
        </Card>

        <ImgViewer
          filesUploaded={filesUploaded}
          setFilesUploaded={setFilesUploaded}
        />
      </Paper>
    </Box>
  );
}
