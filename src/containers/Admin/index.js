import React from 'react';
import FollowUs from "../../components/FollowUs";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import AlertMessage from '../../components/AlertMessage';

const AdminPage = () => {
  const location = useLocation();
  const {user} = useSelector(state => state.user);

  return (
    <>
      {/*contact form area*/}
      <div className="contact_form padding-bottom">
        <div className="container">
          <div className="space-50" />
          <div className="row">
            <div className="col-lg-8">
              <div className="cotact_form">
                <div className="col-12">
                  <div className="col-12">
                    {!location.state && <h3>Bienvenido {user && user.firstName}</h3>}
                  </div>
                  {location.state && <AlertMessage message={location.state.message} type={location.state.type} />}
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
    </>
  );
}

export default AdminPage;