import React from 'react';
import Moment from 'react-moment';
import {Link} from "react-router-dom";

const CategoryArticles = ({articles, headerHide}) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="businerss_news">
                    {headerHide ? '' :
                        <div className="row">
                            <div className="col-6 align-self-center">
                                <h2 className="widget-title">Business News</h2>
                            </div>
                            <div className="col-6 text-right align-self-center">
                                <Link to="/" className="see_all mb20">Ver todo</Link>
                            </div>
                        </div>}
                    <div className="row">
                        <div className="col-12">
                            {articles.map((item, i) => (
                                <div key={i} className="single_post post_type3 post_type12 mb30">
                                    <div className="post_img">
                                        <div className="img_wrap">
                                            <Link to="/">
                                                <img src={item.image} alt="thumb"/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="single_post_text">
                                        <div className="meta3">
                                            <span>{item.copete}</span> / 
                                            <Moment format="DD-MM-YYYY" locale="es">{item.updated}</Moment>
                                        </div>
                                        <h4><Link to={`/articulo/${item.slug}`}>{item.title}</Link></h4>
                                        <div className="space-10"/>
                                        <p className="post-p">{item.dropline}</p>
                                        <div className="space-20"/>
                                        <Link to={`/articulo/${item.slug}`} className="readmore">Ver mas</Link>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryArticles;