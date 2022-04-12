import React, { useState, useEffect } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import { useArray } from 'react-hanger';
import "./styles.scss";
import api from '../../utils/api';

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
          <img className="dzu-previewImage" src={`${api.space}c_fill,g_face,h_77,w_100/v${item.url}`} alt={item.id} title={item.id}  width={60} height={60} />
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