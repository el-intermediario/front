import React, { useState, useEffect } from 'react';
import BannerSection from "../../../components/BannerSection";
import Home from "./home";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./styles.scss";
import { useLocation } from 'react-router-dom';
import api from '../../../utils/api';

const FormHomePage = () => {
  const location = useLocation();
  const params = location.pathname.split('/');
  const [cover, setCover] = useState(null);

  useEffect(() => {
    if (params.includes('edit')) {
      fetchHome();
    } else {
      setCover(null);
    }
  }, [params.includes('edit')]);

  const fetchHome = async () => {
    try {
      const response = await api.cover.getCurrent('?current=true',
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        setCover(response.data);
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
            <div className="col-lg-12">
              <div className="cotact_form">
                <div className="row">
                  <div className="col-12">
                    <h3>Editar Home</h3>
                  </div>
                  <div className="col-12 home-edit">
                    <DndProvider backend={Backend}>
                      <Home cover={cover} />
                    </DndProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BannerSection />
    </>
  );
}

export default FormHomePage;