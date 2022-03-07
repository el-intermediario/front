import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

const FooterNewsCategories = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-6">
          <ul>
            <li><Link to="/categoria/politica">Política</Link></li>
            <li><Link to="/categoria/interes-general">Interes general</Link></li>
            <li><Link to="/categoria/deportes">Deportes</Link></li>
            <li><Link to="/categoria/el-mundo">El Mundo</Link></li>
          </ul>
        </div>
        <div className="col-lg-6">
          <ul>
            <li><Link to="/categoria/trending">Trending</Link></li>
            <li><Link to="/categoria/lifestyle">Lifestye</Link></li>
            <li><Link to="/categoria/genero">Genero</Link></li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default FooterNewsCategories;