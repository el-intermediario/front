import React, { useState } from "react";
import Loading from 'react-fullscreen-loading';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html'

import api from "../../../utils/api";
import MyEditor from "../../../components/MyEditor";

const FormSectionPage = () => {
  const history = new useHistory();
  const { user } = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    title: '',
    body: '',
    bodyHtml: null
  });
  
  const submitHandler = async (event) => {
    setLoader(true);
    event.preventDefault();

    try {
      const response = await api.page.add(data, { headers: user.headers });
      if (response) {
        setLoader(false);
        return history.push('/admin', {type: 'success', message: 'La seccion se creo correctamente.'});
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleEditorState = (editorState) => {
    const bodyRaw = convertToRaw(editorState.getCurrentContent());
    setData({
      ...data, 
      body: JSON.stringify(bodyRaw), 
      bodyHtml: draftToHtml(bodyRaw)
    })
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
              <div className="cotact_form">
                <div className="row">
                  <div className="col-12">
                    <h3>Agregar Pagina</h3>
                  </div>
                  <div className="col-12">
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            name="title"
                            value={data.title}
                            onChange={(e) => setData({...data, title: e.target.value})}
                            type="text"
                            placeholder="Titulo"
                          />
                        </div>
                      </div>
                      <div className="space-20" />
                      <div className="row">  
                        <div className="col-lg-12  field-editor">
                          <MyEditor handleEditorState={handleEditorState}/>
                        </div>
                        <div className="col-12">
                          <div className="space-20" />
                          <button className="cbtn1" type="submit">
                            Guardar
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSectionPage;
