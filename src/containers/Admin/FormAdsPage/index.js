import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormGroup } from 'reactstrap';
import Loading from 'react-fullscreen-loading';

import BannerSection from "../../../components/BannerSection";
import FollowUs from "../../../components/FollowUs";
import api from '../../../utils/api';
import UploadImage from '../../../components/UploadImage/uploadImage';

const FormAdsPage = () => {
  const history = new useHistory();
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
    fetchCategories();
  }, []);

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

  // Upload Image.
  const uploadImage = async (file, name) => {
    const formData = new FormData();
    formData.append('folder', 'ads');
    formData.append('file', file, name);

    try {
      const response = await api.upload.post(formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
      
      if (response.data) {
        setImage(response.data.src);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async (event) => {
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
      const response = await api.ad.add(data,
        { header: user.headers }
        );
        if (response.data) {
          setLoader(false);
          return history.push('/admin', {type: 'success', message: 'La publicidad se creo correctamente.'});
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
                          <UploadImage handleImage={uploadImage} handleCrop={false} />
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