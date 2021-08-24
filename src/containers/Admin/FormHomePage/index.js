import React from 'react';
import BannerSection from "../../../components/BannerSection";
import Home from "./home";
import Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./styles.css";

const FormHomePage = () => {
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
                      <Home />
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