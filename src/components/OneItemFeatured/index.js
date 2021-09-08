import React, { Component } from 'react';
import { Link } from "react-router-dom";
import WidgetTab from "../WidgetTab";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import FontAwesome from "../uiStyle/FontAwesome";
import ModalVideo from 'react-modal-video'

// images
import gsil1 from '../../doc/img/blog/post_gsi1.jpg';
import gsil2 from '../../doc/img/blog/post_gsi2.jpg';
import gsil3 from '../../doc/img/blog/post_gsi3.jpg';
import gsil4 from '../../doc/img/blog/post_gsi4.jpg';
import gsil5 from '../../doc/img/blog/post_gsi5.jpg';
import gsil6 from '../../doc/img/blog/post_gsi6.jpg';
import gsil7 from '../../doc/img/blog/post_gsi7.jpg';
import sliderImg1 from '../../doc/img/header/dibu.jpg';
import sliderImg2 from '../../doc/img/header/sider-top2.jpg';
import './style.scss';


function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div onClick={onClick} className={`${className} slider_arrow arrow_right slick-arrow`}>
      <FontAwesome name="angle-right" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div onClick={onClick} className={`${className} slider_arrow arrow_left slick-arrow`}>
      <FontAwesome name="angle-left" />
    </div>
  );
}

class OneItemFeatured extends Component {
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
    const { className, data } = this.props;
    const { nav1, nav2, vModal, videoId } = this.state;

    const note = data[0].children[0].data;

    const navSettings = {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
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
      <div className={`post_gallary_area one-item mb10 ${className}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-xl-12">
                  <div className="slider_demo2">
                    <div className="single_post post_type6 xs-mb30">
                      <div className="post_img gradient1">
                        <img src={note.image} alt="thumb" />
                        {/* <span onClick={() => this.modalHandler(true)}
                                                        className="tranding"><FontAwesome
                                                    name="play"/></span> */}
                      </div>
                      <div className="single_post_text">
                        <div className="meta meta_separator1">
                          {note.copete}
                        </div>
                        <h4><Link className="play_btn"
                          to={`/articulo/${note.slug}`}>{note.title}</Link></h4>
                        <div className="space-10" />
                        <p className="post-p">{note.dropline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalVideo channel='youtube' isOpen={vModal} videoId={videoId}
          onClose={() => this.modalHandler(false)} />
      </div>
    );
  }
}

export default OneItemFeatured;