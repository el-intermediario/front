import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import CustomOption from './plugins/CustomOption';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import api from "../../../utils/api";
import { useSelector } from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import TreeMenu from 'react-simple-tree-menu';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-simple-tree-menu/dist/main.css';
import { useHistory, useParams } from 'react-router-dom';

const FormArticlePage = () => {
  let { id } = useParams();
  const history = useHistory();
  const { user } = useSelector(state => state.user); 
  const html = '<p>Hey escribe aqui tu <strong>nota</strong> 😀</p>';
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

  const validator = new SimpleReactValidator();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('normal');
  const [section, setSection] = useState('santa_cruz');
  const [dropline, setDropline] = useState('');
  const [source, setSource] = useState('');
  const [copete, setCopete] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [bodyJson, setBodyJson] = useState(null);
  const [status, setStatus] = useState(true);
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

  useEffect(() => {
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (id) => {
    try {
      const response = await api.article.get({id, by: '_id'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        const { data } = response;
        setTitle(data.title);
        setType(data.type);
        setDropline(data.dropline);
        setCopete(data.copete);
        setCategory(data.category);
        setCategoryKey(data.categoryKey);
        setCategoryParent(data.categoryParent);
        setStatus(data.status);
        setImage(data.image);
        setSource(data.source);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      title,
      body: bodyHtml,
      type,
      section,
      dropline,
      copete,
      source,
      bodyHtml,
      bodyJson,
      status,
      category,
      categoryKey,
      categoryParent,
      image
    };
    try {
      const response = await api.article.add(data,
        { headers: user.headers }
      );
      
      if (response) {
        history.push('/articulos', {message: 'El articulo se creo correctamente.'});
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

  const uploadImageCallBack = async (file) => {
    const formData = new FormData();
    formData.append('folder', 'articles');
    formData.append('file', file);

    try {
      const response = await api.upload.post(formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
      
      if (response) {
        console.log(response.data);
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: response.data, file } });
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    /*
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
    );*/
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

  const embedCallBack = (link) => {
    if (link.indexOf("youtube") >= 0){
        link = link.replace("watch?v=","embed/");
        link = link.replace("/watch/", "/embed/");
        link = link.replace("youtu.be/","youtube.com/embed/");
    }
    if (link.indexOf("vimeo") >= 0){
      link = link.replace("vimeo.com","player.vimeo.com/video");
    }
    return link
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
                    <h3>{id ? 'Editar' : 'Crear'} nota!</h3>
                  </div>
                  <div className="col-12">
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-lg-12">
                          <input name="title" value={title} onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Titulo" />
                          {validator.message('Titulo', title, 'required')}
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
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                uploadCallback: uploadImageCallBack,
                                alt: { present: true, mandatory: false },
                              },
                              embedded: {
                                //icon: embedded,
                                embedCallback: embedCallBack,
                                defaultSize: {
                                  height: '240px',
                                  width: 'auto',
                                },
                              },
                            }}
                          />
                        </div>
                        <div className="col-8">
                          <label>Imagen</label>
                          <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            multiple={false} 
                            onChange={imageHandler} 
                          />
                        </div>
                        <div className="col-4">
                          {!image ? (
                            <BeatLoader color="#ff0000" loading={loading} size={12} />
                          ) : (
                            <img src={image} width={80} height={60} />
                          )}
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
              <div className="col-12">
                <label>Seccion: </label>
                <select onChange={(e) => setSection(e.target.value)}>
                  <option selectedvalue="santa_cruz">Santa Cruz</option>
                  <option value="patagonia">Patagonia</option>
                  <option value="argentina">Argentina</option>
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
              <div className="col-12">
                <label>Tipo de nota: </label>
                <select onChange={(e) => setType(e.target.value)}>
                  <option selectedvalue="normal">Normal</option>
                  <option value="featured">Destacada</option>
                  <option value="sponsor">Sponsoreada</option>
                </select>
              </div>
              <div className="col-12">
                <input name="source" value={source} onChange={e => setSource(e.target.value)}
                  type="text"
                  placeholder="Fuente" />
              </div>
              <div className="col-12">
                <input name="status"
                  checked={status}
                  value={status} 
                  onChange={e => setStatus(!e.target.checked)}
                  type="checkbox" 
                />
                <label>Publicar</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormArticlePage;