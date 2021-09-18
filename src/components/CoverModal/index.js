import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import banner2 from '../../doc/img/bg/sidebar-1.png';
import FourItemsFeatured from '../FourItemsFeatured';
import OneItemFeatured from '../OneItemFeatured';
import ThreeItemsFeatured from '../ThreeItemsFeatured';
import TopicArticles from '../TopicArticles';
import TwoItemsFeatured from '../TwoItemsFeatured';
import FontAwesome from "../uiStyle/FontAwesome";
import VideoPost from '../VideoPost';

const CoverModal = ({ previewShow, setPreviewShow, layout }) => {
  const [cover, setCover] = useState('');

  const handleRow = (row) => {
    console.log(row.id);
    switch (row.id) {
      case 'article':
        if (row.children.length === 1) {
          return <OneItemFeatured className="fifth_bg" data={row.children} />
        } else if (row.children.length === 2) {
          return <TwoItemsFeatured data={row.children} />
        } else if (row.children.length === 3) {
          return <ThreeItemsFeatured data={row.children} />
        } else {
          return <FourItemsFeatured news={row.children} />
        }
      case 'corona':
        // Bloque con notas de un tema especifica ej: 'elecciones'
        break;
      case 'topic':
        return <div className="entertrainments">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <TopicArticles data={row.children} />
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="banner2 mb30">
                      <Link to="/">
                        <img src={banner2} alt="thumb" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="banner2 mb30">
                      <Link to="/">
                        <img src={banner2} alt="thumb" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>;
        break;
      case 'videos':
        return <VideoPost className="pt30 half_bg60" />
      default:
        break;
    }
  };

  return (
    <div className="preview-modal active">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center m-auto">
            <div className="v1search_form">
              {layout.map(row => {
                if (row.id === 'videos') {
                  return handleRow(row);
                } else {
                return <div className="row">
                    <div className="container">{handleRow(row)}</div>
                  </div>
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="close_btn" onClick={() => setPreviewShow(false)}><FontAwesome name="times" /></div>
    </div>
  );
};

export default CoverModal;