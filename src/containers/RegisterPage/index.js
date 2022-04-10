import React, { useState } from 'react';
import BannerSection from "../../components/BannerSection";
import FollowUs from "../../components/FollowUs";
import SimpleReactValidator from 'simple-react-validator';
import api from "../../utils/api";
import { useSelector } from "react-redux"
import { useHistory } from 'react-router';

const RegisterPage = () => {
  const history = useHistory();
  const { user } = useSelector(state => state.user);
  const validator = new SimpleReactValidator();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const register = async (e) => {
    e.preventDefault();

    if (email && password) {
      let response = null;
      try {
        response = await api.auth.register(
          { email, password, firstName, lastName},
          { headers: user.headers }
        );
      } catch (err) {
        console.log(err.response.status);
        console.log(err.response.data.message);
      }

      if (response) {
        console.log(response);
        history.push('/admin', {type: 'success', message: 'El usuario se creo correctamente.'});
      }
    }
  };

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
                    <h3>Crear Usuario</h3>
                  </div>
                  <div className="col-12">
                    <form onSubmit={register}>
                      <div className="row">
                        <div className="col-lg-6">
                          <input name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)}
                            type="text"
                            placeholder="Nombre" />
                          {validator.message('Nombre', firstName, 'required')}
                        </div>
                        <div className="col-lg-6">
                          <input name="lastName" value={lastName} onChange={e => setLastName(e.target.value)}
                            type="text"
                            placeholder="Apellido" />
                          {validator.message('Nombre', lastName, 'required')}
                        </div>
                        <div className="col-lg-6">
                          <input name="email" value={email} onChange={e => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email" />
                          {validator.message('Email', email, 'required')}
                        </div>
                        <div className="col-lg-6">
                          <input name="password" value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                          />
                          {validator.message('Password', password, 'required')}
                        </div>
                        <div className="col-12">
                          <div className="space-20" />
                          <button className="cbtn1" type="submit">Crear usuario</button>
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

export default RegisterPage;