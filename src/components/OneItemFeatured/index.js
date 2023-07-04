import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { Col, Container, Row } from 'reactstrap';
import api from '../../utils/api';
import Placeholder from '../Placeholder';
import './style.scss';
import OneArticleFeatured from '../theme-1/OneArticleFeatured';

const OneItemFeatured = ({ className, dark, data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth);
    }, false);
  });

  if (isMobile < 1200) {
    const item = data[0].children[0];
    if (!item?.data) { return <></> }
    return (
      <OneArticleFeatured article={data[0].children[0].data} />
    )
  } else {
    return (
      <div className={`OneItemFeatured mix_area ${className ? className : ''} ${isMobile < 1200 ? 'mobile' : ''}`}>
        <div className="row">
          <div className="column column-1 col-12">
            <div className="single_mix_carousel nav_style3">
              {data[0].children.map((item, i) => (
                <div key={i} className="single_post post_type9">
                  <div className="post_img gradient1">
                    <div className="img_wrap">
                      <img src={`${api.space}f_auto,c_fill,g_face,h_720,q_84,w_1024/v${item.data.image.url}`} alt={item.data.title} />
                    </div>
                  </div>
                  <div className="single_post_text">
                    <div className="field-copete">{item.data.copete}</div>
                    <div className="field-title">
                      <Link to={`/articulo/${item.data.slug}`}>{item.data.title}</Link>
                    </div>
                    <div className="field-dropline">{item.data.dropline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OneItemFeatured;