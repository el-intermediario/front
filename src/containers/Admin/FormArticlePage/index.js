import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import CustomOption from './plugins/CustomOption';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import api from "../../../utils/api";
import { useSelector } from 'react-redux';
import htmlToDraft from 'html-to-draftjs';
import TreeMenu from 'react-simple-tree-menu';
import ReactTags from 'react-tag-autocomplete';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-simple-tree-menu/dist/main.css';
import { useHistory, useParams } from 'react-router-dom';
import es from './es.js';
import CustomBlock from './plugins/CustomBlock';
import ArticleReference from './plugins/ArticleReference';
import "./styles.scss";
import UploadImage from '../../../components/UploadImage/uploadImage';
import BlockQuote from './plugins/BlockQuote';

const FormArticlePage = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const { user } = useSelector(state => state.user); 
  const html = '';
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

  const validator = new SimpleReactValidator();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('normal');
  const [section, setSection] = useState('santa_cruz');
  const [dropline, setDropline] = useState('');
  const [source, setSource] = useState('');
  const [copete, setCopete] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
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
    } else {
      setTitle('');
      setBodyHtml('');
      setType('normal');
      setDropline('');
      setCopete('');
      setSource('');
      setTags([]);
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

        const contentState = convertFromRaw(JSON.parse(data.bodyData));
        setEditorState(EditorState.createWithContent(contentState));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    let newImage; 

    if (croppedImage) {
      const formData = new FormData();
      formData.append('folder', 'articles');
      formData.append('file', croppedImage.file, croppedImage.name);
      
      try {
        const responseImage = await api.upload.post(formData, { headers: {
          'Content-Type': 'multipart/form-data'
        }});
        
        if (responseImage) {
          newImage = responseImage.data.src;
        }
      } catch (error) {
        console.log(error);
      }
    }

    let data = {
      title,
      body: bodyHtml,
      type,
      section,
      dropline,
      copete,
      source,
      bodyData: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      status,
      category,
      image: newImage ? newImage : image,
      tags
    };

    try {
      let response = null;
      if (props.match.path === '/admin/article/:id/edit') {
        data = {...data, id, updated: parseInt(Date.now()/1000)};
        response = await api.article.put(data, { headers: user.headers });  
      } else {
        data.created = parseInt(Date.now()/1000);
        data.updated = parseInt(Date.now()/1000);
        response = await api.article.post(data, { headers: user.headers });
      }
      
      if (response.data) {
        return history.push('/admin/article', {type: 'success', message: 'El articulo se creo/actualizo correctamente.'});
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
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
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: `${api.space}${response.data.src}`, file } });
          }
        );
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
        component: CustomBlock,
        editable: false,
        props: { data : null},
      };
    }

    return null;
  };

  // Upload Image.
  const uploadImage = async (file, name) => {
    setCroppedImage({file, name});
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
                  <div className="col-12 field-title">
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-lg-12">
                          <input name="title" value={title} onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Titulo" />
                          {validator.message('Titulo', title, 'required')}
                        </div>
                      </div>
                      <div className="row">  
                        <div className="col-lg-6 field-copete">
                          <input name="copete" value={copete} onChange={e => setCopete(e.target.value)}
                            type="text"
                            placeholder="Copete" />
                        </div>
                        <div className="col-lg-6 field-dropline">
                          <input name="dropline" value={dropline} onChange={e => setDropline(e.target.value)}
                            type="text"
                            placeholder="Volanta" />
                        </div>
                        <div className="col-12 field-editor" id="editor">
                          <Editor
                            localization={{
                              locale: 'es',
                              translations: es
                            }}
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editor-textarea"
                            toolbarCustomButtons={[
                              <CustomOption />, 
                              <ArticleReference />,
                              <BlockQuote />
                            ]}
                            hashtag={{
                              separator: ' ',
                              trigger: '#',
                            }}
                            toolbar={{
                              image: {
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png',
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
                            blockRendererFn={mediaBlockRenderer}
                            onEditorStateChange={onEditorStateChange}
                          />
                        </div>
                        <div className="col-12">
                          <UploadImage handleImage={uploadImage} handleCrop={true} />
                          {image && id && <img src={`${api.space}${image}`} width="200px" />}
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
              <div className="col-12 field-section">
                <label>Seccion</label>
                <select onChange={(e) => setSection(e.target.value)}>
                  <option selectedvalue="santa_cruz">Santa Cruz</option>
                  <option value="patagonia">Patagonia</option>
                  <option value="argentina">Argentina</option>
                </select>
              </div>
              <div className="col-lg-12 field-category">
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
              <div className="col-12 field-type">
                <label>Tipo de nota: </label>
                <select onChange={(e) => setType(e.target.value)}>
                  <option selectedvalue="normal">Normal</option>
                  <option value="featured">Destacada</option>
                  <option value="sponsor">Sponsoreada</option>
                </select>
              </div>
              <div className="col-12 field-source">
                <input name="source" value={source} onChange={e => setSource(e.target.value)}
                  type="text"
                  placeholder="Fuente" />
              </div>
              <div className="col-12 field-tags">
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
              <div className="col-12 field-status">
                <input 
                  checked={status}
                  name="status"
                  onChange={e => setStatus(e.target.checked)}
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