import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import video1 from "../../doc/img/video/video1.jpg";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from 'react-modal-video'
import PopularPosts from "../PopularPosts";
import api from '../../utils/api';

const VideoPost = ({ className, dark }) => {
  const [vModal, setvModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [firstVideo, setFirstVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await api.video.getVideos({},
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        setVideos(response.data);
        const first = response.data.shift();
        setFirstVideo(first);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`video_posts ${className ? className : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white mt10">
              <h2 className="widget-title">Videoteca</h2>
            </div>
          </div>
        </div>
        <div className="space-50" />
        <div className={`viceo_posts_wrap ${dark ? 'primay_bg' : ''}`}>
          <div className="row">
            <div className="col-lg-8">
              <div className="single_post post_type3 post_type11 margintop-60- xs-mb30">
                <div className="post_img">
                  <div className="img_wrap">
                    <Link to="/" className="play_btn">
                      <img src={firstVideo ? firstVideo.thumbnail : video1} alt="video1" />
                    </Link>
                  </div>
                  <p onClick={() => setvModal(true)} className="youtube_middle"><FontAwesome
                    name="youtube-play" /></p>
                </div>
                <div className={`single_post_text padding30 ${dark ? 'dark-2' : 'fourth_bg'}`}>
                  <div className="meta3"><Link to="/">{firstVideo && firstVideo.category}</Link>
                    <Link to="/">{firstVideo && firstVideo.created}</Link>
                  </div>
                  <h4><Link to="/post1">{firstVideo && firstVideo.title}</Link></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <PopularPosts />
            </div>
          </div>
        </div>
      </div>
      {firstVideo ? firstVideo.type === 'custom' ? (
        <ModalVideo 
          channel={firstVideo && firstVideo.type} 
          url={firstVideo && api.space + firstVideo.content} 
          isOpen={vModal}
          onClose={() => setvModal(false)} 
        />
      ) : firstVideo.type === 'youtube' ? (
        <ModalVideo 
          channel={firstVideo && firstVideo.type} 
          isOpen={vModal}
          videoId={firstVideo && firstVideo.content}
          onClose={() => setvModal(false)} 
        />
      ) : null : null}
    </div>
  );
};

export default VideoPost;