import {
  Box, Container, Grid,
  IconButton,
  ImageList,
  ImageListItem,
   Modal, styled,
} from '@mui/material'

import { useEffect, useState } from 'react'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen.js'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft.js'
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight.js'


const Img = styled("img")({
  cursor: "pointer",
  width: "100%",
  height: "100%",
});
export default function ImgViewer({ filesUploaded = [], setFilesUploaded }) {

  const [sliderNumber, setSliderNumber] = useState(0);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setDisableNextButton(!filesUploaded.length);
  }, []);

  const handleOpenModal = (index) => {
    setSliderNumber(index);
    setOpenModal(true);
  };
  const handleNextImage = () => {
    if (sliderNumber >= filesUploaded.length - 1) {
      setSliderNumber(0);
    } else {
      setSliderNumber(sliderNumber + 1);
    }
  };

  const handlePreviousImage = () => {
    sliderNumber === 0
      ? setSliderNumber(filesUploaded.length - 1)
      : setSliderNumber(sliderNumber - 1);
  };

  const handleClose = () => setOpenModal(false);
  const handleRemoveImg = (event) => {
    if (!filesUploaded.length) {
      setFilesUploaded([]);
      return;
    }
    const fileNameToDelete = event.target.dataset.imgName;
    setFilesUploaded(
      filesUploaded.filter((file) => file.file.name !== fileNameToDelete)
    );
  };

  return filesUploaded.length ? (
    <Container>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <Box
          sx={{
            minWidth: "100%",
            maxWidth: "600",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <Grid container direction="column" alignItems="center">
            <Grid item zeroMinWidth>
              <Img src={filesUploaded[sliderNumber].src} alt="Image" />
            </Grid>
            <Grid item>
              <IconButton
                color="error"
                aria-label="close"
                onClick={() => setOpenModal(false)}
              >
                <CloseFullscreenIcon />
              </IconButton>
              <IconButton
                color="info"
                aria-label="Go to the previous"
                onClick={handlePreviousImage}
              >
                <ArrowCircleLeftIcon />
              </IconButton>
              <IconButton
                color="info"
                aria-label="Go next"
                disabled={disableNextButton}
                onClick={handleNextImage}
              >
                <ArrowCircleRightIcon />
              </IconButton>
              <IconButton
                onClick={handleRemoveImg}
                data-img-name={filesUploaded[sliderNumber].file.name}
              >
                <RemoveCircleIcon sx={{ pointerEvents: "none" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <ImageList variant="masonry" cols={3} gap={4}>
      {filesUploaded.map((item, index) => (
        <ImageListItem key={item.file.name} onClick={() => handleOpenModal(index)}>
          <Img
            src={`${item.src}`}
            srcSet={`${item.src}`}
            alt={item.file.name}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
</Container>
  ) : undefined;
}
