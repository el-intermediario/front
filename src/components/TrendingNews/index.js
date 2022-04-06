import React, { Fragment, useEffect, useState } from 'react';
import Heading from "../uiStyle/Heading";
import TrendingNewsSlider from "../TrendingNewsSlider";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import FontAwesome from "../uiStyle/FontAwesome";
import api from '../../utils/api';
import LazyImage from '../LazyImage';
import './styles.scss';

const TrendingNews = ({ dark, offset, handleOffset }) => {
  const [headArticles, setHeadArticles] = useState([]);
  const [bodyArticles, setBodyArticles] = useState([]);

  useEffect(() => {
    if (offset.length > 0) {
      fetchArticles();
    }
  }, [offset]);

  const fetchArticles = async () => {
    const params = `?limit=8&page=0&offset=${offset.slice(',')}`;
    const response = await api.article.getArticles(params,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.data) {
      if (response.data.length > 0 && offset.length > 0) {
        console.log(offset);
        const newOffsets = response.data.map(item => item.idShort);
        handleOffset([...offset, ...newOffsets]);
      }
      setBodyArticles(response.data.slice(2, 8));
      setHeadArticles(response.data.slice(0, 2));
    }
  }

  return (
    <Fragment>
      <Heading title="Tendencias" />
      <TrendingNewsSlider articles={headArticles} />
      {dark ? <div className="border_white" /> : <div className="border_black" />}
      <div className="space-30" />
      <div className="row trending-news">
        <div className="col-lg-6">
          {bodyArticles.slice(0, 3).map((item, i) => (
            <Fragment key={i}>
              <div className="single_post widgets_small">
                <div className="post_img">
                  <div className="img_wrap">
                    <LazyImage src={item.image} alt={item.title} height="77px" />
                  </div>
                  <span className="tranding">
                    <FontAwesome name="bolt" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    <Link to="#">{item.copete}</Link>
                    <Link to="#">
                      <Moment format="ll" locale="es" unix>{item.created}</Moment>
                    </Link>
                  </div>
                  <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
                </div>
              </div>
              <div className="space-15" />
              {dark ? <div className="border_white" /> : <div className="border_black" />}
              <div className="space-15" />
            </Fragment>
          ))}
        </div>
        <div className="col-lg-6">
          {bodyArticles.slice(3, 6).map((item, i) => (
            <Fragment key={i}>
              <div className="single_post widgets_small">
                <div className="post_img">
                  <div className="img_wrap">
                    <LazyImage src={item.image} alt={item.title} height="77px" />
                  </div>
                  <span className="tranding">
                    <FontAwesome name="bolt" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    <Link to="#">{item.copete}</Link>
                    <Link to="#">
                      <Moment format="ll" locale="es" unix>{item.created}</Moment>
                    </Link>
                  </div>
                  <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
                </div>
              </div>
              <div className="space-15" />
              {dark ? <div className="border_white" /> : <div className="border_black" />}
              <div className="space-15" />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TrendingNews;