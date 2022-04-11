import React, { useState, useEffect } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import { useArray } from 'react-hanger';
import "./styles.scss";

const close = "background-image: url(&quot;data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUuMCwgMC4wKSIgZmlsbD0iIzMzMzMzMyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4wLCAwLjApIj48cG9seWdvbiBwb2ludHM9IjcuNzE5IDQuOTY0IDEyLjY5MiAwLjAxNyAxNC4zODkgMS43MTUgOS40MTIgNi42NjYgMTQuMzU0IDExLjYzNCAxMi42NTcgMTMuMzMxIDYuMDE3IDYuNjU3IDcuNzE1IDQuOTYwIj48L3BvbHlnb24+PHBvbHlnb24gcG9pbnRzPSI3LjYxMiA0Ljk2NCA3LjYxNiA0Ljk2MCA5LjMxMyA2LjY1NyAyLjY3NCAxMy4zMzEgMC45NzcgMTEuNjM0IDUuOTE5IDYuNjY2IDAuOTQyIDEuNzE1IDIuNjM5IDAuMDE3Ij48L3BvbHlnb24+PC9nPjwvZz48L3N2Zz4K&quot;);";

const FileUpload = ({ maxFiles = 50, handleFiles, initialFiles, handleInitialFiles }) => {
  const images = useArray([]);
  const [imageSetted, setImageSetted] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    if (initialFiles.length > 0 && !imageSetted) {
      for (const item of initialFiles) {
        images.push(item);
      }
      setImageSetted(true);
    }
  }, [initialFiles, imageSetted]);

  useEffect(() => {
    handleInitialFiles(images.value);
  }, [images]);

  const onFileChange = ({ meta, file }, status) => {
    if (submitButtonDisabled) setSubmitButtonDisabled(false);
  }
  const onSubmit = (files, allFiles) => {
    const list = [];
    files.reduce((prev, curr) => list.push(curr.file), []);
    if (!submitButtonDisabled) setSubmitButtonDisabled(true);
    handleFiles(list);
    // allFiles.forEach(f => f.remove())
  }
  const getFilesFromEvent = e => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(chosenFiles => {
        resolve(chosenFiles.map(f => f.fileObject))
      })
    })
  }
  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const textMsg = files.length > 0 ? 'Cargar otro' : 'Selecciona un archivo'
    return (
      <label className="btn btn-danger mt-2">
        {textMsg}
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          multiple
          onChange={e => {
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles)
            })
          }}
        />
      </label>
    )
  }

  return (
    <>
      {images.value.map((item, i) => (
        <div className="dzu-previewContainer" key={i}>
          <img className="dzu-previewImage" src={item.url} alt={item.id} title={item.id}  width={60} height={60} />
          <div className="dzu-previewStatusContainer">
            <span 
              onClick={() => images.removeIndex(item.assetId)}
              className="dzu-previewButton">x</span>
          </div>
        </div>
      ))}
      <Dropzone
        onSubmit={onSubmit}
        onChangeStatus={onFileChange}
        InputComponent={selectFileInput}
        getFilesFromEvent={getFilesFromEvent}
        accept="image/*" // image/*,audio/*,video/*
        maxFiles={maxFiles}
        inputContent="Arrastra un archivo"
        styles={{
          dropzone: { width: 400 },
          dropzoneActive: { borderColor: 'green' },
        }}
        submitButtonContent="Confirmar archivos"
        submitButtonDisabled={submitButtonDisabled}
      />
    </>
  );
};
export default FileUpload;