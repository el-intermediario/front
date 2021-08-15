import React, { useState } from 'react';
import BannerSection from "../../../components/BannerSection";
import FollowUs from "../../../components/FollowUs";
import SimpleReactValidator from 'simple-react-validator';
import api from "../../../utils/api";
import { userLogin } from '../../../store/actions/index';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {user} = useSelector(state => state.user);
  const validator = new SimpleReactValidator();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    if (!isLoading) {

      if (email && password) {
        let response = null;
        try {
          response = await api.auth.login(
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
          );
        } catch (err) {

        }

        if (response) {
          dispatch(userLogin(response.data));
          history.push('/admin');
          // redirect to dashboard of notes.
        }
      }
    }
  };

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
                    <h3>Ingresar!</h3>
                  </div>
                  <div className="col-12">
                    <form onSubmit={login}>
                      <div className="row">
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
                          <button className="cbtn1" type="submit">Ingresar</button>
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

export default LoginPage;