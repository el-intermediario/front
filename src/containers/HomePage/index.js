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
  const [articlesOffset2, setArticlesOffset2] = useState([]);

  const blocks = [
    {label: 'Politica', key: 'politica', qty: 3},
    {label: 'Interes general', key: 'interes_general', qty: 3},
    {label: 'Deportes', key: 'deportes', qty: 3},
    {label: 'El Mundo', key: 'el_mundo', qty: 3},
    {label: 'Trending', key: 'trending', qty: 3},
    {label: 'Lifestyle', key: 'lifestye', qty: 3},
    {label: 'Genero', key: 'genero', qty: 3},
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
    const rowId = row.id.split('_');
    switch (rowId[0]) {
      case 'ad':
        return <Ad 
          imageUrl={`v${row.children[0].children[0].data.image.url}`}
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
        return <TopicArticles topic={rowId[1]}/>;
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
            <TrendingNews offset={articlesOffset} handleOffset={setArticlesOffset2} />
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
        return  <GridNews
                  key={i}
                  title={block.label} 
                  gridColumns={block.qty} 
                  qty={block.qty} 
                  category={block.key} 
                  offset={articlesOffset2} 
                />
      })}
      <div className="space-70" />
    </Fragment>
  );
};

export default HomePage;