import React, { Fragment, useState, useEffect } from 'react';
import FontAwesome from "../uiStyle/FontAwesome";
import { Link } from "react-router-dom";

import api from '../../utils/api';

const TrendingArticles = ({ dark, currentId }) => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (data.length === 0 && currentId) {
      if(!loadingData) {
        fetchArticles(currentId);
      }
    }
  });

  const fetchArticles = async (currentId) => {
    setLoadingData(true);
    try {
      const params = `?limit=4&page=0&trending=true&idOffset=${currentId}`;
      const response = await api.article.getArticles(params,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        setData(response.data);
        setLoadingData(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="trending_widget mb30">
      <h2 className="widget-title">Tendencias</h2>
      <div className="single_post post_type3">
        <div className="post_img">
          <div className="img_wrap">
            {data.length > 0 ? (
              <img src={data[0].image} alt="trendbig1" />
            ) : null}
          </div>
          <span className="tranding"><FontAwesome name="bolt" /></span>
        </div>
        <div className="single_post_text">
          <div className="meta3">{data.length > 0 && data[0].copete}
            <Link to="/">{data.length > 0 && data[0].created}</Link>
          </div>
          <h4><Link to={`/articulo/${data.length > 0 && data[0].slug}`}>{data.length > 0 && data[0].title}</Link></h4>
          <div className="space-10" />
          <p className="post-p">{data.length > 0 && data[0].dropline}</p>
        </div>
      </div>

      {data.map((article, i) => {
        if (i !== 0) {
          return <Fragment key={i}>
            <div className="space-15" />
            {dark ? <div className="border_white" /> : <div className="border_black" />}
            <div className="space-30" />
            <div className="single_post widgets_small">
              <div className="post_img">
                <div className="img_wrap">
                  <img src={article.image} alt="thumb" />
                </div>
                <span className="tranding"><FontAwesome name="bolt" /></span>
              </div>
              <div className="single_post_text">
                <div className="meta2"><Link to="/">{article.copete}</Link>
                  <Link to="/">{article.created}</Link>
                </div>
                <h4><Link to="/post1">{article.title}</Link></h4>
              </div>
            </div>
          </Fragment> 
        }
      })}
    </div>
  );
};

export default TrendingArticles;