import React, { useState } from 'react';
import BannerSection from "../../components/BannerSection";
import FollowUs from "../../components/FollowUs";
import SimpleReactValidator from 'simple-react-validator';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {EditorState, convertToRaw, ContentState} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parseHtml from "html-react-parser";

const FormArticlePage = () => {
  const defaultContent = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
  const html = '<p>Hey this <strong>editor</strong> rocks</p>';
  const contentBlock = htmlToDraft(html);
  let contentState = null;
  if (contentBlock) {
    contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  }
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState ? contentState : null));

  const validator = new SimpleReactValidator();
  const [title, setTitle] = useState('');
  const [dropline, setDropline] = useState('');
  const [copete, setCopete] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [status, setStatus] = useState(false);


  const submitHandler = () => {

  }

  const onEditorStateChange = (value) => {
    setEditorState(value);
    setBodyHtml(draftToHtml(convertToRaw(value.getCurrentContent())))
  }

  console.log(bodyHtml);
  return (
    <>
      <div className="contact_form padding-bottom">
        <div className="container">
          <div className="space-50" />
          <div className="row">
            <div className="col-lg-8">
              <div className="cotact_form">
                <div className="row">
                  <div className="col-12">
                    <h3>Crear nota!</h3>
                  </div>
                  <div className="col-12">
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-lg-6">
                          <input name="title" value={title} onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Titulo" />
                          {validator.message('Titulo', title, 'required')}
                        </div>
                        <div className="col-12">
                          <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                          />
                        </div>
                        <div className="col-lg-6">
                          <input name="copete" value={copete} onChange={e => setCopete(e.target.value)}
                            type="text"
                            placeholder="Copete" />
                        </div>
                        <div className="col-12">
                          <input name="status" 
                            value={status} 
                            onChange={e => setStatus(!e.target.checked)}
                            type="checkbox" 
                          />
                          <label>Publicar</label>
                        </div>
                        <div className="col-12">
                          <div className="space-20" />
                          <button className="cbtn1" type="submit">Guardar</button>
                        </div>
                        <div className="preview">
                          {title} <br />
                          {parseHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <FollowUs title="Redes Sociales" />
            </div>
          </div>
        </div>
      </div>
      <BannerSection />
    </>
  );
}

export default FormArticlePage;