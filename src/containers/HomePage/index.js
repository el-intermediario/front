import React, { useEffect, useState, lazy } from 'react';
import "./styles.scss";

import api from '../../utils/api';
import {Helmet} from "react-helmet";
import { useWindowSize } from 'react-hanger';
import useScrollPosition from '../../hooks/useScrollPosition';
import GridNews from '../../components/GridNews';
import VideoPost from '../../components/VideoPost';
import RadioPlayer from '../../components/RadioPlayer';
import Ad from '../../components/Ad';
import TrendingNews from '../../components/TrendingNews';
import MostView from '../../components/MostView';

const Mam = lazy(() => import('../../components/Mam/mam'));
const OneItemFeatured = lazy(() => import('../../components/OneItemFeatured'));
const TwoItemsFeatured = lazy(() => import('../../components/TwoItemsFeatured'));
const ThreeItemsFeatured = lazy(() => import('../../components/ThreeItemsFeatured'));
const TopicArticles = lazy(() => import('../../components/TopicArticles'));
const FourItemsFeatured = lazy(() => import('../../components/FourItemsFeatured'));
const OneTwoItemsFeatured = lazy(() => import('../../components/OneTwoItemsFeatured'));

const HomePage = () => {
  const { width } = useWindowSize();
  const scrollPosition = useScrollPosition();
  const [layout, setLayout] = useState([]);
  const [ads, setAds] = useState([]);
  const [articlesOffset, setArticlesOffset] = useState([]);
  const [articlesOffset2, setArticlesOffset2] = useState([]);
  const [showBottomPage, setShowBottomPage] = useState(false);
  const [firstImage, setFirstImage] = useState(null);

  const blocks = [
    {label: 'Politica', key: 'politica', qty: 4},
    {label: 'Interes general', key: 'interes_general', qty: 4},
    {label: 'Deportes', key: 'deportes', qty: 4},
    {label: 'El Mundo', key: 'el_mundo', qty: 4},
    {label: 'Trending', key: 'trending', qty: 4},
    {label: 'Lifestyle', key: 'lifestye', qty: 4},
    {label: 'Genero', key: 'genero', qty: 4},
  ];

  useEffect(() => {
    if (!showBottomPage && scrollPosition > 1500) {
      setShowBottomPage(true);
    }
  }, [scrollPosition])

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
        setFirstImage(`${api.space}f_auto,c_fill,g_face,h_720,q_84,w_1024/v${response.data.layout[0].children[0].children[0].data.image.url}`)
        setArticlesOffset(response.data.articlesOffset);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAds = async () => {
    try {
      const params = `?category=home`;
      const response = await api.ad.getAds(params,
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
          imageUrl={`f_auto/v${row.children[0].children[0].data.image.url}`}
          url={row.children[0].children[0].data.url}
          title={row.children[0].children[0].data.name}
        />
      case 'corona':
        // Bloque con notas de un tema especifica ej: 'elecciones'
        break;
      case 'topic':
        return <TopicArticles data={row}/>;
      case 'videos':
        return <VideoPost key="videos" className="pt30 half_bg60" />
      case 'article':
      default:
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
    }
  }

  return (
    <div className={width < 640 ? 'page-home mobile' : 'page-home'}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>El Intermediario</title>
        <link rel="canonical" href="https://elintermediario.com.ar" />
        <meta name="description" content="El Intermediario - Noticias de Santa Cruz" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="language" content="es_ES" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="El Intermediario" />
        <meta property="og:site_name" content="El Intermediario" />
        <meta property="og:url" content={`https://elintermediario.com.ar`} />
        <meta property="og:description" content="El Intermediario - Noticias de Santa Cruz" />
        {/* <meta property="og:image" content={`${api.space}f_auto,c_fill,g_faces,h_630,w_1200`} /> */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        {layout.length && 
          <link 
            rel="preload" 
            href={firstImage} 
            as="image"
            imagesrcset={
              `${firstImage} 1200w,
               ${firstImage}?w=200 200w, 
               ${firstImage}?w=400 400w, 
               ${firstImage}?w=800 800w, 
               ${firstImage}?w=1024 1024w`
              }
        />}
      </Helmet>
      {/* <PostCarousel className="fifth_bg"/> */}
      {layout.map((row, ki) => {
        if (row.id === 'videos') {
          return handleRow(row);
        } else {
          return <div key={`row-item${ki}`} className={`row-${row.id}s row-col-${row.children.length}`}>{handleRow(row)}</div>
        }
      })}
      <div className="space-30" />

      <Mam />

      {showBottomPage ? (
        <>
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
                    return <Ad key={`row-ads-${k}`} imageUrl={`f_auto/v${ad.image.url}`} url={ad.url} title={ad.name} height="250px" />
                  }
                })}
                <div className="space-20" />
              </div>
                {/* <FollowUs title="Follow Us" /> */}
                <MostView title="Lo mas visto" />
              </div>
            </div>
          </div>
          <VideoPost key="videos" className="pt30 half_bg90" />
          <div className="space-30" />
          {blocks?.map((block, i) => <GridNews
            key={`row-blocks-${i}`}
            title={block.label} 
            gridColumns={block.qty} 
            qty={block.qty} 
            category={block.key} 
            offset={articlesOffset2} 
          />)}
          <div className="space-70" />
        </>
      ) : null}
    </div>
  );
};

export default HomePage;