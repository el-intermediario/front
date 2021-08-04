import React, { useState } from 'react';
import FollowUs from "../../../components/FollowUs";
import SimpleReactValidator from 'simple-react-validator';
import CustomOption from './plugins/CustomOption';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import api from "../../../utils/api";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import TreeMenu from 'react-simple-tree-menu';
import 'react-simple-tree-menu/dist/main.css';

const FormArticlePage = () => {
  const html = '<p>Hey escribe aqui tu <strong>nota</strong> 😀</p>';
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

  const validator = new SimpleReactValidator();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('normal');
  const [dropline, setDropline] = useState('');
  const [source, setSource] = useState('');
  const [copete, setCopete] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [bodyJson, setBodyJson] = useState(null);
  const [status, setStatus] = useState(false);
  const [category, setCategory] = useState('local');
  const [categoryKey, setCategoryKey] = useState(null);
  const [categoryParent, setCategoryParent] = useState(null);
  const [image, setImage] = useState(null);
  const [suggestions, setSuggestions] = useState([
    { text: 'Boca eliminado de la copa', value: 'boca', url: 'https://www.ole.com.ar' },
    { text: 'BANANA', value: 'banana', url: 'banana' },
    { text: 'CHERRY', value: 'cherry', url: 'cherry' }
  ]);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

  const categories = [
    {
      key: 'category',
      label: 'Selecciona una categoria',
      nodes: [
        {
          key: 'politica',
          label: 'Politica',
          nodes: [
            {
              key: 'politica_nacional',
              label: 'Politica Nacional',
              nodes: [],
              url: 'https://www.google.com/search?q=dog'
            },
            {
              key: 'politica_regional',
              label: 'Politica Regional',
              nodes: [],
              url: 'https://www.google.com/search?q=fox'
            },
            {
              key: 'politica_internacional',
              label: 'Politica Internacional',
              nodes: [],
              url: 'https://www.google.com/search?q=wolf'
            }
          ],
          url: 'https://www.google.com/search?q=canidae'
        },
        {
          key: 'interes_general',
          label: 'Interes General',
          nodes: [
            {
              key: 'sociedad',
              label: 'Sociedad',
              nodes: [],
              url: 'https://www.google.com/search?q=dog'
            },
            {
              key: 'economia',
              label: 'Economia',
              nodes: [],
              url: 'https://www.google.com/search?q=fox'
            },
            {
              key: 'policiales',
              label: 'Policiales',
              nodes: [],
              url: 'https://www.google.com/search?q=wolf'
            },
            {
              key: 'cultura_espectaculos',
              label: 'Cultura y Espectaculos',
              nodes: [],
              url: 'https://www.google.com/search?q=wolf'
            }
          ],
          url: 'https://www.google.com/search?q=canidae'
        },
        {
          key: 'deportes',
          label: 'Deportes',
          nodes: [
            {
              key: 'deportes_nacionales',
              label: 'Deportes Nacionales',
              nodes: [],
              url: 'https://www.google.com/search?q=dog'
            },
            {
              key: 'deportes_regionales',
              label: 'Deportes Regionales',
              nodes: [],
              url: 'https://www.google.com/search?q=fox'
            },
            {
              key: 'deportes_internacionales',
              label: 'Deportes Internacionales',
              nodes: [],
              url: 'https://www.google.com/search?q=wolf'
            }
          ],
          url: 'https://www.google.com/search?q=canidae'
        },
      ],
      url: 'https://www.google.com/search?q=mammal'
    }
  ];


  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      title,
      body: bodyHtml,
      type,
      dropline,
      copete,
      source,
      bodyHtml,
      bodyJson,
      status,
      category,
      image
    };
    try {
      const response = await api.article.add(data,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response) {
        console.log(response.data);
        // set Message.
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setBodyHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setBodyJson(JSON.stringify(contentState, null, 4))
  }

  const uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID d4ceb0c00a0cfc6');
        const data = new FormData(); // eslint-disable-line no-undef
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      },
    );
  }

  const imageHandler = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('folder', 'articles');
    formData.append('file', file);

    try {
      const response = await api.upload.post(formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
      
      if (response) {
        setImage(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCategory = (item) => {
    const key = item.key.split('/');
    const currentKey = key[key.length - 1]; 
    setCategoryKey(currentKey);
    setCategory(item.label);
    setCategoryParent(item.parent);
  }

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
                        <div className="col-lg-8">
                          <input name="title" value={title} onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Titulo" />
                          {validator.message('Titulo', title, 'required')}
                        </div>
                        <div className="col-lg-4">
                          <select>
                            <option selectedvalue="normal">Normal</option>
                            <option value="featured">Destacada</option>
                            <option value="sponsor">Sponsoreada</option>
                          </select>
                        </div>
                        <div className="col-lg-12">
                          <TreeMenu
                            cacheSearch
                            data={categories}
                            debounceTime={125}
                            disableKeyboard={false}
                            hasSearch={false}
                            onClickItem={handleCategory}
                            resetOpenNodesOnDataUpdate={false}
                            // initialOpenNodes={[
                            //   'category',
                            // ]}
                          />
                        </div>
                        <div className="col-lg-12">
                          <input name="copete" value={copete} onChange={e => setCopete(e.target.value)}
                            type="text"
                            placeholder="Copete" />
                        </div>
                        <div className="col-lg-12">
                          <input name="dropline" value={dropline} onChange={e => setDropline(e.target.value)}
                            type="text"
                            placeholder="Volanta" />
                        </div>
                        <div className="col-12" id="editor">
                          <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editor-textarea"
                            onEditorStateChange={onEditorStateChange}
                            toolbarCustomButtons={[<CustomOption />]}
                            hashtag={{
                              separator: ' ',
                              trigger: '#',
                            }}
                            mention={{
                              separator: ' ',
                              trigger: '@',
                              suggestions: suggestions,
                            }}
                            toolbar={{
                              image: {
                                uploadCallback: uploadImageCallBack,
                                alt: { present: true, mandatory: false },
                              },
                            }}
                          />
                        </div>
                        <div className="col-lg-6">
                          <input name="source" value={source} onChange={e => setSource(e.target.value)}
                            type="text"
                            placeholder="Fuente" />
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
                          <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            multiple={false} 
                            onChange={imageHandler} 
                          />
                          <BeatLoader color="#ff0000" loading={loading} size={12} />
                        </div>
                        <div className="col-12">
                          <div className="space-20" />
                          <button className="cbtn1" type="submit">Guardar</button>
                        </div>
                        <div className="preview">
                          {/* {JSON.stringify(contentState, null, 4)} */}
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
    </>
  );
}

export default FormArticlePage;