import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FormGroup } from 'reactstrap';
import Loading from 'react-fullscreen-loading';

import BannerSection from "../../../components/BannerSection";
import FollowUs from "../../../components/FollowUs";
import api from '../../../utils/api';
import FileUpload from '../../../components/FileUpload';

const FormAdsPage = (props) => {
  const history = new useHistory();
  let { id } = useParams();
  const { user } = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('normal');
  const [size, setSize] = useState('350x250');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(true);
  const types = [
    {
      key: 'normal',
      label: 'Normal'
    },
    {
      key: 'basic',
      label: 'Basico'
    },
    {
      key: 'premium',
      label: 'Premium'
    },
    {
      key: 'featured',
      label: 'Destacada'
    }
  ];
  const sizes = ["350x250", "390x312", "810x100", "970x250", "1080x840", "portada_superior"];
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState(['home']);

  useEffect(() => {
    if (id) {
      fetchAd(id);
    } else {
      setTitle('');
      setSize('350x250');
      setType('normal');
      setUrl('');
      setImage(null);
      setStatus(true);
      setCheckedCategories([]);
    }
  }, [id]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchAd = async (id) => {
    try {
      const response = await api.ad.get({id, by: '_id'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        const { data } = response;
        setTitle(data.name);
        setSize(data.size);
        setType(data.type);
        setUrl(data.url);
        setImage(data.image);
        setStatus(data.status);
        setCheckedCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCategories = async (type) => {
    try {
      const response = await api.category.get({type: 'articles'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data && response.data.data[0]) {
        // Agrego la categori home al principio.
        response.data.data[0].nodes.unshift({
          key: 'home',
          label: 'Portada'
        });
        setCategories(response.data.data[0].nodes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async (event) => {
    setLoader(true);
    event.preventDefault();

    const data = {
      name: title,
      type,
      size,
      image,
      url,
      status,
      categories: checkedCategories
    }

    try {
      let response = null;
      if (props.match.path === '/admin/ad/:id/edit') {
        response = await api.ad.put({data, id}, { headers: user.headers });  
      } else {
        data.created = parseInt(Date.now()/1000);
        data.updated = parseInt(Date.now()/1000);
        response = await api.ad.add(data, { header: user.headers });
      }
      if (response.data) {
        setLoader(false);
        return history.push('/admin', {type: 'success', message: 'La publicidad se creo/actualizo correctamente.'});
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }

  const handleCategories = event => {
    const { checked, value } = event.currentTarget;

    setCheckedCategories(
      prev => checked
        ? [...prev, value] // si el check es true agregarmos el elemento al array.
        : prev.filter(val => val !== value) // si es false, lo buscamos y lo quitamos.
    )
  }

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
        setImage(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Apply loading when save content.
  if (loader) {
    return <Loading loading background="#ffffff" loaderColor="#14A5C0" />
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
                    <h3>Crear Publicidad</h3>
                  </div>
                  <div className="col-12">
                      <div className="row">
                        <div className="col-6">
                          <input name="title" value={title} onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Titulo" />
                        </div>
                        <div className="col-6">
                          <label>Tipo: </label>
                          <select onChange={(e) => setType(e.target.value)}>
                            {types.map((item, i) => {
                              return <option key={i} value={item.key}>{item.label}</option>
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label>Dimensiones: </label>
                          <select onChange={(e) => setSize(e.target.value)}>
                            {sizes.map((item, i) => {
                              return <option key={i} value={item}>{item}</option>
                            })}
                          </select>
                        </div>
                        <div className="col-6">
                          <input name="url" value={url} onChange={e => setUrl(e.target.value)}
                            type="text"
                            placeholder="Enlace" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p>Secciones donde aparece:</p>
                          {categories.map(({ key, label }, index) => {
                            return (
                              <FormGroup check inline key={index}>
                                <input
                                  type="checkbox"
                                  id={`custom-checkbox-${index}`}
                                  name={label}
                                  value={key}
                                  checked={checkedCategories.some(val => val === key)}
                                  onChange={handleCategories} 
                                />
                                <label htmlFor={`custom-checkbox-${index}`}>{label}</label>
                              </FormGroup>
                            );
                          })}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <FileUpload
                            initialFiles={image ? [image] : []}
                            maxFiles={1}
                            handleInitialFiles={(data) => setImage(data[0])}
                            handleFiles={(files) => handleFiles(files, 'ads')}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <input name="status"
                            checked={status}
                            onChange={e => setStatus(e.target.checked)}
                            type="checkbox" 
                          />
                          <label>Publicar</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="space-20" />
                          <button 
                            className="cbtn1" 
                            type="submit"
                            onClick={(e) => submitHandler(e)}
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
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

export default FormAdsPage;