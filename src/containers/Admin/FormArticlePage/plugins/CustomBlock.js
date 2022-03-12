import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Embed from 'react-embed';
import api from '../../../../utils/api';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import './editor.scss';

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
                <img src={`${api.space}${item.image}`} alt="thumb" />
              </div>
            </div>
            <div className="post_text">
              <div className="meta2">
                {item.copete}
              </div>
              <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
            </div>
          </div>
          <div className="space-15" />
        </Fragment>
      );
    case 'VIDEO':
      console.log(item);
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
      return (
        <Embed width={width} height={height} url={item.src} />
        // <iframe width={width} height={height} src={item.src} frameborder="0"></iframe>
      )
    case 'IMAGE':
      return (
        <img src={item.src} width={item.width} height={item.height} />
      )
    default:
      return (
        <div>El embedded no se pudo renderizar.</div>
      )
  }
};

export default CustomBlock;