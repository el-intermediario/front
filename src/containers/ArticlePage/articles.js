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

  useEffect(() => {
    fetchArticles();
  }, []);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchArticles = async () => {
    try {
      const response = await api.article.getArticles({},
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
                  <div className="col-12">
                  <div className="row">
                    <div className="col-10 align-self-center">
                          <div className="about_post_list">
                              <Nav tabs>
                                  <NavItem>
                                      <div
                                          className={classnames({active: activeTab === '1'})}
                                          onClick={() => {
                                              toggle('1');
                                          }}
                                      >
                                          Ultimas
                                      </div>
                                  </NavItem>
                                  <NavItem>
                                      <div
                                          className={classnames({active: activeTab === '2'})}
                                          onClick={() => {
                                              toggle('2');
                                          }}
                                      >
                                          Mas Populares
                                      </div>
                                  </NavItem>
                              </Nav>
                          </div>
                      </div>
                      <div className="col-2 text-right align-self-center">
                          <div className="calender mb20">
                              <img src={calendarImg} alt="calendar"/>
                          </div>
                      </div>
                    </div>
                    <div className="about_posts_tab">
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Fade in={activeTab === '1'}>
                                    <div className="row justify-content-center">
                                        {articles.map((article, i) => (
                                            <div key={i} className="col-lg-6">
                                                <div
                                                    className="single_post post_type3 shadow7 mb30 post_type15 border-radious5">
                                                    <div className="post_img border-radious5">
                                                        <div className="img_wrap">
                                                            <img src={article.image ? article.image : video32} alt="thumb"/>
                                                        </div>
                                                        <span className="tranding border_tranding">
                                                            <FontAwesome name="bolt"/>
                                                        </span>
                                                    </div>
                                                    <div className="single_post_text padding20 white_bg">
                                                        <Link to={`/articulo/${article.slug}`}>{article.title}</Link>
                                                        <div className="space-10"/>
                                                        <p className="post-p">{article.dropline}</p>
                                                        <div className="space-20"/>
                                                        <div className="meta3"><Link to={`/articulo/${article.slug}`}>{article.copete}</Link>
                                                            <Link to={`/articulo/${article.slug}`}>{article.created}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Fade>
                            </TabPane>
                            <TabPane tabId="2">
                                <Fade in={activeTab === '2'}>
                                    <div className="row justify-content-center">
                                        {news.map((item, i) => (
                                            <div key={i} className="col-lg-6">
                                                <div
                                                    className="single_post post_type3 mb30 post_type15 border-radious5">
                                                    <div className="post_img border-radious5">
                                                        <div className="img_wrap">
                                                            <img src={item.photo} alt="thumb"/>
                                                        </div>
                                                        <span className="tranding border_tranding"><FontAwesome
                                                            name="bolt"/></span>
                                                    </div>
                                                    <div className="single_post_text padding20 white_bg">
                                                        <Link to="/post1">{item.title}</Link>
                                                        <div className="space-10"/>
                                                        <p className="post-p">{item.body}</p>
                                                        <div className="space-20"/>
                                                        <div className="meta3"><Link to="/">{item.category}</Link>
                                                            <Link to="/">{item.date}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Fade>
                            </TabPane>
                        </TabContent>
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