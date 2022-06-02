import React, { useState } from "react";
import { EditorState, AtomicBlockUtils } from 'draft-js';
import iconQuote from './img/quote.png';
import FontAwesome from "../../../../components/uiStyle/FontAwesome";
import FileUpload from "../../../../components/FileUpload";
import api from "../../../../utils/api";
import { UncontrolledTooltip } from "reactstrap";

const Gallery = ({ editorState, onChange }) => {
  const [open, setOpen] = useState(false);
  const [gallery, setGallery] = useState([]);

  const handleFiles = async (files, folder) => {
    const formData = new FormData();
    formData.append('folder', `intermediario/${folder}`);
    for(const file of files) {
      formData.append('image', file);
    }

    try {
      const response = await api.upload.post(formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
      
      if (response) {
        setGallery([...gallery, response.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const confirmReference = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'GALLERY',
      'IMMUTABLE',
      gallery
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity }
    );

    onChange(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    ));
    setOpen(false);
  };

  return (
    <div className="rdw-block-wrapper button-modal" aria-label="rdw-block-control" role="button">
      <div className="rdw-dropdown-selectedtext">
        <span onClick={() => setOpen(true)} id="TooltipGallery">
          <FontAwesome name="photo"/>
        </span>
        <UncontrolledTooltip placement="bottom" target="TooltipGallery">
          Insertar Galeria
        </UncontrolledTooltip>
      </div>
      <div className={`rdw-dropdown-optionwrapper ${open ? 'open-modal' : ''}`}>
        <FileUpload 
          initialFiles={gallery}
          handleInitialFiles={(data) => setGallery(data)}
          handleFiles={(files) => handleFiles(files, 'gallery')}
        />
        <div className="col-12 field-actions">
          <button onMouseDown={confirmReference}> Insertar </button>
          <button
            className="close"
            onMouseDown={() => {setOpen(false)}}> x </button>
        </div>
      </div>
    </div>
  )
};

export default Gallery;