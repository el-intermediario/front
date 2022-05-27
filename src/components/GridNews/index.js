import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../utils/api';
import Moment from "react-moment";
import "./styles.scss";
import LazyImage from '../LazyImage';
import Placeholder from '../Placeholder';

const backgrounds = {
  politica: `${api.space}f_auto,c_fill,g_faces,h_390,w_1400/v1651700085/intermediario/bg/Screen_Shot_2022-05-04_at_18.36.04_ovpns8.png`,
  deportes: `${api.space}f_auto,c_fill,g_faces,h_390,w_1400/v1651694476/intermediario/bg/bg_sports_dc1sev.jpg`
};

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

  const bg = {
    backgroundImage: backgrounds[category] ? `url("${backgrounds[category]}")` : `url("")`,
    backgroundSize: `cover`,
    backgroundRepeat: 'no-repeat',
  };
  
  return (
    <>
      {articles.length > 0 ? (
        <div className={`block block-bg-${category}`} style={bg}>
          <div className={`container`}>
            <div className="row">
              <div className="col-lg-12">
                <div className="row grid-title">
                  <div className="col-12">
                    <div className="heading pt-4">
                      <h2 className="widget-title">{title}</h2>
                    </div>
                  </div>
                </div>
                <div className="mb30 grid-news">
                  <div>
                    <div className="row justify-content-center">
                      {articles.map((item, i) => (
                        <>
                          <div key={i} className={`col-lg-${12 / articles.length}`}>
                            <div className="single_post post_type3 mb30">
                              <div className="post_img">
                                <div className="img_wrap">
                                {item.image ? (
                                  <Link to="#">
                                    <LazyImage 
                                      src={`f_auto,c_fill,g_face,h_200,w_245/v${item.image.url}`} 
                                      width={245}
                                      height={200}
                                      alt={item.title} 
                                    />
                                  </Link>
                                ): (
                                  <Link to="#">
                                    <Placeholder asset="f_auto,c_fill,g_face,h_200,w_245" />
                                  </Link>
                                )}
                                </div>
                              </div>
                              <div className="single_post_text">
                                {/* {!['deportes'].includes(category) ? (
                                  <div className="meta3"><Link to="#">{item.copete}</Link>
                                    <Link to="#">
                                      <Moment format="ll" locale="es" unix>{item.created}</Moment>
                                    </Link>
                                  </div>
                                ) : null} */}
                                <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
                                <div className="space-10" />
                                <p className="post-p">{item.body}</p>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GridNews;