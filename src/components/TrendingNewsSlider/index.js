import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import "./styles.scss";
import LazyImage from '../LazyImage';
import Placeholder from '../Placeholder';
import OneArticleFeatured from '../theme-1/OneArticleFeatured';

const TrendingNewsSlider = ({ articles }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth);
    }, false);
  });

  return (
    <Container className="trending-head">
      <Row className="carousel_post2_type3 nav_style1">
        {articles && articles.map((item, i) => (
          <Fragment key={i}>
            {isMobile < 1200 ? (<OneArticleFeatured article={item} />) : (
              <Col className="single_post post_type3">
                <div className="post_img">
                  <div className="img_wrap">
                    <Link to={`/articulo/${item.slug}`}>
                      {item.image ?
                        <LazyImage
                          src={`f_auto,c_fill,g_face,h_250,q_84,w_300/v${item.image.url}`}
                          alt={item.title}
                          width={300}
                          height={250}
                        />
                        : <Placeholder />}
                    </Link>
                  </div>
                  <span className="tranding">{i + 1}</span>
                </div>
                <div className="single_post_text">
                  <Row xs="auto" className="meta3">
                    <Col>{item.copete}</Col>
                    <Col><Moment format="D  MMM" locale="es" unix>{item.created}</Moment></Col>
                  </Row>
                  <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
                  <div className="space-10" />
                  <p className="post-p">{item.body}</p>
                </div>
              </Col>
            )}
          </Fragment>
        ))}
      </Row>
    </Container>
  );
};

export default TrendingNewsSlider;