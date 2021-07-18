import React, {useState} from 'react';
import BannerSection from "../../components/BannerSection";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import NewsLetter from "../../components/NewsLetter";
import FollowUs from "../../components/FollowUs";
import SimpleReactValidator from 'simple-react-validator';
import {toast} from "react-toastify";

import scrollIcon from '../../doc/img/icon/scroll.png';
import black_phone from '../../doc/img/icon/black_phone.png';

const LoginPage = () => {
    const validator = new SimpleReactValidator();
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);

    const submitHandler = () => {

    }
    /*
    submitHandler = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
            toast.success('You submitted the form and stuff!')
            this.setState({
                name: '',
                subject: '',
                email: '',
                phone: '',
                message: '',
            });
            this.validator.hideMessages()
        } else {
            toast.error('Please fill the input');
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    };*/

    return (
        <>
            {/*contact form area*/}
            <div className="contact_form padding-bottom">
                <div className="container">
                    <div className="space-50"/>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="cotact_form">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Ingresar!</h3>
                                    </div>
                                    <div className="col-12">
                                        <form onSubmit={submitHandler}>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <input name="email" value={email} onChange={e => setEmail(e.target.value)}
                                                        type="text"
                                                        placeholder="Email"/>
                                                    {validator.message('Email', email, 'required')}
                                                </div>
                                                <div className="col-lg-6">
                                                    <input name="pass" value={pass}
                                                        onChange={e => setPass(e.target.value)} 
                                                        type="password"
                                                        placeholder="Password"
                                                    />
                                                    {validator.message('Password', pass, 'required')}
                                                </div>
                                                <div className="col-12">
                                                    <div className="space-20"/>
                                                    <button className="cbtn1" type="submit">Ingresar</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <FollowUs title="Redes Sociales"/>
                        </div>
                    </div>
                </div>
            </div>
            <BannerSection/>
        </>
    );
}

export default LoginPage;