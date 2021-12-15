import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../utils/api';
import Moment from "react-moment";
import "./styles.scss";

const GridNews = ({ gridColumns = 6, qty = 4 }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const params = { query: `?limit=${qty}&page=2` };
    const response = await api.article.getArticlesOffset(params,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.data) {
      setArticles(response.data);
    }
  }
  return (
    <Fragment>
      {articles.map((item, i) => (
        <div key={i} className={`col-lg-${gridColumns}`}>
          <div className="single_post post_type3 mb30">
            <div className="post_img">
              <div className="img_wrap">
                <Link to="#">
                  <img src={item.image} alt="thumb" />
                </Link>
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
    </Fragment>
  );
};

export default GridNews;