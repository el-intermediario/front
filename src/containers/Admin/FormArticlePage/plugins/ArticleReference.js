import React, { useState } from "react";
import { EditorState, AtomicBlockUtils } from 'draft-js';
import CustomAutocomplete from "../../../../components/CustomAutocomplete";
import FontAwesome from "../../../../components/uiStyle/FontAwesome";

const ArticleReference = ({ editorState, onChange }) => {
  const [open, setOpen] = useState(false);
  const [articleReferenceSelected, setArticleReferenceSelected] = useState(null);
  const [initialSearch, setInitialSearch] = useState(true);

  const confirmReference = (e) => {
    setInitialSearch(false);
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'REFERENCE',
      'IMMUTABLE',
      articleReferenceSelected
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
        <span onClick={() => setOpen(true)}>
          <FontAwesome name="files-o"/>
        </span>
      </div>
      <div className={`rdw-dropdown-optionwrapper ${open ? 'open-modal' : ''}`}>
        <CustomAutocomplete
          handleItemSelected={(data) => setArticleReferenceSelected(data)}
          initialSearch={initialSearch}
        />
        <div className="col-12 field-actions">
          <button onMouseDown={confirmReference}>
            Confirmar
          </button>
          <button
            className="close"
            onMouseDown={() => {setOpen(false)}}>
            x
          </button>
        </div>
      </div>
    </div>
  )
};

export default ArticleReference;