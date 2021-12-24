import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ReferenceArticle = (props) => {
  const { data } = props.blockProps;
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const item = entity.getData();
  const type = entity.getType();
  //const type = 'video';

  switch (type) {
    case 'REFERENCE':
      return (
        <div className="col-lg-12">
          <Fragment key={item.id}>
            <div className="single_post widgets_small block-reference">
                <div className="post_img">
                    <div className="img_wrap">
                        <img src={item.image} alt="thumb"/>
                    </div>
                </div>
                <div className="single_post_text">
                    <div className="meta2"><Link to="/">{item.copete}</Link></div>
                    <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
                </div>
            </div>
            <div className="space-15"/>
          </Fragment>
        </div>
      )
    break;
    case 'EMBEDDED_LINK':
      return (
        <iframe width="320" height="440" src="https://www.instagram.com/p/CXolX2mDejv/embed" frameborder="0"></iframe>
        //<iframe width="560" height="315" src={item.src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      )
    case 'IMAGE':
      console.log(item);
      return (
        <img src={item.src} width={item.width} height={item.height} />
      )  
    default:
      return (
        <div>El embedded no se pudo renderizar.</div>
      )
      break;  
  }
};

export default ReferenceArticle;