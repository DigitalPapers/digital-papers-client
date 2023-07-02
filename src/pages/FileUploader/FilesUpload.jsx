import { useState } from "react";
import ImgViewer from "../../components/ImgViewer/ImgViewer";
import FileUploader from "./FileUploader";

export default function FilesUpload() {
  const [filesUploaded, setFilesUploaded] = useState([]);
  console.log("ComponentRerendered? Page", filesUploaded);
  const handleChangeFiles = (event) => {
    console.log("Entro al handleChangeFiles");
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
      const index = files.findIndex(
        (fileParsed) => fileParsed.file.name === file.name
      );

      if (index === -1) {
        files.push({ file, src: URL.createObjectURL(file) });
      }
    }
    setFilesUploaded(files);
  };
  return (
    <FileUploader
      filesUploaded={filesUploaded}
      setFilesUploaded={setFilesUploaded}
      handleChangeFiles={handleChangeFiles}
    >
      <ImgViewer
        filesUploaded={filesUploaded}
        setFilesUploaded={setFilesUploaded}
      />
    </FileUploader>
  );
}
