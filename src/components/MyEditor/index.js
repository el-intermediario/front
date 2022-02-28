import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState, convertToRaw} from 'draft-js';
import es from './es.js';
import 'draft-js/dist/Draft.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../containers/Admin/FormArticlePage/styles.scss";

const MyEditor = ({handleBody}) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    handleBody(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  }

  return (
    <Editor
      editorState={editorState} 
      localization={{
        locale: 'es',
        translations: es
      }}
      toolbarClassName="toolbarEditorPage"
      editorClassName="editor-textarea"
      onEditorStateChange={onEditorStateChange}
    />
  );
}

export default MyEditor;
