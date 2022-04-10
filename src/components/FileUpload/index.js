import React, {useState} from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const FileUploadComponent = ({ maxFiles = 50, handleFiles }) => {
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const fileParams = ({ meta }) => {
        // return { url: 'https://httpbin.org/post' }
    }
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
            <label className="btn btn-danger mt-4">
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
        <Dropzone
            onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            // getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*" // image/*,audio/*,video/*
            maxFiles={maxFiles}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: 400, height: maxFiles === 1 ? 200 : 400 },
                dropzoneActive: { borderColor: 'green' },
            }}
            submitButtonContent="Confirmar archivos"
            submitButtonDisabled={submitButtonDisabled} 
        />
    );
};
export default FileUploadComponent;