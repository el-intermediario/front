import React, { Fragment, useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, Fade } from 'reactstrap';
import classnames from 'classnames';
import { Link } from "react-router-dom";
import api from '../../utils/api';

const WidgetTabPane = ({ arr, a_id, id, dark }) => {
  return (
    <Fade in={id === a_id}>
      <div className="widget tab_widgets">
        {arr.map((item, i) => (
          <Fragment key={i}>
            <div className="single_post widgets_small">
              <div className="post_img">
                <div className="img_wrap">
                  <Link to={`/articulo/${item.slug}`}>
                    <img src={item.image} alt="thumb" />
                  </Link>
                </div>
              </div>
              <div className="single_post_text">
                <div className="meta2 meta_separator1"><Link to="#">{item.category}</Link>
                  {item.date}
                </div>
                <h4>
                  <Link to={`/articulo/${item.slug}`} state={{time: Date.now}}>{item.title}</Link>
                </h4>
              </div>
            </div>
            <div className="space-15" />
            {dark ? <div className="border_white" /> : <div className="border_black" />}
            <div className="space-15" />
          </Fragment>
        ))}
      </div>
    </Fade>
  )
};

const RelatedTabs = ({ className, dark, tags, currentId }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  let newTags = [];

  useEffect(() => {
    if (tags && data.length == 0 && currentId) {
      tags.reduce((acc, tag) => newTags.push(tag.name), []);
      if(!loadingData) {
        fetchArticles(newTags, currentId);
      }
    }
  });

  const fetchArticles = async (newTags, currentId) => {
    setLoadingData(true);
    try {
      const filter = `?limit=5&page=0&tags=${newTags.join(',')}&idOffset=${currentId}`;
      const response = await api.article.getArticlesSearch(filter,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response) {
        setData(response.data);
        setLoadingData(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className={`widget_tab md-mt-30 ${className}`}>
      <Nav tabs>
        <NavItem>
          <Link
            to="/"
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            RELACIONADAS
          </Link>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'><WidgetTabPane dark={dark} a_id={activeTab} id="1" arr={data} /></TabPane>
        <TabPane tabId='2'><WidgetTabPane dark={dark} a_id={activeTab} id="2" arr={data} /></TabPane>
        <TabPane tabId='3'><WidgetTabPane dark={dark} a_id={activeTab} id="3" arr={data} /></TabPane>
      </TabContent>
    </div>
  );
};

export default RelatedTabs;