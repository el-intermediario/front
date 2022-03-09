import React from 'react';
import { Link } from "react-router-dom";
import api from '../../utils/api';
import LazyImage from '../LazyImage';
import './style.scss';

const OneItemFeatured = ({ className, dark, data }) => {
  return (
    <div className={`OneItemFeatured mix_area ${className ? className : ''}`}>
      <div className="row">
        <div className="column column-1 col-12">
          <div className="single_mix_carousel nav_style3">
            {data[0].children.map((item, i) => (
              <div key={i} className="single_post post_type9">
                <div className="post_img gradient1">
                  <div className="img_wrap">
                    <LazyImage src={item.data.image} width="100%" height="720px" alt={item.data.title} />
                  </div>
                </div>
                <div className="single_post_text">
                  <div className="field-copete">{item.data.copete}</div>
                  <div className="field-title">
                    <Link to={`/articulo/${item.data.slug}`}>{item.data.title}</Link>
                  </div>
                  <div className="field-date">Noviembre 17, 2021</div>
                  <div className="field-dropline">{item.data.dropline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="space-15" /> */}
    </div>
  );
}

export default OneItemFeatured;