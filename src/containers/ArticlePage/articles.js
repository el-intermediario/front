import React, { useState, useEffect } from 'react';
import BannerSection from "../../components/BannerSection";
import FontAwesome from "../../components/uiStyle/FontAwesome";
import { Fade, Nav, NavItem, TabContent, TabPane } from "reactstrap";
import FollowUs from "../../components/FollowUs";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import classnames from "classnames";

import finance41 from "../../doc/img/finance/finance41.jpg";
import calendarImg from '../../doc/img/icon/calendar.png';
import video32 from '../../doc/img/blog/video32.jpg';

const news = [
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
  {
    photo: video32,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus puzzled the world luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…'
  },
];

const financePosts = [
  {
    photo: finance41,
    title: 'Copa America: Luis Suarez from devastated US',
    description: 'The property, complete with seates screening from room amphitheater pond with sandy'
  },
  {
    photo: finance41,
    title: 'Copa America: Luis Suarez from devastated US',
    description: 'The property, complete with seates screening from room amphitheater pond with sandy'
  },
];

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchArticles(search);
  }, [search]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchArticles = async (search = null) => {
    try {
      const filter = search ? `?search=${search}` : '';
      const response = await api.article.getArticlesSearch(filter,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        setArticles(response.data);
      }
    } catch (err) {
      console.log(err);
    }

  };

  console.log(articles);
  return (
    <>
      {/*contact form area*/}
      <div className="contact_form padding-bottom">
        <div className="container">
          <div className="space-50" />
          <div className="row">
            <div className="col-lg-8">
              <div className="cotact_form">
                <div className="row">
                  <div className="col-12">
                    <h3>Ultimas notas!</h3>
                  </div>
                  <div className="row filters">
                    <div className="col-lg-12">
                      <input name="search" value={search} onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Buscar" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="about_posts_tab">
                      {articles.map((article, i) => (
                        <div key={i} className="row single_post_text white_bg">
                          <div className="col-lg-10">
                            <Link to={`/articulo/${article.slug}`}>{article.title}</Link>
                          </div>
                          <div className="col-lg-2">
                            <Link to={`/admin/article/${article.id}/edit`}>Editar</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <FollowUs title="Redes Sociales" />
            </div>
          </div>
        </div>
      </div>
      <BannerSection />
    </>
  );
}

export default ArticlesPage;