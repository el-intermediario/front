import React, { useEffect, useState } from "react";
import Loading from 'react-fullscreen-loading';
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { convertToRaw } from "draft-js";

import api from "../../../utils/api";
import MyEditor from "../../../components/MyEditor";

const FormSectionPage = (props) => {
  const history = new useHistory();
  let { id } = useParams();
  const { user } = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const [bodyData, setBodyData] = useState('');
  const [data, setData] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    if (id) {
      fetchSection(id);
    } else {
      setData({
        title: '',
        body: '',
      });
    }
  }, [id]);

  const fetchSection = async (id) => {
    try {
      const response = await api.page.get({id, by: '_id'},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        const { data } = response;
        setData({
          title: data.title,
          body: data.body
        });

        setBodyData(data.body);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const submitHandler = async (event) => {
    setLoader(true);
    event.preventDefault();

    try {
      let response;
      if (props.match.path === '/admin/sections/:id/edit') {
        let updatedData = {...data, id, updated: parseInt(Date.now()/1000)};
        response = await api.page.put(updatedData, { headers: user.headers });
      } else {
        response = await api.page.add(data, { headers: user.headers });
      }
      if (response) {
        setLoader(false);
        return history.push('/admin', {type: 'success', message: 'La seccion se creo o actualizo correctamente.'});
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
                          <MyEditor handleEditorState={handleEditorState} currentEditorState={bodyData} />
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
