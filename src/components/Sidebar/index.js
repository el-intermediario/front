import React, {Suspense, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import banner2 from "../../doc/img/bg/sidebar-1.png";
import api from '../../utils/api';
import MostView from '../MostView';

const Sidebar = ({mostView, category, articlesRelated}) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (category) {
      fetchAd(category);
    }
  }, [category])

  const fetchAd = async (category) => {
    try {
      const params = `?category=${category}&sizes=350x250`;
      const responseAd = await api.ad.get(params,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if(responseAd.data.length) {
        setBanners(responseAd.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const renderLoader = () => <div>Cargando...</div>
  return (
    <>
      {banners.length ? (
        <div className="banner2 mb30">
          <Link to={banners[0].url}>
            <img src={`${api.space}${banners[0].image}`} alt={banners[0].name} width="350px" height="auto" />
          </Link>
        </div>
      ) : null}
      {/* <TrendingArticles currentId={data ? data.id : null} /> */}
      <Suspense fallback={renderLoader()}>
        <MostView title="Mas vistas" />
      </Suspense>
      {/* <NewsLetter /> */}
    </>
  );
}
 
export default Sidebar;