import React, { useState } from 'react';
import BannerSection from "../../components/BannerSection";
import FollowUs from "../../components/FollowUs";
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const {user} = useSelector(state => state.user);

  console.log(user);
  return (
    <>
      {/*contact form area*/}
      <div className="contact_form padding-bottom">
        <div className="container">
          <div className="space-50" />
          <div className="row">
            <div className="col-lg-8">
              <div className="cotact_form">
                <div className="row">
                  <div className="col-12">
                    <h3>Bienvenido {user && user.firstName}</h3>
                  </div>
                  <div className="col-12">
                    Dashboard 
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

export default AdminPage;