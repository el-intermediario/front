import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

// images
import erroImg from '../../doc/img/bg/404.png';


const NotFoundPage = () => {
    return (
        <Fragment>
            <div className="inner_table">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="space-50"/>
                            <div className="area404 text-center">
                                <img src={erroImg} alt="404"/>
                            </div>
                            <div className="space-30"/>
                            <div className="back4040 text-center col-lg-6 m-auto">
                                <h3>Page not faund</h3>
                                <div className="space-10"/>
                                <p>Sorry the page you were looking for cannot be found. Try searching for the best match
                                    or browse the links below:</p>
                                <div className="space-20"/>
                                <div className="button_group"><Link to="/" className="cbtn2">GO TO HOME</Link>
                                    <Link to="/contact" className="cbtn3">contact us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-50"/>
            </div>
        </Fragment>
    )
};

export default NotFoundPage;