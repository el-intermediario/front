import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import FontAwesome from "../uiStyle/FontAwesome";
import Swiper from 'react-id-swiper';
import {mostViewSort} from "../../utils/commonFunctions";
import videoPlaceholder from '../../doc/img/bg/video_bg.jpg';

// images
import popularsm1 from '../../doc/img/popular/popularsm1.jpg';
import popularsm2 from '../../doc/img/popular/popularsm2.jpg';
import popularsm3 from '../../doc/img/popular/popularsm3.jpg';
import popularsm4 from '../../doc/img/popular/popularsm4.jpg';
import popularsm5 from '../../doc/img/popular/popularsm5.jpg';

import './style.scss';
import api from '../../utils/api';

const VideoGallery = ({items}) => {
    const [swiper, setSwiper] = useState(null);
    const [videos, setVideos] = useState(items);

    useEffect(() => {
      if (items.length) {
        setVideos(items);
      }
    }, [items]);

    const onErrorImage = (index) => {
      console.log(index);
      let newItems = [...videos];
      newItems[index].thumbnail = videoPlaceholder;
      setVideos(newItems);
    }

    return (
        <div className="popular_carousel_area mb30 md-mt-30">
            <h2 className="widget-title">Destacados</h2>
            <div className="popular_carousel pt-15 multipleRowCarousel nav_style1">
              {videos.map((item, i) => (
                  <div key={i} className="single_post type10 widgets_small mb15">
                      <div className="post_img">
                          <div className="img_wrap">
                              <Link to="#">
                                  <img 
                                    src={item.thumbnail}
                                    onError={() => onErrorImage(i)}
                                  />
                              </Link>
                          </div>
                          <span className="tranding tranding_border">{item.id}</span>
                      </div>
                      <div className="single_post_text">
                          <h4><Link to="#">{item.title}</Link></h4>
                          <div className="meta4"><Link to="/">{item.category}</Link>
                          </div>
                      </div>
                  </div>
              ))}
            </div>
        </div>
    );
};

export default VideoGallery;