import React, {memo} from 'react';
import {Link} from "react-router-dom";
import FooterCopyright from "../FooterCopyright";
import FooterNewsCategories from "../FooterNewsCategories";

const FooterArea = ({className}) => {
    return (
        <div className={`footer footer_area1 ${className ? className : ''}`}>
            <div className="container">
                {/* <div className="cta">
                    <div className="row">
                        <div className="col-md-6 align-self-center">banner</div>
                    </div>
                </div>
                <div className="border_white"/> */}
                <div className="space-40"/>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-sm-6 col-lg">
                                <div className="single_footer_nav border_white_right">
                                    <h3 className="widget-title2">Categorias principales</h3>
                                    <FooterNewsCategories/>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg">
                                <div className="single_footer_nav">
                                    <h3 className="widget-title2">Otras</h3>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul>
                                                <li><Link to="/categoria/interes-general/sociedad">Sociedad</Link>
                                                </li>
                                                <li><Link to="/categoria/interes-general/economia">Economia</Link>
                                                </li>
                                                <li><Link to="/categoria/interes-general/cultura-y-espectaculos">Cultura y Espectaculos</Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul>
                                                <li><Link to="/categoria/interes-general/policiales">Policiales</Link>
                                                </li>
                                                <li><Link to="/categoria/deportes/deportes-regionales">Deportes Regionales</Link>
                                                </li>
                                                <li><Link to="/categoria/deportes/deportes-nacionales">Deportes Nacionales</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-40"/>
                        <div className="border_white"/>
                    </div>
                    <div className="col-lg-4">
                        {/* <FooterMoreNews/> */}
                    </div>
                </div>
            </div>
            <FooterCopyright/>
        </div>
    );
};

export default memo(FooterArea);