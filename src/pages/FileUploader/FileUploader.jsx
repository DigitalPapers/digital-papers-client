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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';
import ClientSelect from '../../components/ClientsSelect';
import {
  CameraAltOutlined,
  FilePresentOutlined,
  SendOutlined,
} from '@mui/icons-material';

import { FilesService } from '../../services/files.service';

export default function FileUploader({
  filesUploaded,
  setFilesUploaded,
  handleChangeFiles,
  children,
}) {
  const [clientSelected, setClient] = useState(null);
  const [error, setError] = useState({ active: false, message: '' });
  const [filesDate, setFilesDate] = useState(
    dayjs()
      .set('month', new Date().getMonth())
      .set('year', new Date().getFullYear()),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const handleDateChange = (date) => {
    setFilesDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!clientSelected) {
      setError({
        active: true,
        message: 'Por favor seleccione un cliente',
      });
      return;
    }

    setError({ active: false, message: '' });
    const formData = new FormData();
    for (const file of filesUploaded) {
      formData.append('files', file.file, file.file.name);
    }

    setIsLoading(true);

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
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        {isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : undefined}

        {uploadCompleted ? (
          <Box sx={{ width: '100%' }}>
            <Alert severity="success">Archivos subidos con éxito</Alert>
          </Box>
        ) : undefined}

        {error.active ? (
          <Alert severity="error">{error.message}</Alert>
        ) : undefined}
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <ClientSelect setError={setError} setClient={setClient} />

            <DatePicker
              label={'Fecha'}
              views={['month', 'year']}
              value={filesDate}
              onAccept={handleDateChange}
            />

            <Stack
              spacing={{ xs: 1, sm: 2, md: 4 }}
              direction={{ xs: 'column', sm: 'row' }}
            >
              <Button
                variant="outlined"
                component="label"
                color="secondary"
                endIcon={<FilePresentOutlined />}
                disabled={isLoading}
              >
                Selecciona o captura
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
                disabled={!filesUploaded.length || isLoading}
                endIcon={<SendOutlined />}
                onClick={handleSubmit}
              >
                Subir archivos
                <input hidden id="submit-files" type="submit" />
              </Button>
            </Stack>
          </Stack>
        </Card>

        {children}
      </Paper>
    </Box>
  );
}
