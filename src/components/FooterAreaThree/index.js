import React from 'react';
import {Link} from "react-router-dom";

const FooterAreaThree = () => {
    return (
        <div className="footer footer_area3 ">
            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 align-self-center">
                            <p>&copy; Copyright 2021, Todos los derechos reservados</p>
                        </div>
                        <div className="col-lg-6 align-self-center">
                            <div className="copyright_menus text-right">
                                <div className="language"/>
                                <div className="copyright_menu inline">
                                    <ul>
                                        <li><Link to="/">Quienes somos?</Link></li>
                                        <li><Link to="/">Pliticas de privacidad</Link></li>
                                        <li><Link to="/">Contactenos</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterAreaThree;