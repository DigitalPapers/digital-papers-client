import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function ImgViewer({ filesUploaded, setFilesUploaded }) {
  const handleRemoveImg = (event) => {
    const fileNameToDelete = event.target.dataset.imgName;
    setFilesUploaded(
      filesUploaded.filter((file) => file.file.name !== fileNameToDelete)
    );
  };

  return filesUploaded.length ? (
    <ImageList sx={{ width: "100%" }} cols={2}>
      {filesUploaded.map((item) => (
        <ImageListItem key={item.file.name}>
          <ImageListItemBar
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
            }}
            position="top"
            actionIcon={
              <IconButton
                onClick={handleRemoveImg}
                data-img-name={item.file.name}
                sx={{ color: "white" }}
              >
                <RemoveCircleIcon sx={{ pointerEvents: "none" }} />
              </IconButton>
            }
            actionPosition="right"
          />
          <img
            src={`${item.src}`}
            srcSet={`${item.src}`}
            alt={item.file.name}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ) : undefined;
}
