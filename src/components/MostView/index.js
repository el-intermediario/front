import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from 'react-id-swiper';
import api from '../../utils/api';
import Moment from 'react-moment';
import "./styles.scss";
import LazyImage from '../LazyImage';

const MostView = ({ no_margin, title, dark }) => {
  const [swiper, setSwiper] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await api.article.getArticles('?limit=3&page=0&mostView=true',
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data) {
        setArticles(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const params = {
    slidesPerView: 1,
    slidesPerColumn: 6,
  };
  return (
    <div className={`most-view widget tab_widgets ${no_margin ? '' : 'mb30'}`}>
      <h2 className="widget-title">{title ? title : 'Most View'}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        {/*CAROUSEL START*/}
        <Swiper getSwiper={setSwiper} {...params}>
          {articles.map((item, i) => (
            <div key={i} className="single_post2_carousel">
              <div className="single_post widgets_small type8">
                <div className="post_img">
                  <div className="img_wrap">
                    <LazyImage src={`c_fill,g_face,h_77,q_84,w_100/v${item.image.url}`} alt={item.title} height="77px" />
                  </div>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    {item.copete}
                  </div>
                  <div className="meta-date">
                    {item && <Moment format="ll" locale="es" unix>{item.created}</Moment>}
                  </div>
                  <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
                </div>
                <div className="type8_count">
                  <h2>{i+1}</h2>
                </div>
              </div>
              {i + 1 < articles.length ? <Fragment>
                <div className="space-15" />
                {dark ? <div className="border_white" /> : <div className="border_black" />}
                <div className="space-15" />
              </Fragment> : null}
            </div>
          ))}
        </Swiper>
        {articles.length > 5 ? (
          <div className="navBtns">
            <div onClick={goPrev} className="navBtn prevtBtn"><FontAwesome name="angle-left" /></div>
            <div onClick={goNext} className="navBtn nextBtn"><FontAwesome name="angle-right" /></div>
          </div>
        ) : null}
        {/*CAROUSEL END*/}
      </div>
    </div>
  );
};

export default MostView;