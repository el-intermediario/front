import React from 'react';
import { EditorState, Modifier } from 'draft-js';

const CustomOption = ({ editorState, onChange }) => {
    const addStar = () => {
      //const { editorState, onChange } = this.props;
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        '⭐',
        editorState.getCurrentInlineStyle(),
      );
      onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    };
  
    return (
      <div onClick={addStar}>⭐</div>
    );
  };

  export default CustomOption;