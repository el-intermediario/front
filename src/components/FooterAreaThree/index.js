import React, { memo } from 'react';

const FooterAreaThree = () => {
    return (
        <div className="footer footer_area3 ">
            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 align-self-center">
                            <p>&copy; Copyright 2022, Todos los derechos reservados</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(FooterAreaThree);