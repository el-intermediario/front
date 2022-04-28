import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../utils/api';
import Moment from "react-moment";
import "./styles.scss";
import LazyImage from '../LazyImage';

const GridNews = ({ title, gridColumns = 6, qty = 4, category, offset }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (offset.length > 0) {
      fetchArticles();
    }
  }, [offset]);

  const fetchArticles = async () => {
    const params = `?limit=${qty}&category=${category}&offset=${offset.slice(',')}`;
    const response = await api.article.getArticles(params,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.data) {
      setArticles(response.data);
    }
  }
  
  return (
    <Fragment>
      {offset.length > 0 ? (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-12">
                    <div className="heading">
                      <h2 className="widget-title">{title}</h2>
                    </div>
                  </div>
                </div>
                <div className="entertrainment_carousel mb30 grid-news">
                  <div className="entertrainment_item">
                    <div className="row justify-content-center">
                      {articles.map((item, i) => (
                        <div key={i} className={`col-lg-${gridColumns}`}>
                          <div className="single_post post_type3 mb30">
                            <div className="post_img">
                              <div className="img_wrap">
                              {item.image ? (
                                <Link to="#">
                                  <LazyImage src={`f_auto,c_fill,g_face,h_200,w_245/v${item.image.url}`} height="200px" alt={item.title} />
                                </Link>
                              ): null}
                              </div>
                            </div>
                            <div className="single_post_text">
                              <div className="meta3"><Link to="#">{item.copete}</Link>
                                <Link to="#">
                                  <Moment format="ll" locale="es" unix>{item.created}</Moment>
                                </Link>
                              </div>
                              <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
                              <div className="space-10" />
                              <p className="post-p">{item.body}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default GridNews;