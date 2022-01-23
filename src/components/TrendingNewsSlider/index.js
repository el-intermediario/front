import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import "./styles.scss";
import LazyImage from '../LazyImage';

const TrendingNewsSlider = ({ articles }) => {
  return (
    <Container className="trending-head">
      <Row className="carousel_post2_type3 nav_style1">
        {articles && articles.map((item, i) => {
          return <Col key={i} className="single_post post_type3">
            <div className="post_img">
              <div className="img_wrap">
                <LazyImage src={item.image} alt={item.title} height="200px" />
              </div>
              <span className="tranding">{i + 1}</span>
            </div>
            <div className="single_post_text">
              <div className="meta3">
                <Link to="#" className="field-category">{item.copete}</Link>
                <Link to="#">
                  <Moment format="D/MM/YYYY" locale="es" unix>{item.created}</Moment>
                </Link>
              </div>
              <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
              <div className="space-10" />
              <p className="post-p">{item.body}</p>
            </div>
          </Col>
        })}
      </Row>
    </Container>
  );
};

export default TrendingNewsSlider;