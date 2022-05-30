import React from 'react';
import {Link} from "react-router-dom";
import './style.scss';
import LazyImage from '../LazyImage';

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
                                                <LazyImage 
                                                    src={`f_auto,c_fill,g_face,h_500,w_860/v${item.data.image.url}`} 
                                                    width={860}
                                                    height={500} 
                                                    alt={item.data.title} 
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="single_post_text">
                                        <div className="field-copete">{item.data.copete}</div>
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
                                        <LazyImage 
                                            src={`f_auto,c_fill,g_face,h_250,w_610/v${item.data.image.url}`} 
                                            width={610}
                                            height={250} 
                                            alt={item.data.title} 
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="single_post_text">
                                <div className="field-copete">{item.data.copete}</div>
                                <h4><Link to={`/articulo/${item.data.slug}`}>{item.data.title}</Link></h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="space-15"/> */}
        </div>
    );
};

export default OneTwoItemsFeatured;