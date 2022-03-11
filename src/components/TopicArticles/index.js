import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage';

const TopicArticles = ({ dark, topic }) => {
  const item1 = {
    title: '28 casos positivos',
    slug: 'titulo-de-la-nota',
    image: 'https://www.telam.com.ar/thumbs/bluesteel/advf/imagenes/2022/01/61d9e095c301e_900.jpg'
  }

  const item2 = {
    title: 'Argentina clasificada',
    slug: 'titulo-de-la-nota',
    image: 'https://www.telam.com.ar/thumbs/bluesteel/advf/imagenes/2021/07/60e11ab8bd7cc_900.jpg'
  }

  const item = topic === 'covid' ? item1 : item2;


  const bg = {
    backgroundImage: `url("./images/blocks/${topic}.jpg")`,
    backgroundSize: `100%`,
    marginTop: '20px',
    marginBottom: '20px',
    minHeight: '300px'
  };

  return (
    <div className={`row row-topic topic-${topic}`} style={bg}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white mt20">
              <h2 className="widget-title">{topic.toUpperCase()}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="single_post post_type6 post_type7">
              <div className="post_img gradient1">
                <Link to={`/articulo/${item.slug}`}>
                  <img src={item.image}  alt={item.title} />
                  {/* <img src={item.children[0].data.image} alt="thumb" /> */}
                </Link>
              </div>
              <div className="single_post_text">
                <div className="field-title">
                  <Link to={`/articulo/${item.slug}`}>{item.title}</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
          </div>
          <div className="col-3">
          </div>
          <div className="col-3">
          </div>
          <div className="space-30" />
        </div>
      </div>    
    </div>
  );
};

export default TopicArticles;