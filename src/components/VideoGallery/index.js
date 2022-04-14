import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import ModalVideo from 'react-modal-video'
import videoPlaceholder from '../../doc/img/bg/video_bg.jpg';

import './style.scss';
import api from '../../utils/api';

const VideoGallery = ({items}) => {
    const [videos, setVideos] = useState(items);
    const [vModal, setvModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);

    useEffect(() => {
      if (items.length) {
        setVideos(items);
      }
    }, [items]);

    const onErrorImage = (index) => {
      let newItems = [...videos];
      newItems[index].thumbnail = videoPlaceholder;
      setVideos(newItems);
    }

    const videoHandle = (video) => {
      setCurrentVideo(video);
      setvModal(true);
    }

    return (
        <div className="popular_carousel_area mb30 md-mt-30">
            <h2 className="widget-title">Destacados</h2>
            <div className="popular_carousel pt-15 multipleRowCarousel nav_style1">
              {videos.map((item, i) => (
                  <div key={i} className="single_post type10 widgets_small mb15">
                      <div className="post_img">
                          <div className="img_wrap">
                              <Link to="#" onClick={() => videoHandle(item)}>
                                  <img 
                                    src={item.thumbnail}
                                    onError={() => onErrorImage(i)}
                                  />
                              </Link>
                          </div>
                          <span className="tranding tranding_border">{item.id}</span>
                      </div>
                      <div className="single_post_text">
                          <h4 onClick={() => videoHandle(item)}>{item.title}</h4>
                          <div className="meta4"><Link to="/">{item.category}</Link>
                          </div>
                      </div>
                  </div>
              ))}
            </div>
            {currentVideo ? currentVideo.type === 'custom' ? (
              <ModalVideo 
                  channel={currentVideo && currentVideo.type} 
                  url={currentVideo && `${api.spaceVideo}v${currentVideo.customVideo.url}`} 
                  isOpen={vModal}
                  onClose={() => setvModal(false)} 
                />
              ) : currentVideo.type === 'youtube' ? (
              <ModalVideo 
                channel={currentVideo && currentVideo.type} 
                isOpen={vModal}
                videoId={currentVideo && currentVideo.content}
                onClose={() => setvModal(false)} 
              />
            ) : null : null}
        </div>
    );
};

export default VideoGallery;