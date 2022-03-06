import React, { useState, useRef } from "react";
import Loading from 'react-fullscreen-loading';
import { useHistory } from 'react-router-dom';
import BannerSection from "../../../components/BannerSection";
import FollowUs from "../../../components/FollowUs";
import { Button } from 'reactstrap';
import api from "../../../utils/api";
import AlertMessage from "../../../components/AlertMessage";


const FormVideoPage = () => {
  const history = useHistory();
  const fileInput = useRef(null);
  const videoElem = useRef();
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('youtube');
  const [videoId, setVideoId] = useState('');
  const [videoSource, setVideoSource] = useState(null);
  const [fileSource, setFileSource] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [message, setMessage] = useState(null);
  const [inHome, setInHome] = useState(true);

  const videoHandler = async (event) => {
    const file = event.target.files[0];
    setFileSource(file);

    const formData = new FormData();
    formData.append('folder', 'videos');
    formData.append('file', file);

    setVideoSource(formData);
  }
  
  const submitHandler = async (event) => {
    setLoader(true);
    event.preventDefault();
    if (!title) {
      setMessage('Debes agregar un titulo.');
      return;
    }

    if (type !== 'custom') {
      const data = {
        title,
        type,
        content: videoId,
        mimetype: null,
        thumbnail: null,
        inHome
      };
      
      try {
        const response = await api.video.post(data, {
          header: { "Content-Type": "application/json" },
        });
        if (response.data) {
          history.push('/admin', {type: 'success', message: 'El video se creo correctamente.'});
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
      return;
    }

    if (!videoSource && type === 'custom') {
      setMessage('Debes subir un video.');
      return;
    } else {
      // Upload video.
      try {
        const formData = new FormData();
        formData.append('folder', 'videos');
        formData.append('file', imageSource.file, imageSource.imgName);
        const responseImage = await api.upload.post(formData, { headers: {
          'Content-Type': 'multipart/form-data'
        }});

        if (responseImage) {
          const responseUpload = await api.uploadVideo.post(videoSource, { headers: {
            'Content-Type': 'multipart/form-data'
          }});
          
          if (responseUpload) {
            const data = {
              title,
              type: 'custom',
              content: responseUpload.data.src,
              mimetype: responseUpload.data.file.mimetype,
              thumbnail: responseImage.data.src,
              inHome
            };
            
            try {
              const response = await api.video.post(data, {
                header: { "Content-Type": "application/json" },
              });
              if (response) {
                setLoader(false);
                history.push('/admin', {type: 'success', message: 'El video se creo correctamente.'});
              }
            } catch (error) {
              console.log(error);
            }
          }
        }

      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };

  const captureThumbnail = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoElem.current.videoWidth;
    canvas.height = videoElem.current.videoHeight;
    canvas.imageSmoothingQuality = 'medium';

    canvas.getContext("2d")
      .drawImage(
        videoElem.current,
        0,
        0,
        videoElem.current.videoWidth,
        videoElem.current.videoHeight
      );
    
      const img = canvas.toDataURL('image/jpeg');
      const file = dataURItoBlob(img);
      const imgName = fileSource.name.replace('mp4', 'jpeg');
      setImgSrc(canvas.toDataURL(), imgName);
      setImageSource({file, imgName});
  };

  const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }

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
              {message && <AlertMessage message={message} type="danger" />}
              <div className="cotact_form">
                <div className="row">
                  <div className="col-12">
                    <h3>Nuevo video</h3>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          placeholder="Titulo"
                        />
                      </div>
                      {type === 'custom' ? (
                        <div className="col-lg-6">
                          <input 
                            ref={fileInput}
                            type="file" 
                            name="video" 
                            accept="video/*" 
                            style={{ display: "none" }}
                            multiple={false} 
                            onChange={videoHandler} 
                          />
                          <Button 
                            color="info" 
                            onClick={() => fileInput.current.click()}>
                              Subir video
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12">
                    <label>Tipo de video: </label>
                    <select onChange={(e) => setType(e.target.value)}>
                      <option selectedvalue="youtube" value="youtube">Youtube</option>
                      <option value="vimeo">Vimeo</option>
                      <option value="custom">Subir video</option>
                    </select>
                  </div>
                  {type === 'custom' ? (
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-8">
                          {videoSource ? (
                            <video
                              id="video"
                              className="col-12"
                              ref={videoElem}
                              src={URL.createObjectURL(fileSource)}
                              type="video/mp4"
                              controls
                            ></video>
                          ) : null}
                        </div>
                        <div className="col-lg-4">
                          {fileSource && <Button color="secondary" onClick={captureThumbnail}>Capturar miniatura</Button>}
                          {imgSrc ? (
                            <div>
                              <img className="w-160" src={imgSrc} alt="" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {type === 'youtube' || type === 'vimeo' ? (
                    <div className="col-lg-6">
                      <input
                        name="videoId"
                        value={videoId}
                        onChange={(e) => setVideoId(e.target.value)}
                        type="text"
                        placeholder="Video Id"
                        description="Pegar el id de video."
                      />
                    </div>
                  ) : null}
                  <div className="col-12">
                    <input name="inhome"
                      checked={inHome}
                      value={inHome} 
                      onChange={e => setInHome(e.target.checked)}
                      type="checkbox" 
                    />
                    <label>Mostrar en pagina principal</label>
                  </div>
                  <div className="col-12">
                    <div className="space-20" />
                    <button 
                      className="cbtn1" 
                      type="submit"
                      onClick={submitHandler}
                    >
                      Guardar
                    </button>
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
};

export default FormVideoPage;
