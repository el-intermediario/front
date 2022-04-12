import React from 'react';
import Moment from 'react-moment';
import {Link} from "react-router-dom";
import api from '../../utils/api';
import './styles.scss';

const CategoryArticles = ({articles}) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="category-articles">
                    <div className="row">
                        <div className="col-12">
                            {articles.map((item, i) => (
                                <div key={i} className="single_post post_type3 post_type12 mb30">
                                    <div className="post_img">
                                        <div className="img_wrap">
                                            <Link to={`/articulo/${item.slug}`}>
                                                <img src={`${api.space}f_auto,c_fill,g_face,h_200,q_84,w_350/v${item.image.url}`} alt={item.title}/>
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