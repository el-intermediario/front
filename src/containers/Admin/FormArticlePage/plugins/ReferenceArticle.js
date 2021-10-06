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

  let media;
  if (type === 'reference') {
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
                  <h4><Link to="/post1">{item.title}</Link></h4>
              </div>
          </div>
          <div className="space-15"/>
        </Fragment>
      </div>
    )
  }

  return media;
};

export default ReferenceArticle;