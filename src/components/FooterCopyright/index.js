import React, {memo} from 'react';
import Moment from 'react-moment';
import {Link} from "react-router-dom";
import logoFooter from '../../doc/img/logo.png';

const quick_links = [
    {
        name: 'Nosotros',
        link: '/seccion/quienes-somos'
    },
    {
        name: 'Politicas de Privacidad',
        link: '/seccion/politicas-de-privacidad'
    },
];

const FooterCopyright = () => {
    return (
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                        <img src={logoFooter} width="300px" height="auto" alt="elintermediario logo"/>
                        <p>&copy; Copyright <Moment format="YYYY" locale="es">
                  {Date.now()}</Moment>, Todos los derechos reservados</p>
                    </div>
                    <div className="col-lg-6 align-self-center">
                        <div className="copyright_menus text-right">
                            <div className="language"/>
                            <div className="copyright_menu inline">
                                <ul>
                                    {quick_links.map((item, i) => (
                                        <li key={i}><Link to={item.link}>{item.name}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(FooterCopyright);