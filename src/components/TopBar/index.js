import React, { memo, useState } from 'react';
import { Link } from "react-router-dom";
import Swiper from 'react-id-swiper';
import FontAwesome from "../uiStyle/FontAwesome";
import Moment from 'react-moment';
import 'moment/locale/es';
import logo from '../../doc/img/logo.jpg';

const TopBar = ({ className, dark }) => {
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
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  return (
    <div className={`topbar ${className ? className : ''}`} id="top">
      <div className="container">
        <div className="row">
          <div className="col-md-9 align-self-center">
            <img src={logo} width="300px" height="auto" alt="logo" />
            {/* <div className={`trancarousel_area ${dark ? 'white' : ''}`}>
              <p className="trand">Tendencias</p>
              <div className="nav_style1">
                <Swiper getSwiper={setSwiper} className="trancarousel" {...params}>
                  <div className="trancarousel_item">
                    <p><Link to="/">Argentina gano por penales y paso a la final</Link></p>
                  </div>
                  <div className="trancarousel_item">
                    <p><Link to="/">Llegaron 20000 vacunas</Link></p>
                  </div>
                </Swiper>
                <div className="navBtns">
                  <button className="navBtn prevBtn" onClick={goPrev}><FontAwesome name="angle-left" />
                  </button>
                  <button className="navBtn nextBtn" onClick={goNext}><FontAwesome
                    name="angle-right" />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-md-3 align-self-center">
            <div className="top_date_social text-right">
              <div className={`paper_date ${dark ? 'white' : ''}`}>
                <p><Moment format="dddd D, MMMM YYYY" locale="es">
                  {Date.now()}</Moment>
                </p>
              </div>
              <div className={`social1 ${dark ? 'white' : ''}`}>
                <ul className="inline">
                  <li><Link to="#"><FontAwesome name="twitter" /></Link></li>
                  <li><Link to="#"><FontAwesome name="facebook-f" /></Link></li>
                  <li><Link to="#"><FontAwesome name="youtube-play" /></Link></li>
                  <li><Link to="#"><FontAwesome name="instagram" /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TopBar);