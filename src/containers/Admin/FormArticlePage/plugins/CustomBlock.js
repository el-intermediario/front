import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Embed from 'react-embed';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import InstagramEmbed from 'react-instagram-embed';
import ReactPlayer from 'react-player';
import api from '../../../../utils/api';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
// import './editor.scss';
import GalleryPost from '../../../../components/GalleryPost';

const CustomBlock = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const item = entity.getData();
  const type = entity.getType();
  //const type = 'video';

  switch (type) {
    case 'REFERENCE':
      return (
        <Fragment key={item.id}>
          <div className="single_post block-reference">
            <div className="post_img">
              <div className="img_wrap">
                <img src={`${api.space}f_auto,c_fill,g_face,h_77,q_84,w_100/v${item.image.url}`} alt="thumb" />
              </div>
            </div>
            <div className="post_text">
              <div className="meta2">
                Tambien podria interesarte:
              </div>
              <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
            </div>
          </div>
          <div className="space-15" />
        </Fragment>
      );
    case 'VIDEO':
      if (item.type === 'youtube') {
        return (
          <ReactPlayer url={`https://www.youtube.com/watch?v=${item.content}`} width='100%'/>
          // <Embed width={width} height={height} url={`https://www.youtube.com/watch?v=${item.content}`} />
        )
      } 
      
      // If video is custom.
      return (
        <Fragment key={item.id}>
          <Video
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster={`${api.space}${item.thumbnail}`}
            onCanPlayThrough={() => {
                // Do stuff
            }}>
            <source src={`${api.space}${item.content}`} type="video/mp4" />
          </Video>
          <div className="space-10" />
        </Fragment>
      );
    case 'QUOTE':
      return (
        <div key={item.id} className="block-quote">
          <div className="field-message">{item.message}</div>
          <div className="field-author">{item.author}</div>
        </div>
      );
    case 'EMBEDDED_LINK':
      const width = !item.width ? '80%' : item.width;
      const height = !item.height ? '100%' : item.height;

      // Youtube embed.
      if (item.src.indexOf("youtube") >= 0){
        return <ReactPlayer url={`https://www.youtube.com/watch?v=${item.src}`} width='100%' />
        // return <iframe
        //   width={width}
        //   height={height}
        //   src={`${item.src}`}
        //   frameBorder="0"
        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //   allowFullScreen
        //   title="Embedded youtube"
        // />
      }

      // Instagram embed.
      if (item.src.indexOf("instagra") >= 0){
        return <InstagramEmbed
          url={item.src}
          clientAccessToken='123|456'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      }

      // Facebook embed.
      if (item.src.indexOf("facebook.com") >= 0){
        const appId = item.src.split("?v=");
        return <FacebookProvider appId={appId[1]}>
                <EmbeddedPost href="https://www.facebook.com" width="500" />
               </FacebookProvider>
      }

      // Spotify embed.
      if (item.src.includes('open.spotify.com')) {
        return <iframe
                  title="Spotify Web Player"
                  src={item.src}
                  width={width}
                  height={height}
                  frameBorder={0}
                  allow="encrypted-media"
                  style={{
                    borderRadius: 0,
                  }}
                />
      }
      return <Embed width={width} height={height} url={item.src} />
    case 'GALLERY':
      return (
        <GalleryPost images={item} />
      )
    case 'QUOTE':
      return (
        <div key={item.id} className="block-quote">
          <div className="field-message">{item.message}</div>
          <div className="field-author">{item.author}</div>
        </div>
      ); 
    case 'IMAGE':
      return (
        <div key={item.src}>
          <img src={item.src} alt="thumb" />
        </div>
      );    
    default:
      return (
        <div>El embedded no se pudo renderizar.</div>
      )
  }
};

export default CustomBlock;