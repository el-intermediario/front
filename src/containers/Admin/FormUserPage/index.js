import React, { useState } from 'react';
import BannerSection from "../../../components/BannerSection";
import FollowUs from "../../../components/FollowUs";
import SimpleReactValidator from 'simple-react-validator';
import api from '../../../utils/api';

const FormUserPage = () => {
  const validator = new SimpleReactValidator();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      email,
      pass
    }
    try {
      const response = await api.user.post(data,
        { header: { 'Content-Type': 'application/json' } }
        );
        if (response) {
          history.push('/admin/users', {type: 'success', message: 'El usuario se creo correctamente.'});
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
                    <h3>Crear usuario!</h3>
                  </div>
                  <div className="col-12">
                    <form onSubmit={(e) => submitHandler(e)}>
                      <div className="row">
                        <div className="col-lg-6">
                          <input name="email" value={email} onChange={e => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email" />
                          {validator.message('Email', title, 'required')}
                        </div>
                        <div className="col-lg-6">
                          <input name="password" value={pass} onChange={e => setPass(e.target.value)}
                            type="password"
                            placeholder="Clave" />
                          {validator.message('Clave', title, 'required')}
                        </div>
                        <div className="col-12">
                          <div className="space-20" />
                          <button className="cbtn1" type="submit">Crear</button>
                        </div>
                      </div>
                    </form>
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

export default FormUserPage;