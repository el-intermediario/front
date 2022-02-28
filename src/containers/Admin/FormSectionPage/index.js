import React, { useState } from "react";
import api from "../../../utils/api";
import MyEditor from "../../../components/MyEditor";

const FormSectionPage = () => {
  const [data, setData] = useState({
    title: '',
    body: '',
  });
  
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await api.page.add(data, {
        header: { "Content-Type": "application/json" },
      });
      if (response) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBodyData = (body) => {
    setData({...data, body})
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
                          <MyEditor handleBody={handleBodyData}/>
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
