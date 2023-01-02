import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import video1 from "../../doc/img/video/video1.jpg";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from 'react-modal-video'
import videoPlaceholder from '../../doc/img/bg/video_bg.jpg';
import Moment from 'react-moment';
import VideoGallery from '../VideoGallery';
import api from '../../utils/api';
import "./styles.scss";

const VideoPost = ({ className, dark }) => {
  const [vModal, setvModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [firstVideo, setFirstVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await api.video.getVideos('limit=5&offset=0',
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data) {
        let newItems = response.data;
        newItems.map((video, i) => {
          if (video.type === 'custom') {
            newItems[i].thumbnail = `${api.space}h_410,w_730/v${video.customThumbnail.url}`;
          } else {
            if (video.type === 'youtube') {
              newItems[i].thumbnail = `https://img.youtube.com/vi/${video.content}/hqdefault.jpg`;
            }
            if (video.type === 'vimeo') {
              newItems[i].thumbnail = `https://vimeo.com/vi/${video.content}/hqdefault.jpg`;
            }
          }
        });
        const first = newItems.shift();
        setFirstVideo(first);
        setVideos(newItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onErrorImage = () => {
    setFirstVideo({ ...firstVideo, thumbnail: videoPlaceholder });
  }

  return (
    <div className={`video_posts ${className ? className : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white mt20">
              <h2 className="widget-title">Ultimos videos</h2>
            </div>
          </div>
        </div>
        <div className="space-30" />
        <div className={`video_posts_wrap ${dark ? 'primay_bg' : ''}`}>
          <div className="row">
            <div className="col-lg-8 first-video">
              <div className="single_post post_type3 post_type11 margintop-60- xs-mb30">
                <div className="post_img">
                  <div className="img_wrap" onClick={() => setvModal(true)}>
                    <Link to="/" className="play_btn">
                      <img
                        src={firstVideo ? firstVideo.thumbnail : video1}
                        onError={onErrorImage}
                        alt="video"
                      />
                    </Link>
                  </div>
                  <p onClick={() => setvModal(true)} className="youtube_middle"><FontAwesome
                    name="youtube-play" /></p>
                </div>
                <div className={`single_post_text padding30 ${dark ? 'dark-2' : 'fourth_bg'}`}>
                  <div className="meta3">
                    <Link to="#">{firstVideo && firstVideo.category}</Link>
                    <span className="field-created">
                      {firstVideo && <Moment format="D/MM/YYYY" locale="es" unix>{firstVideo.created}</Moment>}
                    </span>
                  </div>
                  <h4>{firstVideo && firstVideo.title}</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 gallery-videos">
              <VideoGallery items={videos} />
            </div>
          </div>
        </div>
      </div>
      {firstVideo ? firstVideo.type === 'custom' ? (
        <ModalVideo
          channel={firstVideo && firstVideo.type}
          url={firstVideo && `${api.spaceVideo}v${firstVideo.customVideo.url}`}
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