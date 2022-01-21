import React, { useState } from 'react';
import BannerSection from "../../../components/BannerSection";
import FollowUs from "../../../components/FollowUs";
import api from '../../../utils/api';
import UploadImage from '../../../components/UploadImage/uploadImage';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const FormAdsPage = () => {
  const history = new useHistory();
  const { user } = useSelector(state => state.user);
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
  const sizes = ["350x250", "390x312", "810x100", "970x250", "1080x840"];

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
        setImage(response.data.key);
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
      status
    }
    try {
      const response = await api.ad.add(data,
        { header: user.headers }
        );
        if (response.data) {
          return history.push('/admin', {type: 'success', message: 'La publicidad se creo correctamente.'});
        }
    } catch (error) {
      console.log(error);
    }
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
                          <UploadImage handleImage={uploadImage} handleCrop={false} />
                        </div>
                      </div>
                      <div className="row">
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