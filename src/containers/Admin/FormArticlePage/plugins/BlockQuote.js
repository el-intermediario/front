import React, { useState } from "react";
import { EditorState, AtomicBlockUtils } from 'draft-js';
import iconQuote from './img/quote.png';
import { UncontrolledTooltip } from "reactstrap";

const BlockQuote = ({ editorState, onChange }) => {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState(null);

  const confirmReference = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'QUOTE',
      'IMMUTABLE',
      quote
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
        <span onClick={() => setOpen(true)} id="TooltipQuote">
          <img src={iconQuote} width="17px" alt="quote" />
        </span>
        <UncontrolledTooltip placement="bottom" target="TooltipQuote">
          Insertar Quote
        </UncontrolledTooltip>
      </div>
      <div className={`rdw-dropdown-optionwrapper ${open ? 'open-modal' : ''}`}>
        <input 
          type="text"
          placeholder="Autor.."
          onChange={(e) => setQuote({...quote, author: e.target.value})} 
        />
        <textarea 
          placeholder="Mensaje.."
          onChange={(e) => setQuote({...quote, message: e.target.value})} 
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

export default BlockQuote;