import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import { Link } from "react-router-dom";

import './style.scss';
import LazyImage from '../LazyImage';
import Heading from '../uiStyle/Heading';
import FontAwesome from '../uiStyle/FontAwesome';


const FourItemsFeatured = ({ className, news }) => {
  const [swiper, setSwiper] = useState(null);

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
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  };
  return (
    <div className={`feature_carousel_area four-items mb10 ${className ? className : ''}`}>
      <div className="container">
        <div className="row">
                    <div className="col-12">
                        <Heading title="Notas destacadas"/>
                    </div>
                </div>
        <div className="row">
          <div className="col-12">
            {/*CAROUSEL START*/}
            <div className="feature_carousel nav_style1">
              <Swiper getSwiper={setSwiper} {...params}>
                {news.map((item, i) => (
                  <div key={i} className="single_post post_type6 post_type7">
                    <div className="post_img gradient1">
                      <Link to={`/articulo/${item.children[0].data.slug}`}>
                        <LazyImage src={`c_fill,g_face,h_280,w_280/v${item.children[0].data.image.url}`}  alt={item.children[0].data.title} />
                      </Link>
                    </div>
                    <div className="single_post_text">
                      <div className="field-title">
                        <Link to={`/articulo/${item.children[0].data.slug}`}>{item.children[0].data.title}</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Swiper>
              <div className="navBtns">
                  <div onClick={goPrev} className="navBtn prevtBtn"><FontAwesome name="angle-left"/></div>
                  <div onClick={goNext} className="navBtn nextBtn"><FontAwesome name="angle-right"/></div>
              </div>
            </div>
            {/*CAROUSEL END*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourItemsFeatured;