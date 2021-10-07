import React, {useState} from 'react';
import FontAwesome from "../uiStyle/FontAwesome";
import {Link} from "react-router-dom";
import './style.scss';

const OneTwoItemsFeatured = ({className, dark, data}) => {
    return (
        <div className={`OneTwoItemsFeatured mix_area ${className ? className : ''}`}>
            <div className="row">
                <div className="column column-1 col-7">
                    <div className="single_mix_carousel nav_style3">
                            {data[0].children.map((item, i) => (
                                <div key={i} className="single_post post_type6 post_type9">
                                    <div className="post_img gradient1">
                                        <div className="img_wrap">
                                            <Link className="play_btn" to={`/articulo/${item.data.slug}`}>
                                                <img src={item.data.image} alt="news"/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="single_post_text">
                                        <div className="meta">{item.data.copete}</div>
                                        <h4><Link to={`/articulo/${item.data.slug}`}>{item.data.title}</Link></h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
                <div className="column column-2 col-5">
                    {data[1].children.map((item, i) => (
                        <div key={item.id} className="single_post post_type6 post_type9">
                            <div className="post_img gradient1">
                                <div className="img_wrap">
                                    <Link to={`/articulo/${item.data.slug}`}>
                                        <img src={item.data.image} alt="news"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="single_post_text">
                                <div className="meta">{item.data.copete}</div>
                                <h4><Link to={`/articulo/${item.data.slug}`}>{item.data.title}</Link></h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-15"/>
        </div>
    );
};

export default OneTwoItemsFeatured;