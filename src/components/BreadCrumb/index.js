import React from 'react';
import {Link} from "react-router-dom";

const BreadCrumb = (props) => {
    const {className = '', title} = props;
    return (
        <div className={`inner_table ${className}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="breadcrumb"><Link to="/">Inicio</Link>{title ? ` / ${title}` : ''}</div>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    );
};

export default BreadCrumb;