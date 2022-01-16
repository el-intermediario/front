import React, { useState, useEffect, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import CustomOption from './plugins/CustomOption';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, AtomicBlockUtils } from 'draft-js';
import api from "../../../utils/api";
import { useSelector } from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import TreeMenu from 'react-simple-tree-menu';
import ReactTags from 'react-tag-autocomplete';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-simple-tree-menu/dist/main.css';
import { useHistory, useParams } from 'react-router-dom';
import es from './es.js';
import ReferenceArticle from './plugins/ReferenceArticle';
import ArticleReferenceBtn from './plugins/ArticleReferenceBtn';
import Swal from 'sweetalert2';
import CustomAutocomplete from '../../../components/CustomAutocomplete';
import "./editor.scss";
import UploadImage from '../../../components/UploadImage/uploadImage';

const FormArticlePage = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const { user } = useSelector(state => state.user); 
  const html = '';
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
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  //custom buttons per editorState
  const [showModal, setShowModal] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [articleReferenceSelected, setArticleReferenceSelected] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (type) => {
    try {
      const response = await api.category.get({type: 'articles'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
        setStatus(data.status);
        setImage(data.image);
        setSource(data.source);
        setTags(data.tags);
        setBodyHtml(data.body);

        const contentBlock = htmlToDraft(data.body);
        const newData = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(newData));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    let data = {
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
      image,
      tags
    };

    try {
      const response = null;
      if (props.match.path === '/admin/article/:id/edit') {
        data = {...data, id, updated: parseInt(Date.now()/1000)};
        response = await api.article.put(data, { headers: user.headers });  
      } else {
        data.created = parseInt(Date.now()/1000);
        data.updated = parseInt(Date.now()/1000);
        response = await api.article.post(data, { headers: user.headers });
      }
      
      if (response) {
        history.push('/admin/article', {type: 'success', message: 'El articulo se creo correctamente.'});
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
    setCategory({
      key: currentKey,
      name: item.label,
      parent: item.parent,
      initial: item.key
    });
  }

  const embedCallBack = (link) => {
    console.log(link);
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

  const onTagDelete = (i) => {
    setTags(prevState => {
      const tags = prevState.slice(0);
      tags.splice(i, 1);
      setTags(tags);
    });
  }

  const onTagAddition = (tag) => {
    setTags([...tags, tag]);
  }

  // Functions to insert block reference.
  const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: ReferenceArticle,
        editable: false,
        props: { data : null},
      };
    }

    return null;
  };

  const confirmReference = (e) => {
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
      {currentContent: contentStateWithEntity}
    );

    setEditorState(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    ));
    setShowModal(false);
    setUrlValue('');
  };

  const addArticleReference = async (contentBlock) => {
    setShowModal(true);
  }

  // Upload Image.
  const uploadImage = async (file, name) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('folder', 'articles');
    formData.append('file', file, name);

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

  return (
    <>
      <div className="page-article padding-bottom">
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
                            localization={{
                              locale: 'es',
                              translations: es
                            }}
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editor-textarea"
                            onEditorStateChange={onEditorStateChange}
                            toolbarCustomButtons={[
                              <CustomOption />, 
                              <ArticleReferenceBtn addArticleReference={addArticleReference}/>
                            ]}
                            hashtag={{
                              separator: ' ',
                              trigger: '#',
                            }}
                            toolbar={{
                              image: {
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                uploadCallback: uploadImageCallBack,
                                alt: { present: true, mandatory: false },
                              },
                              embedded: {
                                // icon: embedded,
                                embedCallback: embedCallBack,
                                defaultSize: {
                                  height: '240px',
                                  width: 'auto',
                                },
                              },
                            }}
                            // blockRendererFn={() => ({
                            //   component: CustomAutocomplete,
                            //   editable: false,
                            // })}
                            blockRendererFn={mediaBlockRenderer}
                          />
                          {showModal ? (
                            <div className="rdw-embedded-modal">
                              <CustomAutocomplete handleItemSelected={(data) => setArticleReferenceSelected(data)} />
                              <button onMouseDown={confirmReference}>
                                Confirmar
                              </button>
                            </div>
                          ) : null}
                        </div>
                        <UploadImage handleImage={uploadImage} />
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
                {id && category ? (
                  <TreeMenu
                    cacheSearch
                    data={categories}
                    debounceTime={125}
                    disableKeyboard={false}
                    hasSearch={false}
                    onClickItem={handleCategory}
                    initialActiveKey={category ? category.initial : ''}
                    initialOpenNodes={['category', category.parent]}
                    resetOpenNodesOnDataUpdate={false}
                  />
                ) : null}

                {!id ? (
                  <TreeMenu
                    cacheSearch
                    data={categories}
                    debounceTime={125}
                    disableKeyboard={false}
                    hasSearch={false}
                    onClickItem={handleCategory}
                    initialOpenNodes={['category']}
                    resetOpenNodesOnDataUpdate={false}
                  />
                ) : null}
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
                <ReactTags
                  //ref={reactTags}
                  tags={tags}
                  onDelete={onTagDelete}
                  onAddition={onTagAddition}
                  autoresize={false}
                  placeholderText="Nuevo tag"
                  delimiters={['Enter', 'Tab']}
                  allowNew={true}
                  minQueryLength={3}
                />
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