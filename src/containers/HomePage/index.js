import React, { Fragment, useEffect, useState } from 'react';
import TrendingNews from "../../components/TrendingNews";
import FollowUs from "../../components/FollowUs";
import MostView from "../../components/MostView";
import MixCarousel from "../../components/MixCarousel";
import VideoPost from "../../components/VideoPost";
import EntertainmentNews from "../../components/EntertainmentNews";
import { Link } from "react-router-dom";
import SportsNews from "../../components/SportsNews";
import BusinessNews from "../../components/BusinessNews";
import MostShareWidget from "../../components/MostShareWidget";
import UpcomingMatches from "../../components/UpcomingMatches";
import NewsLetter from "../../components/NewsLetter";
import CategoriesWidget from "../../components/CategoriesWidget";
import VIdeoNewsSection from "../../components/VIdeoNewsSection";

// images
import banner1 from '../../doc/img/bg/banner1.png';
import banner2 from '../../doc/img/bg/sidebar-1.png';
import business1 from '../../doc/img/business/business1.jpg';
import business2 from '../../doc/img/business/business2.jpg';
import business3 from '../../doc/img/business/business3.jpg';
import enter1 from '../../doc/img/entertrainment/enter1.jpg';
import enter2 from '../../doc/img/entertrainment/enter2.jpg';
import enter3 from '../../doc/img/entertrainment/enter3.jpg';
import enter4 from '../../doc/img/entertrainment/enter4.jpg';
import api from '../../utils/api';
import PostGallery from '../../components/PostGallery';
import TwoItemsFeatured from '../../components/TwoItemsFeatured';
import ThreeItemsFeatured from '../../components/ThreeItemsFeatured';
import TopicArticles from '../../components/TopicArticles';
import FourItemsFeatured from '../../components/FourItemsFeatured';
import OneItemFeatured from '../../components/OneItemFeatured';
import OneTwoItemsFeatured from '../../components/OneTwoItemsFeatured';
import RadioPlayer from '../../components/RadioPlayer';

const entertainments = [
  {
    image: enter1,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    image: enter2,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    image: enter3,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    image: enter4,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
];

const businessNews = [
  {
    image: business1,
    category: 'uiux.subash',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
  },
  {
    image: business2,
    category: 'uiux.subash',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
  },
  {
    image: business3,
    category: 'uiux.subash',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'
  },
];

const HomePage = () => {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    fetchCover();
  }, []);

  const fetchCover = async () => {
    try {
      const response = await api.cover.get({},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        setLayout(response.data.layout);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRow = (row) => {
    switch (row.id) {
      case 'article':
        if (row.children.length === 1) {
          return <OneItemFeatured className="fifth_bg" data={row.children} />
        } else if (row.children.length === 2) {
          if (row.children[1].children.length === 2) {
            return <OneTwoItemsFeatured data={row.children} />
          }
          return <TwoItemsFeatured data={row.children} />
        } else if (row.children.length === 3) {
          return <ThreeItemsFeatured data={row.children} />
        } else {
          return <FourItemsFeatured news={row.children} />
        }
      case 'corona':
        // Bloque con notas de un tema especifica ej: 'elecciones'
        break;
      case 'topic':
        return <div className="entertrainments">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <TopicArticles data={row.children}/>
                    </div>
                    <div className="col-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="banner2 mb30">
                            <Link to="/">
                              <img src={banner2} alt="thumb" />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="banner2 mb30">
                            <Link to="/">
                              <img src={banner2} alt="thumb" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>;
        break;      
      case 'videos':
        return <VideoPost key="videos" className="pt30 half_bg60" />
      default:
        break;  
    }
  }

  return (
    <Fragment>
      {/* <PostCarousel className="fifth_bg"/> */}
      {layout.map((row, ki) => {
        if (row.id === 'videos') {
          return handleRow(row);
        } else {
          return <div key={ki} className="row-articles">{handleRow(row)}</div>
        }
      })}
      {/* <FeaturedNews /> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <TrendingNews />
          </div>
          <div className="col-md-12 col-lg-4">
            <RadioPlayer title="Radio Online" />
            <FollowUs title="Follow Us" />
            <MostView />
          </div>
        </div>
      </div>
      {/* <MixCarousel className="half_bg1" /> */}
      {/* <VideoPost className="pt30 half_bg60" /> */}
      <div className="entertrainments">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="heading">
                    <h2 className="widget-title">Entertrainment News</h2>
                  </div>
                </div>
              </div>
              {/*CAROUSEL START*/}
              <div className="entertrainment_carousel mb30">
                <div className="entertrainment_item">
                  <div className="row justify-content-center">
                    <EntertainmentNews entertainments={entertainments} />
                  </div>
                </div>
              </div>
              {/*CAROUSEL END*/}
              <SportsNews />
              <div className="banner_area mt50 mb60 xs-mt60">
                <Link to="/">
                  <img src={banner1} alt="banner1" />
                </Link>
              </div>
              <BusinessNews businessNews={businessNews} />
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <MostShareWidget title="Most share" />
                </div>
                <div className="col-lg-12">
                  <UpcomingMatches />
                </div>
                <div className="col-lg-12">
                  <NewsLetter />
                </div>
                <div className="col-lg-12">
                  <CategoriesWidget />
                </div>
                <div className="col-lg-12">
                  <div className="banner2 mb30">
                    <Link to="/">
                      <img src={banner2} alt="thumb" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </Fragment>
  );
};

export default HomePage;