import React, { Fragment, useEffect, useState } from 'react';
import TrendingNews from "../../components/TrendingNews";
import MostView from "../../components/MostView";
import VideoPost from "../../components/VideoPost";
import { Link } from "react-router-dom";
import "./styles.scss";

// images
import banner2 from '../../doc/img/bg/sidebar-1.png';
import api from '../../utils/api';
import TwoItemsFeatured from '../../components/TwoItemsFeatured';
import ThreeItemsFeatured from '../../components/ThreeItemsFeatured';
import TopicArticles from '../../components/TopicArticles';
import FourItemsFeatured from '../../components/FourItemsFeatured';
import OneItemFeatured from '../../components/OneItemFeatured';
import OneTwoItemsFeatured from '../../components/OneTwoItemsFeatured';
import RadioPlayer from '../../components/RadioPlayer';
import GridNews from '../../components/GridNews';
import LazyImage from '../../components/LazyImage';
import Ad from '../../components/Ad';
import {Helmet} from "react-helmet";

const HomePage = () => {
  const [layout, setLayout] = useState([]);
  const [ads, setAds] = useState([]);
  const [articlesOffset, setArticlesOffset] = useState([]);

  const blocks = [
    {label: 'Politica', key: 'politica', qty: 6},
    {label: 'Interes general', key: 'interes_general', qty: 4},
    {label: 'Deportes', key: 'deportes', qty: 6},
    {label: 'El Mundo', key: 'el_mundo', qty: 4},
    {label: 'Trending', key: 'trending', qty: 6},
    {label: 'Lifestyle', key: 'lifestye', qty: 4},
    {label: 'Genero', key: 'genero', qty: 6},
  ];

  useEffect(() => {
    fetchCover();
    fetchAds();
  }, []);

  const fetchCover = async () => {
    try {
      const response = await api.cover.get({},
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        setLayout(response.data.layout);
        setArticlesOffset(response.data.articlesOffset);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAds = async () => {
    try {
      const params = `?category=home`;
      const response = await api.ad.get(params,
        { headers: { 'Content-Type': 'application/json' } }
      );
        
      if (response.data) {
        setAds(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRow = (row) => {
    switch (row.id) {
      case 'ad':
        return <Ad 
          imageUrl={row.children[0].children[0].data.image}
          url={row.children[0].children[0].data.url}
          title={row.children[0].children[0].data.name}
        />
        break;
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
        // return <VideoPost key="videos" className="pt30 half_bg60" />
      default:
        break;  
    }
  }

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Intermediario | Santa Cruz - Argentina</title>
        <link rel="canonical" href="https://intermediario.sanjua.com" />
      </Helmet>
      {/* <PostCarousel className="fifth_bg"/> */}
      {layout.map((row, ki) => {
        if (row.id === 'videos') {
          return handleRow(row);
        } else {
          return <div key={ki} className={`row-${row.id}s row-col-${row.children.length}`}>{handleRow(row)}</div>
        }
      })}
      <div className="space-30" />

      {/* <FeaturedNews /> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <TrendingNews offset={articlesOffset} />
          </div>
          <div className="col-md-12 col-lg-4">

            <RadioPlayer title="Radio Online" />
            <div>
            {ads.map((ad, k) => {
              if (ad.type === 'normal' && k === 1) {
                return <Ad key={k} imageUrl={ad.image} url={ad.url} title={ad.name} height="250px" />
              }
            })}
            <div className="space-20" />
          </div>
            {/* <FollowUs title="Follow Us" /> */}
            <MostView title="Lo mas visto" />
          </div>
        </div>
      </div>
      {/* <MixCarousel className="half_bg1" /> */}

      <VideoPost key="videos" className="pt30 half_bg90" />
      <div className="space-30" />

      {blocks.map((block, i) => {
        return <div className={block.key}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-12">
                          <div className="heading">
                            <h2 className="widget-title">{block.label}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="entertrainment_carousel mb30 grid-news">
                        <div className="entertrainment_item">
                          <div className="row justify-content-center">
                            <GridNews 
                              title={block.label} 
                              gridColumns={block.qty} 
                              qty={block.qty} 
                              category={block.key} 
                              offset={articlesOffset} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      })}

      {/* <div className="sports">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-12">
                  <div className="heading">
                    <h2 className="widget-title">Política</h2>
                  </div>
                </div>
              </div>
              <div className="entertrainment_carousel mb30 grid-news">
                <div className="entertrainment_item">
                  <div className="row justify-content-center">
                    <GridNews 
                      title="Política" 
                      gridColumns="4" 
                      qty={6} 
                      category="politica" 
                      offset={articlesOffset} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="politic">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-12">
                  <div className="heading">
                    <h2 className="widget-title">Interes general</h2>
                  </div>
                </div>
              </div>
              <div className="entertrainment_carousel mb30 grid-news">
                <div className="entertrainment_item">
                  <div className="row justify-content-center">
                    <GridNews 
                      title="Interes general" 
                      gridColumns="4" 
                      qty={4} 
                      category="interes_general" 
                      offset={articlesOffset} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      {/* <div className="entertrainmentss">
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
              <div className="entertrainment_carousel mb30">
                <div className="entertrainment_item">
                  <div className="row justify-content-center">
                    <EntertainmentNews entertainments={entertainments} />
                  </div>
                </div>
              </div>
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
      </div> */}
      <div className="space-70" />
    </Fragment>
  );
};

export default HomePage;