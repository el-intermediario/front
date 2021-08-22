import React, {Component} from 'react';
import {Link} from "react-router-dom";
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

const thumbs = [gsil1, gsil2, gsil3, gsil4, gsil5, gsil6, gsil7, gsil4, gsil3];
const postSlider = [
    {
        image: sliderImg1,
        title: 'Emiliano Martínez brilló en los penales y Argentina es finalista',
        body: 'La "albiceleste" venció desde los doce pasos a los "cafeteros" por 3-2 en el estadio Mané Garrincha, y será parte de la definición continental ante Brasil el sábado 10, tras empatar 1-1. Lautaro Martínez y el lateral, los autores de los tantos en los 90 minutos.',
        category: 'DEPORTES',
        date: 'julio 7, 2021'
    },
    {
        image: sliderImg2,
        title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        category: 'TECHNOLOGY',
        date: 'March 26, 2020'
    },
    {
        image: sliderImg2,
        title: 'Copa America: Luis Suarez from devastated US America',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        category: 'TECHNOLOGY',
        date: 'March 26, 2020'
    },
    {
        image: sliderImg1,
        title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        category: 'TECHNOLOGY',
        date: 'March 26, 2020'
    },
    {
        image: sliderImg2,
        title: 'Copa America: Luis Suarez from devastated US America',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        category: 'TECHNOLOGY',
        date: 'March 26, 2020'
    },
    {
        image: sliderImg1,
        title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        category: 'TECHNOLOGY',
        date: 'March 26, 2020'
    },
    {
        image: sliderImg2,
        title: 'Copa America: Luis Suarez from devastated US America',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        category: 'TECHNOLOGY',
        date: 'March 26, 2020'
    },
    {
        image: sliderImg1,
        title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        category: 'TECHNOLOGY',
        date: 'March 26, 2020'
    },
    {
        image: sliderImg2,
        title: 'Copa America: Luis Suarez from devastated US America',
        body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
        category: 'TECHNOLOGY',
        date: 'March 26, 2020'
    },
];

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

class PostGallery extends Component {
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
        const {className, data} = this.props;
        const {nav1, nav2, vModal, videoId} = this.state;

        const note = data[0].children[0].data;

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
                                <div className="col-xl-8">
                                    <div className="slider_demo2">
                                        <div className="single_post post_type6 xs-mb30">
                                            <div className="post_img gradient1">
                                                <img src={note.image} alt="thumb"/>
                                                <span onClick={() => this.modalHandler(true)}
                                                        className="tranding"><FontAwesome
                                                    name="play"/></span>
                                            </div>
                                            <div className="single_post_text">
                                                <div className="meta meta_separator1">
                                                    <Link to="#">{note.copete}</Link>
                                                    <Link to="#">{note.created}</Link>
                                                </div>
                                                <h4><Link className="play_btn"
                                                            to="/video_post1">{note.title}</Link></h4>
                                                <div className="space-10"/>
                                                <p className="post-p">{note.dropline}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <WidgetTab dark={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalVideo channel='youtube' isOpen={vModal} videoId={videoId}
                            onClose={() => this.modalHandler(false)}/>
            </div>
        );
    }
}

export default PostGallery;