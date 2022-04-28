import React, {Component} from 'react';
import {Link} from "react-router-dom";
import WidgetTab from "../WidgetTab";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import FontAwesome from "../uiStyle/FontAwesome";


import './style.scss';
import api from '../../utils/api';


function SampleNextArrow(props) {
    const {className, onClick} = props;
    return (
        <div onClick={onClick} className={`${className} slider_arrow arrow_right slick-arrow`}>
            <FontAwesome name="angle-right"/>
        </div>
    );
}

function SamplePrevArrow(props) {
    const {className, onClick} = props;
    return (
        <div onClick={onClick} className={`${className} slider_arrow arrow_left slick-arrow`}>
            <FontAwesome name="angle-left"/>
        </div>
    );
}

class GalleryPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            vModal: false,
            videoId: '0r6C3z3TEKw'
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    modalHandler = (value) => {
        this.setState({
            vModal: value
        })
    };

    
    render() {
        const {className, images} = this.props;
        const {nav1, nav2, vModal, videoId} = this.state;

        const navSettings = {
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>,
            slidesToShow: 8,
            swipeToSlide: true,
            focusOnSelect: true,
            centerMode: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 8,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                    }
                },
            ]
        };
        return (
            <div className={`post_gallary_area mb40 ${className}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="slider_demo2">
                                        <Slider
                                            asNavFor={nav2}
                                            arrows={false}
                                            fade={true}
                                            ref={slider => (this.slider1 = slider)}
                                        >
                                            {images.slice(0, 9).map((item, i) => (
                                                <div key={i} className="single_post post_type6 xs-mb30">
                                                    <div className="post_img gradient1">
                                                        <img src={`${api.space}f_auto,c_fill,h_300,w_730/v${item.url}`} alt="thumb"/>
                                                        {/* <span onClick={() => this.modalHandler(true)}
                                                              className="tranding"><FontAwesome
                                                            name="play"/></span> */}
                                                    </div>
                                                    {/* <div className="single_post_text">
                                                        <div className="meta meta_separator1">
                                                            <Link to="#">{item.category}</Link>
                                                            <Link to="#">{item.date}</Link>
                                                        </div>
                                                        <h4><Link className="play_btn"
                                                                  to="/video_post1">{item.title}</Link></h4>
                                                        <div className="space-10"/>
                                                        <p className="post-p">{item.body}</p>
                                                    </div> */}
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                    <div className="slider_demo1">
                                        <Slider
                                            ref={slider => (this.slider2 = slider)}
                                            asNavFor={nav1}
                                            {...navSettings}
                                        >
                                            {images.slice(0, 9).map((item, i) => (
                                                <div key={i} className="single_gallary_item">
                                                    <img src={`${api.space}f_auto,c_fill,g_face,h_60,w_80/v${item.url}`} alt="thumb"/>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GalleryPost;